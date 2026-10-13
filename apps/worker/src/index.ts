import { Hono } from "hono";
import { cors } from "hono/cors";
import { nanoid } from "nanoid";
import type { FluxProject, FluxSchema, SchemaSnapshot, ShareLink } from "@fluxdb/schema-types";

const app = new Hono();

app.use("*", cors());

// In-memory / D1 state store for Cloudflare worker
const projectsStore = new Map<string, FluxProject>();
const snapshotsStore = new Map<string, SchemaSnapshot[]>();
const shareTokensStore = new Map<string, ShareLink>();

// Seed initial project
const initialProjectId = "proj-ecommerce-main";
const initialProject: FluxProject = {
  id: initialProjectId,
  name: "storefront-production",
  description: "Primary schema for customer checkout, inventory catalog, and stripe payments.",
  ownerId: "usr-local-dev",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  schema: {
    version: 1,
    tables: [
      {
        id: "tbl-users",
        name: "users",
        color: "cobalt",
        position: { x: 80, y: 100 },
        columns: [
          { id: "col-1", name: "id", type: "uuid", constraints: ["PRIMARY_KEY", "NOT_NULL"] },
          { id: "col-2", name: "email", type: "varchar", constraints: ["UNIQUE", "NOT_NULL"] },
          { id: "col-3", name: "role", type: "enum", constraints: ["NOT_NULL"], defaultValue: "'customer'" },
        ],
      },
      {
        id: "tbl-orders",
        name: "orders",
        color: "emerald",
        position: { x: 420, y: 100 },
        columns: [
          { id: "col-4", name: "id", type: "uuid", constraints: ["PRIMARY_KEY", "NOT_NULL"] },
          { id: "col-5", name: "user_id", type: "uuid", constraints: ["NOT_NULL"] },
          { id: "col-6", name: "total_amount", type: "decimal", constraints: ["NOT_NULL"] },
        ],
      },
    ],
    relations: [
      {
        id: "rel-1",
        fromTableId: "tbl-orders",
        fromColumnId: "col-5",
        toTableId: "tbl-users",
        toColumnId: "col-1",
        type: "1:N",
        label: "places",
      },
    ],
  },
};

projectsStore.set(initialProjectId, initialProject);
snapshotsStore.set(initialProjectId, [
  {
    id: "snap-1",
    projectId: initialProjectId,
    version: 1,
    label: "Initial baseline",
    authorId: "usr-local-dev",
    authorName: "Sarah Chen",
    createdAt: new Date().toISOString(),
    data: initialProject.schema,
  },
]);

// Health Check
app.get("/api/health", (c) => {
  return c.json({ status: "healthy", service: "fluxdb-worker", timestamp: new Date().toISOString() });
});

// List Projects
app.get("/api/projects", (c) => {
  const projects = Array.from(projectsStore.values());
  return c.json({ success: true, count: projects.length, data: projects });
});

// Create Project
app.post("/api/projects", async (c) => {
  const body = await c.req.json();
  const id = `proj-${nanoid(8)}`;
  const newProject: FluxProject = {
    id,
    name: body.name || "untitled-schema",
    description: body.description || "",
    ownerId: body.ownerId || "usr-local-dev",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    schema: body.schema || {
      version: 1,
      tables: [],
      relations: [],
    },
  };

  projectsStore.set(id, newProject);
  return c.json({ success: true, data: newProject }, 201);
});

// Get Project
app.get("/api/projects/:id", (c) => {
  const id = c.req.param("id");
  const project = projectsStore.get(id);
  if (!project) {
    return c.json({ success: false, error: "Project not found" }, 404);
  }
  return c.json({ success: true, data: project });
});

// Update Project Schema
app.put("/api/projects/:id", async (c) => {
  const id = c.req.param("id");
  const existing = projectsStore.get(id);
  if (!existing) {
    return c.json({ success: false, error: "Project not found" }, 404);
  }

  const body = await c.req.json();
  const updated: FluxProject = {
    ...existing,
    name: body.name || existing.name,
    description: body.description ?? existing.description,
    schema: body.schema || existing.schema,
    updatedAt: new Date().toISOString(),
  };

  projectsStore.set(id, updated);
  return c.json({ success: true, data: updated });
});

// Delete Project
app.delete("/api/projects/:id", (c) => {
  const id = c.req.param("id");
  if (!projectsStore.has(id)) {
    return c.json({ success: false, error: "Project not found" }, 404);
  }
  projectsStore.delete(id);
  snapshotsStore.delete(id);
  return c.json({ success: true, message: "Project deleted" });
});

// Create Snapshot
app.post("/api/projects/:id/snapshots", async (c) => {
  const projectId = c.req.param("id");
  const project = projectsStore.get(projectId);
  if (!project) {
    return c.json({ success: false, error: "Project not found" }, 404);
  }

  const body = await c.req.json();
  const existingSnapshots = snapshotsStore.get(projectId) || [];
  const version = existingSnapshots.length + 1;

  const snapshot: SchemaSnapshot = {
    id: `snap-${nanoid(8)}`,
    projectId,
    version,
    label: body.label || `Checkpoint v${version}`,
    authorId: body.authorId || "usr-local-dev",
    authorName: body.authorName || "Lead Engineer",
    createdAt: new Date().toISOString(),
    data: project.schema,
  };

  existingSnapshots.unshift(snapshot);
  snapshotsStore.set(projectId, existingSnapshots);

  return c.json({ success: true, data: snapshot }, 201);
});

// List Snapshots
app.get("/api/projects/:id/snapshots", (c) => {
  const projectId = c.req.param("id");
  const snapshots = snapshotsStore.get(projectId) || [];
  return c.json({ success: true, count: snapshots.length, data: snapshots });
});

// Generate Share Link
app.post("/api/share", async (c) => {
  const body = await c.req.json();
  const token = `tok-${nanoid(16)}`;
  const shareLink: ShareLink = {
    id: `share-${nanoid(8)}`,
    projectId: body.projectId,
    token,
    createdAt: new Date().toISOString(),
  };

  shareTokensStore.set(token, shareLink);
  return c.json({ success: true, data: shareLink });
});

// Get Shared Schema
app.get("/api/share/:token", (c) => {
  const token = c.req.param("token");
  const shareLink = shareTokensStore.get(token);
  if (!shareLink) {
    // Return sample project for preview tokens
    return c.json({
      success: true,
      data: {
        token,
        project: initialProject,
        isReadOnly: true,
      },
    });
  }

  const project = projectsStore.get(shareLink.projectId);
  return c.json({
    success: true,
    data: {
      token,
      project,
      isReadOnly: true,
    },
  });
});

export default app;
