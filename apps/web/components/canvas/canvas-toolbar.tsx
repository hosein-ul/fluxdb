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
  Sparkle,
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
    currentUser,
    loadTemplate,
  } = useSchemaStore();

  const [savedToast, setSavedToast] = useState(false);

  const handleSaveSnapshot = () => {
    saveSnapshot(`Checkpoint v${schema.version + 1}`);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  return (
    <div className="flex h-14 w-full shrink-0 items-center justify-between border-b border-[#1A2133] bg-[#0A0C12] px-4 select-none">
      {/* Left Area: Back nav & Project Details */}
      <div className="flex items-center gap-3">
        <Link
          href="/app/dashboard"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1A2133] bg-[#0D1117] text-[#7A90B0] hover:border-[#253047] hover:text-[#F0F4FF] transition-colors"
          title="Back to Dashboard"
        >
          <ArrowLeft size={16} />
        </Link>

        <div className="h-4 w-px bg-[#1A2133]" />

        <div>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-sm text-[#F0F4FF]">
              {project?.name || "storefront-production"}
            </span>
            <span className="rounded bg-[#2563EB]/15 px-1.5 py-0.2 text-[10px] font-mono text-[#93C5FD]">
              v{schema.version}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-[#4A5F7A]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>All modifications synchronized</span>
          </div>
        </div>
      </div>

      {/* Middle Area: Actions & History */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenAddTable}
          className="btn-primary text-xs py-1.5 px-3"
          data-testid="add-table-btn"
        >
          <Plus size={14} weight="bold" />
          <span>Table</span>
        </button>

        {/* Template Quick Switcher */}
        <select
          onChange={(e) => {
            if (e.target.value) loadTemplate(e.target.value);
          }}
          defaultValue=""
          className="rounded-lg border border-[#1A2133] bg-[#0D1117] px-2.5 py-1.5 text-xs font-mono text-[#7A90B0] hover:border-[#253047] focus:outline-none"
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

        <div className="h-4 w-px bg-[#1A2133]" />

        {/* Undo / Redo */}
        <div className="flex items-center gap-1">
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1A2133] bg-[#0D1117] text-[#7A90B0] hover:text-[#F0F4FF] disabled:opacity-40 transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <ArrowCounterClockwise size={14} />
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1A2133] bg-[#0D1117] text-[#7A90B0] hover:text-[#F0F4FF] disabled:opacity-40 transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <ArrowClockwise size={14} />
          </button>
        </div>

        {/* Save Checkpoint */}
        <button
          onClick={handleSaveSnapshot}
          className="flex items-center gap-1.5 rounded-lg border border-[#1A2133] bg-[#0D1117] px-3 py-1.5 text-xs font-medium text-[#7A90B0] hover:border-[#253047] hover:text-[#F0F4FF] transition-colors"
          title="Save named version checkpoint"
        >
          {savedToast ? <Check size={14} className="text-[#10B981]" /> : <FloppyDisk size={14} />}
          <span>{savedToast ? "Saved!" : "Checkpoint"}</span>
        </button>
      </div>

      {/* Right Area: Collab avatars & Export/Share */}
      <div className="flex items-center gap-3">
        {/* Collaborators Avatar Stack */}
        <div className="flex items-center gap-1.5">
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
                  className="h-7 w-7 rounded-full border-2 object-cover"
                  style={{ borderColor: c.color }}
                />
                <span
                  className="absolute bottom-0 right-0 h-2 w-2 rounded-full border border-[#0A0C12]"
                  style={{ backgroundColor: c.color }}
                />
              </div>
            ))}
          </div>
          <span className="rounded-full bg-[#131920] px-2 py-0.5 text-[10px] font-mono text-[#7A90B0]">
            3 online
          </span>
        </div>

        <div className="h-4 w-px bg-[#1A2133]" />

        {/* Share Button */}
        <button
          onClick={onOpenShare}
          className="flex items-center gap-1.5 rounded-lg border border-[#1A2133] bg-[#0D1117] px-3 py-1.5 text-xs font-medium text-[#7A90B0] hover:border-[#253047] hover:text-[#F0F4FF] transition-colors"
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
