"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  ArrowCounterClockwise,
  ArrowClockwise,
  FloppyDisk,
  ShareNetwork,
  Export,
  GitBranch,
  Check,
} from "@phosphor-icons/react";
import { useState } from "react";
import { useSchemaStore } from "@/lib/store";
import { SCHEMA_TEMPLATES } from "@/lib/templates";

interface CanvasToolbarProps {
  onOpenExport: () => void;
  onOpenShare: () => void;
  onOpenAddTable: () => void;
}

export function CanvasToolbar({
  onOpenExport,
  onOpenShare,
  onOpenAddTable,
}: CanvasToolbarProps) {
  const {
    project,
    schema,
    historyIndex,
    history,
    undo,
    redo,
    saveSnapshot,
    collaborators,
    loadTemplate,
  } = useSchemaStore();

  const [savedToast, setSavedToast] = useState(false);

  const handleSaveSnapshot = () => {
    saveSnapshot(`Checkpoint v${schema.version + 1}`);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  return (
    <div className="flex h-14 w-full shrink-0 items-center justify-between border-b border-[#1C2436] bg-[#07090F] px-4 select-none">
      {/* Left Area: Back nav & Project Details */}
      <div className="flex items-center gap-3">
        <Link
          href="/app/dashboard"
          className="flex h-8 w-8 items-center justify-center rounded border border-[#1C2436] bg-[#111622] text-[#94A3B8] hover:border-[#28354D] hover:text-[#F8FAFC] transition-colors"
          title="Back to Dashboard"
        >
          <ArrowLeft size={15} />
        </Link>

        <div className="h-4 w-px bg-[#1C2436]" />

        <div>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-xs sm:text-sm text-[#F8FAFC]">
              {project?.name || "storefront-production"}
            </span>
            <span className="rounded bg-[#F59E0B]/15 px-1.5 py-0.5 text-[10px] font-mono text-[#FBBF24]">
              v{schema.version}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-[#64748B] font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>CRDT_EDGE // SYNCED</span>
          </div>
        </div>
      </div>

      {/* Middle Area: Actions, Templates & History */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenAddTable}
          className="btn-primary text-xs py-1.5 px-3"
          data-testid="add-table-btn"
        >
          <Plus size={13} weight="bold" />
          <span>Add Table</span>
        </button>

        {/* Template Quick Switcher */}
        <select
          onChange={(e) => {
            if (e.target.value) loadTemplate(e.target.value);
          }}
          defaultValue=""
          className="hidden md:inline-block rounded border border-[#1C2436] bg-[#111622] px-2.5 py-1.5 text-xs font-mono text-[#94A3B8] hover:border-[#28354D] focus:outline-none"
        >
          <option value="" disabled>
            Load Template...
          </option>
          {SCHEMA_TEMPLATES.map((tmpl) => (
            <option key={tmpl.id} value={tmpl.id}>
              {tmpl.name}
            </option>
          ))}
        </select>

        <div className="hidden sm:block h-4 w-px bg-[#1C2436]" />

        {/* Undo / Redo */}
        <div className="hidden sm:flex items-center gap-1">
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className="flex h-8 w-8 items-center justify-center rounded border border-[#1C2436] bg-[#111622] text-[#94A3B8] hover:text-[#F8FAFC] disabled:opacity-40 transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <ArrowCounterClockwise size={13} />
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="flex h-8 w-8 items-center justify-center rounded border border-[#1C2436] bg-[#111622] text-[#94A3B8] hover:text-[#F8FAFC] disabled:opacity-40 transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <ArrowClockwise size={13} />
          </button>
        </div>

        {/* Migrations Direct Link */}
        <Link
          href={`/app/${project?.id || "proj_demo_saas"}/migrations`}
          className="hidden lg:flex items-center gap-1.5 rounded border border-[#1C2436] bg-[#111622] px-3 py-1.5 text-xs font-medium text-[#94A3B8] hover:border-[#28354D] hover:text-[#F8FAFC] transition-colors"
          title="Open Migrations Diff Engine"
        >
          <GitBranch size={13} className="text-[#F59E0B]" />
          <span>Diff Engine</span>
        </Link>

        {/* Save Checkpoint */}
        <button
          onClick={handleSaveSnapshot}
          className="flex items-center gap-1.5 rounded border border-[#1C2436] bg-[#111622] px-3 py-1.5 text-xs font-medium text-[#94A3B8] hover:border-[#28354D] hover:text-[#F8FAFC] transition-colors"
          title="Save named version checkpoint"
        >
          {savedToast ? <Check size={13} className="text-[#10B981]" /> : <FloppyDisk size={13} />}
          <span>{savedToast ? "Saved!" : "Checkpoint"}</span>
        </button>
      </div>

      {/* Right Area: Collab avatars & Export/Share */}
      <div className="flex items-center gap-3">
        {/* Collaborators Avatar Stack */}
        <div className="hidden sm:flex items-center gap-1.5">
          <div className="flex -space-x-2">
            {collaborators.map((c) => (
              <div
                key={c.id}
                className="relative inline-block"
                title={`${c.name} (${c.selectedTableId ? `editing ${c.selectedTableId}` : "viewing"})`}
              >
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="h-6 w-6 rounded-full border-2 object-cover"
                  style={{ borderColor: c.color }}
                />
                <span
                  className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full border border-[#07090F]"
                  style={{ backgroundColor: c.color }}
                />
              </div>
            ))}
          </div>
          <span className="rounded bg-[#111622] px-1.5 py-0.5 text-[10px] font-mono text-[#94A3B8]">
            3 online
          </span>
        </div>

        <div className="h-4 w-px bg-[#1C2436]" />

        {/* Share Button */}
        <button
          onClick={onOpenShare}
          className="flex items-center gap-1.5 rounded border border-[#1C2436] bg-[#111622] px-3 py-1.5 text-xs font-medium text-[#94A3B8] hover:border-[#28354D] hover:text-[#F8FAFC] transition-colors"
        >
          <ShareNetwork size={14} />
          <span>Share</span>
        </button>

        {/* Export Button */}
        <button
          onClick={onOpenExport}
          className="btn-primary text-xs py-1.5 px-3.5"
          data-testid="export-modal-btn"
        >
          <Export size={14} weight="bold" />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
}
