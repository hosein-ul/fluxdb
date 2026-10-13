"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  MagnifyingGlass,
  Database,
  ArrowRight,
  X,
  GitBranch,
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
  const { setProject } = useSchemaStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("ecommerce-storefront");

  const [projectsList] = useState<ProjectCardData[]>([
    {
      id: "proj_demo_saas",
      name: "saas-subscription-service",
      description: "Multi-tenant workspace organizations, role permissions, and API key management.",
      tableCount: 3,
      columnCount: 14,
      relationCount: 2,
      members: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80",
      ],
      updatedAt: "Just now",
      templateId: "saas-subscription",
    },
    {
      id: "proj_demo_ecommerce",
      name: "storefront-production",
      description: "Primary schema for customer checkout, inventory catalog, and stripe payments.",
      tableCount: 5,
      columnCount: 21,
      relationCount: 4,
      members: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80",
      ],
      updatedAt: "15m ago",
      templateId: "ecommerce-storefront",
    },
    {
      id: "proj_analytics_dw",
      name: "telemetry-warehouse-dw",
      description: "User interaction tracking events, daily aggregated rollups, and session funnels.",
      tableCount: 4,
      columnCount: 18,
      relationCount: 3,
      members: [
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80",
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

    setProject({
      id: newId,
      name: projectName.trim().toLowerCase().replace(/\s+/g, "-"),
      description: "Custom database schema topology created in studio.",
      ownerId: "usr-local-dev",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      schema: template.schema,
    });

    router.push(`/app/${newId}`);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8FAFC] p-6 lg:p-10 text-[#0F172A]">
      <div className="mx-auto max-w-6xl">
        {/* Top Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#E2E8F0] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#CBD5E1] bg-[#FFFFFF] px-3 py-0.5 font-mono text-[11px] text-[#0F172A] shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#059669]" />
              <span className="font-medium">Schema Repositories</span>
            </div>
            <h1 className="font-display mt-2 text-2xl font-extrabold tracking-tight text-[#0F172A] sm:text-3xl">
              Active Schemas & Topologies
            </h1>
            <p className="mt-1 text-xs text-[#475569]">
              Visually model relational topologies, collaborate in real time, and compile zero-downtime migrations.
            </p>
          </div>

          <button
            onClick={() => setIsNewProjectModalOpen(true)}
            className="btn-primary"
            data-testid="new-project-btn"
          >
            <Plus size={15} weight="bold" />
            <span>New Schema</span>
          </button>
        </div>

        {/* Toolbar: Search & Statistics */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <MagnifyingGlass
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search schemas by name or table..."
              className="input-well w-full pl-9 text-xs font-mono"
            />
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#64748B]">
            <span>Repositories: <strong className="text-[#0F172A]">{projectsList.length}</strong></span>
            <span>·</span>
            <span>Edge Engine: <strong className="text-[#059669]">ONLINE</strong></span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="group flex flex-col justify-between rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 transition-all duration-200 hover:border-[#CBD5E1] hover:shadow-md shadow-xs"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] shadow-xs">
                    <Database size={18} weight="bold" />
                  </div>
                  <span className="rounded border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-0.5 font-mono text-[10px] text-[#64748B]">
                    Updated {p.updatedAt}
                  </span>
                </div>

                <h3 className="font-display mt-4 text-base font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                  {p.name}
                </h3>
                <p className="mt-1.5 text-xs text-[#475569] line-clamp-2 leading-relaxed">
                  {p.description}
                </p>

                {/* Metrics */}
                <div className="mt-5 grid grid-cols-3 gap-2 rounded-lg border border-[#F1F5F9] bg-[#F8FAFC] py-2.5 font-mono text-center text-[11px]">
                  <div>
                    <span className="text-[#64748B]">Tables</span>
                    <p className="font-bold text-[#0F172A]">{p.tableCount}</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Columns</span>
                    <p className="font-bold text-[#0F172A]">{p.columnCount}</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Relations</span>
                    <p className="font-bold text-[#059669]">{p.relationCount}</p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-5 flex items-center justify-between border-t border-[#F1F5F9] pt-3">
                <Link
                  href={`/app/${p.id}/migrations`}
                  className="flex items-center gap-1.5 text-[11px] font-mono text-[#64748B] hover:text-[#0F172A] transition-colors"
                  title="View Migration Diff"
                >
                  <GitBranch size={14} className="text-[#059669]" />
                  <span>Migration Diff</span>
                </Link>

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
                  className="btn-secondary text-xs py-1.5 px-3"
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
          <div className="mt-16 flex flex-col items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-12 text-center shadow-xs">
            <Database size={32} className="text-[#94A3B8]" />
            <h3 className="font-display mt-3 text-sm font-bold text-[#0F172A]">
              No schemas match &quot;{searchQuery}&quot;
            </h3>
            <p className="mt-1 text-xs text-[#64748B]">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-2xl border border-[#CBD5E1] bg-[#FFFFFF] p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0F172A] text-[#FFFFFF]">
                    <Plus size={15} weight="bold" />
                  </div>
                  <h3 className="font-display text-base font-bold text-[#0F172A]">
                    Create New Schema Project
                  </h3>
                </div>
                <button
                  onClick={() => setIsNewProjectModalOpen(false)}
                  className="rounded p-1 text-[#64748B] hover:text-[#0F172A]"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCreateProject} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                    Project Identifier
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
                  <p className="mt-1 text-[11px] text-[#64748B]">
                    Identifier will be converted to lowercase slug.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                    Topology Starter Template
                  </label>
                  <div className="space-y-2">
                    {SCHEMA_TEMPLATES.map((tmpl) => (
                      <div
                        key={tmpl.id}
                        onClick={() => setSelectedTemplate(tmpl.id)}
                        className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                          selectedTemplate === tmpl.id
                            ? "border-[#0F172A] bg-[#F8FAFC] ring-2 ring-[#0F172A]/10"
                            : "border-[#E2E8F0] bg-[#FFFFFF] hover:border-[#CBD5E1]"
                        }`}
                      >
                        <div className="mt-0.5">
                          <input
                            type="radio"
                            name="template"
                            checked={selectedTemplate === tmpl.id}
                            onChange={() => setSelectedTemplate(tmpl.id)}
                            className="accent-[#0F172A]"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#0F172A]">
                            {tmpl.name} ({tmpl.schema.tables.length} tables)
                          </p>
                          <p className="text-[11px] text-[#64748B] mt-0.5">
                            {tmpl.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-[#E2E8F0] pt-4">
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
