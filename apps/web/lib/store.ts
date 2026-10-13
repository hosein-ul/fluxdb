import { create } from "zustand";
import type {
  FluxProject,
  FluxSchema,
  Table,
  Column,
  Relation,
  TableColor,
  CollaboratorPresence,
  SchemaSnapshot,
} from "@fluxdb/schema-types";
import { SCHEMA_TEMPLATES } from "./templates";
import { nanoid } from "nanoid";

interface SchemaStore {
  // Current active project & schema
  project: FluxProject | null;
  schema: FluxSchema;
  history: FluxSchema[];
  historyIndex: number;
  snapshots: SchemaSnapshot[];

  // Selection state
  selectedTableId: string | null;
  selectedColumnId: string | null;

  // Real-time collaborators presence
  collaborators: CollaboratorPresence[];
  currentUser: { id: string; name: string; color: string };

  // Actions
  setProject: (project: FluxProject) => void;
  loadTemplate: (templateId: string) => void;
  updateTableName: (tableId: string, name: string) => void;
  updateTableColor: (tableId: string, color: TableColor) => void;
  updateTablePosition: (tableId: string, position: { x: number; y: number }) => void;
  addTable: (name: string, color?: TableColor, position?: { x: number; y: number }) => void;
  deleteTable: (tableId: string) => void;

  // Column actions
  addColumn: (tableId: string, column: Partial<Column>) => void;
  updateColumn: (tableId: string, columnId: string, updates: Partial<Column>) => void;
  deleteColumn: (tableId: string, columnId: string) => void;

  // Relation actions
  addRelation: (relation: Omit<Relation, "id">) => void;
  deleteRelation: (relationId: string) => void;

  // Selection
  selectObject: (tableId: string | null, columnId?: string | null) => void;

  // Undo / Redo
  undo: () => void;
  redo: () => void;
  saveSnapshot: (label?: string) => SchemaSnapshot;

  // Presence simulation
  updateCursor: (cursor: { x: number; y: number } | null) => void;
}

const defaultUser = {
  id: "usr-local-dev",
  name: "You (Lead Engineer)",
  color: "#2563EB",
};

const initialCollaborators: CollaboratorPresence[] = [
  {
    id: "usr-sarah",
    name: "Sarah Chen",
    color: "#10B981",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    cursor: { x: 560, y: 160 },
    selectedTableId: "tbl-orders",
    lastActive: Date.now(),
  },
  {
    id: "usr-tom",
    name: "Tom Rivera",
    color: "#6366F1",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    cursor: { x: 380, y: 490 },
    selectedTableId: "tbl-products",
    lastActive: Date.now(),
  },
];

const initialSchema = SCHEMA_TEMPLATES[0].schema;

