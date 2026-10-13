"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  MagnifyingGlass,
  Database,
  ArrowRight,
  DotsThreeVertical,
  Calendar,
  Users,
  FlowArrow,
  X,
  Sparkle,
} from "@phosphor-icons/react";
import { useSchemaStore } from "@/lib/store";
import { SCHEMA_TEMPLATES } from "@/lib/templates";
import { nanoid } from "nanoid";

interface ProjectCardData {
  id: string;
  name: string;
  description: string;
  tableCount: number;
  columnCount: number;
  relationCount: number;
  members: string[];
  updatedAt: string;
  templateId?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { setProject, loadTemplate } = useSchemaStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("ecommerce-storefront");

  const [projectsList, setProjectsList] = useState<ProjectCardData[]>([
    {
      id: "proj-ecommerce-main",
      name: "storefront-production",
      description: "Primary schema for customer checkout, inventory catalog, and stripe payments.",
      tableCount: 5,
      columnCount: 21,
      relationCount: 4,
      members: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80",
      ],
      updatedAt: "10m ago",
      templateId: "ecommerce-storefront",
    },
    {
      id: "proj-saas-core",
      name: "saas-subscription-service",
      description: "Multi-tenant workspace organizations, role permissions, and API key management.",
      tableCount: 3,
      columnCount: 14,
      relationCount: 2,
      members: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80",
      ],
      updatedAt: "2h ago",
      templateId: "saas-subscription",
    },
    {
      id: "proj-analytics-warehouse",
      name: "telemetry-warehouse-dw",
      description: "User interaction tracking events, daily aggregated rollups, and session funnels.",
      tableCount: 4,
      columnCount: 18,
      relationCount: 3,
      members: [
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80",
      ],
      updatedAt: "1d ago",
    },
  ]);

  const filteredProjects = projectsList.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    const newId = `proj-${nanoid(8)}`;
    const template = SCHEMA_TEMPLATES.find((t) => t.id === selectedTemplate) || SCHEMA_TEMPLATES[0];

    const newProj: ProjectCardData = {
      id: newId,
      name: projectName.trim().toLowerCase().replace(/\s+/g, "-"),
      description: template.description,
      tableCount: template.schema.tables.length,
      columnCount: template.schema.tables.reduce((acc, t) => acc + t.columns.length, 0),
      relationCount: template.schema.relations.length,
      members: ["https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80"],
      updatedAt: "Just now",
      templateId: selectedTemplate,
    };

    setProjectsList([newProj, ...projectsList]);
    setIsNewProjectModalOpen(false);
    setProjectName("");

    // Load into store and route
    setProject({
      id: newProj.id,
      name: newProj.name,
      description: newProj.description,
      ownerId: "usr-local-dev",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      schema: template.schema,
    });

    router.push(`/app/${newProj.id}`);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#07090E] p-6 lg:p-10">
      <div className="mx-auto max-w-6xl">
        {/* Top Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#1A2133] pb-6">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-[#F0F4FF] sm:text-3xl">
              Projects & Schemas
            </h1>
            <p className="mt-1 text-xs text-[#7A90B0]">
              Design visually, collaborate in real-time, and ship verified database migrations.
            </p>
          </div>

          <button
            onClick={() => setIsNewProjectModalOpen(true)}
            className="btn-primary"
            data-testid="new-project-btn"
          >
            <Plus size={16} weight="bold" />
            <span>New Project</span>
          </button>
        </div>

        {/* Toolbar: Search & Statistics */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <MagnifyingGlass
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5F7A]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search schemas..."
              className="input-well w-full pl-9 text-xs"
            />
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#7A90B0]">
            <span>Total Projects: <strong className="text-[#F0F4FF]">{projectsList.length}</strong></span>
            <span>·</span>
            <span>Edge Engine: <strong className="text-[#10B981]">Active</strong></span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="group flex flex-col justify-between rounded-xl border border-[#1A2133] bg-[#0D1117] p-5 transition-all duration-200 hover:border-[#253047] hover:bg-[#0A0C12] hover:shadow-xl"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#2563EB]/40 bg-[#131920] text-[#60A5FA]">
                    <Database size={18} weight="duotone" />
                  </div>
                  <span className="rounded bg-[#131920] px-2 py-0.5 font-mono text-[10px] text-[#7A90B0]">
                    Updated {p.updatedAt}
                  </span>
                </div>

                <h3 className="font-display mt-4 text-base font-bold text-[#F0F4FF] group-hover:text-[#60A5FA] transition-colors">
                  {p.name}
                </h3>
                <p className="mt-1.5 text-xs text-[#7A90B0] line-clamp-2">
                  {p.description}
                </p>

                {/* Metrics */}
                <div className="mt-5 grid grid-cols-3 gap-2 border-y border-[#1A2133] py-2.5 font-mono text-center text-[11px]">
                  <div>
                    <span className="text-[#4A5F7A]">Tables</span>
                    <p className="font-bold text-[#F0F4FF]">{p.tableCount}</p>
                  </div>
                  <div>
                    <span className="text-[#4A5F7A]">Columns</span>
                    <p className="font-bold text-[#F0F4FF]">{p.columnCount}</p>
                  </div>
                  <div>
                    <span className="text-[#4A5F7A]">Relations</span>
                    <p className="font-bold text-[#60A5FA]">{p.relationCount}</p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-5 flex items-center justify-between pt-2">
                <div className="flex -space-x-1.5">
                  {p.members.map((avatar, aIdx) => (
                    <img
                      key={aIdx}
                      src={avatar}
                      alt="Collaborator"
                      className="h-5 w-5 rounded-full border border-[#07090E] object-cover"
                    />
                  ))}
                </div>

                <Link
                  href={`/app/${p.id}`}
                  onClick={() => {
                    const tmpl = SCHEMA_TEMPLATES.find((t) => t.id === p.templateId) || SCHEMA_TEMPLATES[0];
                    setProject({
                      id: p.id,
                      name: p.name,
                      description: p.description,
                      ownerId: "usr-local-dev",
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                      schema: tmpl.schema,
                    });
                  }}
                  className="flex items-center gap-1.5 rounded-md bg-[#2563EB]/15 px-3 py-1.5 text-xs font-semibold text-[#93C5FD] transition-colors hover:bg-[#2563EB] hover:text-white"
                >
                  <span>Open Studio</span>
                  <ArrowRight size={12} weight="bold" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state if search returns nothing */}
        {filteredProjects.length === 0 && (
          <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-[#1A2133] bg-[#0D1117] p-12 text-center">
            <Database size={32} className="text-[#4A5F7A]" />
            <h3 className="font-display mt-3 text-sm font-semibold text-[#F0F4FF]">
              No schemas match &quot;{searchQuery}&quot;
            </h3>
            <p className="mt-1 text-xs text-[#7A90B0]">
              Try a different search query or create a new database schema.
            </p>
            <button
              onClick={() => setIsNewProjectModalOpen(true)}
              className="btn-primary mt-4 text-xs"
            >
              Create New Schema
            </button>
          </div>
        )}

        {/* Create Project Modal */}
        {isNewProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-2xl border border-[#253047] bg-[#0D1117] p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#1A2133] pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2563EB]/20 text-[#60A5FA]">
                    <Plus size={16} weight="bold" />
                  </div>
                  <h3 className="font-display text-base font-bold text-[#F0F4FF]">
                    Create New Schema Project
                  </h3>
                </div>
                <button
                  onClick={() => setIsNewProjectModalOpen(false)}
                  className="rounded-lg p-1 text-[#7A90B0] hover:text-[#F0F4FF]"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCreateProject} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#F0F4FF] mb-1.5">
                    Project Name
                  </label>
                  <input
                    type="text"
                    required
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g. billing-service-v2"
                    className="input-well w-full text-xs font-mono"
                    autoFocus
                  />
                  <p className="mt-1 text-[11px] text-[#4A5F7A]">
                    Identifier will be converted to lowercase slug.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F0F4FF] mb-1.5">
                    Starter Template
                  </label>
                  <div className="space-y-2">
                    {SCHEMA_TEMPLATES.map((tmpl) => (
                      <div
                        key={tmpl.id}
                        onClick={() => setSelectedTemplate(tmpl.id)}
                        className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                          selectedTemplate === tmpl.id
                            ? "border-[#2563EB] bg-[#2563EB]/10"
                            : "border-[#1A2133] bg-[#07090E] hover:border-[#253047]"
                        }`}
                      >
                        <div className="mt-0.5">
                          <input
                            type="radio"
                            name="template"
                            checked={selectedTemplate === tmpl.id}
                            onChange={() => setSelectedTemplate(tmpl.id)}
                            className="accent-[#2563EB]"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#F0F4FF]">
                            {tmpl.name} ({tmpl.schema.tables.length} tables)
                          </p>
                          <p className="text-[11px] text-[#7A90B0] mt-0.5">
                            {tmpl.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-[#1A2133] pt-4">
                  <button
                    type="button"
                    onClick={() => setIsNewProjectModalOpen(false)}
                    className="btn-secondary text-xs py-2 px-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-xs py-2 px-4"
                  >
                    <span>Create & Launch Studio</span>
                    <ArrowRight size={14} weight="bold" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