export const useSchemaStore = create<SchemaStore>((set, get) => ({
  project: {
    id: "proj-ecommerce-main",
    name: "storefront-production",
    description: "Primary database schema for production store application",
    ownerId: defaultUser.id,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date().toISOString(),
    schema: initialSchema,
  },
  schema: initialSchema,
  history: [initialSchema],
  historyIndex: 0,
  snapshots: [
    {
      id: "snap-v1",
      projectId: "proj-ecommerce-main",
      version: 1,
      label: "Initial production baseline",
      authorId: defaultUser.id,
      authorName: "Sarah Chen",
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      data: initialSchema,
    },
  ],
  selectedTableId: null,
  selectedColumnId: null,
  collaborators: initialCollaborators,
  currentUser: defaultUser,

  setProject: (project) => {
    set({
      project,
      schema: project.schema,
      history: [project.schema],
      historyIndex: 0,
    });
  },

  loadTemplate: (templateId) => {
    const tmpl = SCHEMA_TEMPLATES.find((t) => t.id === templateId);
    if (!tmpl) return;
    const newSchema = { ...tmpl.schema, version: get().schema.version + 1 };
    set((state) => ({
      schema: newSchema,
      history: [...state.history.slice(0, state.historyIndex + 1), newSchema],
      historyIndex: state.historyIndex + 1,
    }));
  },

  updateTableName: (tableId, name) => {
    const { schema, history, historyIndex } = get();
    const updatedTables = schema.tables.map((t) => (t.id === tableId ? { ...t, name } : t));
    const nextSchema: FluxSchema = { ...schema, tables: updatedTables };

    set({
      schema: nextSchema,
      history: [...history.slice(0, historyIndex + 1), nextSchema],
      historyIndex: historyIndex + 1,
    });
  },

  updateTableColor: (tableId, color) => {
    const { schema, history, historyIndex } = get();
    const updatedTables = schema.tables.map((t) => (t.id === tableId ? { ...t, color } : t));
    const nextSchema: FluxSchema = { ...schema, tables: updatedTables };

    set({
      schema: nextSchema,
      history: [...history.slice(0, historyIndex + 1), nextSchema],
      historyIndex: historyIndex + 1,
    });
  },

  updateTablePosition: (tableId, position) => {
    const { schema } = get();
    const updatedTables = schema.tables.map((t) => (t.id === tableId ? { ...t, position } : t));
    set({ schema: { ...schema, tables: updatedTables } });
  },

  addTable: (name, color = "cobalt", position) => {
    const { schema, history, historyIndex } = get();
    const newId = `tbl-${nanoid(8)}`;
    const newTable: Table = {
      id: newId,
      name: name.toLowerCase().replace(/\s+/g, "_"),
      color,
      position: position || { x: 200 + Math.random() * 200, y: 150 + Math.random() * 150 },
      columns: [
        {
          id: `col-${nanoid(6)}`,
          name: "id",
          type: "uuid",
          constraints: ["PRIMARY_KEY", "NOT_NULL"],
        },
        {
          id: `col-${nanoid(6)}`,
          name: "created_at",
          type: "timestamptz",
          constraints: ["NOT_NULL"],
          defaultValue: "now()",
        },
      ],
    };

    const nextSchema: FluxSchema = {
      ...schema,
      tables: [...schema.tables, newTable],
    };

    set({
      schema: nextSchema,
      selectedTableId: newId,
      history: [...history.slice(0, historyIndex + 1), nextSchema],
      historyIndex: historyIndex + 1,
    });
  },

  deleteTable: (tableId) => {
    const { schema, history, historyIndex, selectedTableId } = get();
    const nextTables = schema.tables.filter((t) => t.id !== tableId);
    const nextRelations = schema.relations.filter(
      (r) => r.fromTableId !== tableId && r.toTableId !== tableId
    );
    const nextSchema: FluxSchema = {
      ...schema,
      tables: nextTables,
      relations: nextRelations,
    };

    set({
      schema: nextSchema,
      selectedTableId: selectedTableId === tableId ? null : selectedTableId,
      history: [...history.slice(0, historyIndex + 1), nextSchema],
      historyIndex: historyIndex + 1,
    });
  },

  addColumn: (tableId, columnData) => {
    const { schema, history, historyIndex } = get();
    const newCol: Column = {
      id: `col-${nanoid(6)}`,
      name: columnData.name || "new_field",
      type: columnData.type || "text",
      constraints: columnData.constraints || [],
      defaultValue: columnData.defaultValue,
    };

    const nextTables = schema.tables.map((t) => {
      if (t.id === tableId) {
        return { ...t, columns: [...t.columns, newCol] };
      }
      return t;
    });

    const nextSchema = { ...schema, tables: nextTables };
    set({
      schema: nextSchema,
      selectedColumnId: newCol.id,
      history: [...history.slice(0, historyIndex + 1), nextSchema],
      historyIndex: historyIndex + 1,
    });
  },

  updateColumn: (tableId, columnId, updates) => {
    const { schema, history, historyIndex } = get();
    const nextTables = schema.tables.map((t) => {
      if (t.id === tableId) {
        return {
          ...t,
          columns: t.columns.map((c) => (c.id === columnId ? { ...c, ...updates } : c)),
        };
      }
      return t;
    });

    const nextSchema = { ...schema, tables: nextTables };
    set({
      schema: nextSchema,
      history: [...history.slice(0, historyIndex + 1), nextSchema],
      historyIndex: historyIndex + 1,
    });
  },

  deleteColumn: (tableId, columnId) => {
    const { schema, history, historyIndex, selectedColumnId } = get();
    const nextTables = schema.tables.map((t) => {
      if (t.id === tableId) {
        return {
          ...t,
          columns: t.columns.filter((c) => c.id !== columnId),
        };
      }
      return t;
    });

    const nextRelations = schema.relations.filter(
      (r) => r.fromColumnId !== columnId && r.toColumnId !== columnId
    );

    const nextSchema = { ...schema, tables: nextTables, relations: nextRelations };
    set({
      schema: nextSchema,
      selectedColumnId: selectedColumnId === columnId ? null : selectedColumnId,
      history: [...history.slice(0, historyIndex + 1), nextSchema],
      historyIndex: historyIndex + 1,
    });
  },

  addRelation: (relationData) => {
    const { schema, history, historyIndex } = get();
    const newRelation: Relation = {
      ...relationData,
      id: `rel-${nanoid(8)}`,
    };

    const nextSchema = {
      ...schema,
      relations: [...schema.relations, newRelation],
    };

    set({
      schema: nextSchema,
      history: [...history.slice(0, historyIndex + 1), nextSchema],
      historyIndex: historyIndex + 1,
    });
  },

  deleteRelation: (relationId) => {
    const { schema, history, historyIndex } = get();
    const nextRelations = schema.relations.filter((r) => r.id !== relationId);
    const nextSchema = { ...schema, relations: nextRelations };
    set({
      schema: nextSchema,
      history: [...history.slice(0, historyIndex + 1), nextSchema],
      historyIndex: historyIndex + 1,
    });
  },

  selectObject: (tableId, columnId = null) => {
    set({ selectedTableId: tableId, selectedColumnId: columnId });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      set({
        schema: history[historyIndex - 1],
        historyIndex: historyIndex - 1,
      });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      set({
        schema: history[historyIndex + 1],
        historyIndex: historyIndex + 1,
      });
    }
  },

  saveSnapshot: (label = "Manual checkpoint") => {
    const { schema, snapshots, currentUser, project } = get();
    const newVersion = (snapshots[0]?.version || 0) + 1;
    const newSnapshot: SchemaSnapshot = {
      id: `snap-${nanoid(8)}`,
      projectId: project?.id || "proj-default",
      version: newVersion,
      label,
      authorId: currentUser.id,
      authorName: currentUser.name,
      createdAt: new Date().toISOString(),
      data: { ...schema, version: newVersion },
    };

    set({
      snapshots: [newSnapshot, ...snapshots],
      schema: { ...schema, version: newVersion },
    });

    return newSnapshot;
  },

  updateCursor: (cursor) => {
    // In real-time this broadcasts to Liveblocks / WebSocket
  },
}));
