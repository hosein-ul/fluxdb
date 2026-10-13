"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ClockCounterClockwise,
  GitDiff,
  Copy,
  Check,
  DownloadSimple,
  ArrowClockwise,
  Calendar,
} from "@phosphor-icons/react";
import { useSchemaStore } from "@/lib/store";
import { generateMigrationDiff } from "@/lib/diff-engine";

export default function MigrationsPage() {
  const { snapshots, schema, project, saveSnapshot } = useSchemaStore();
  const [selectedSnapshotIndex, setSelectedSnapshotIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  // Compute diff between current active schema and selected snapshot
  const targetSnapshot = snapshots[selectedSnapshotIndex] || snapshots[0];
  const diff = generateMigrationDiff(targetSnapshot ? targetSnapshot.data : schema, schema);

  const handleCopy = () => {
    navigator.clipboard.writeText(diff.sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = `migration_v${targetSnapshot?.version || 1}_to_v${schema.version}.sql`;
    const blob = new Blob([diff.sql], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#07090E]">
      {/* Top Header */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#1A2133] bg-[#0A0C12] px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/app/proj-ecommerce-main"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1A2133] bg-[#0D1117] text-[#7A90B0] hover:text-[#F0F4FF]"
          >
            <ArrowLeft size={16} />
          </Link>
          <div className="h-4 w-px bg-[#1A2133]" />
          <div>
            <h1 className="font-display text-sm font-bold text-[#F0F4FF]">
              Migrations & Version Diff
            </h1>
            <p className="text-[10px] text-[#7A90B0]">
              Automated structural SQL diff between versions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => saveSnapshot(`Manual Checkpoint v${schema.version + 1}`)}
            className="btn-primary text-xs py-1.5 px-3"
          >
            <ClockCounterClockwise size={14} weight="bold" />
            <span>Create New Checkpoint</span>
          </button>
        </div>
      </div>

      {/* Main Split Body */}
      <div className="flex flex-1 min-h-0">
        {/* Left Timeline Panel (320px) */}
        <aside className="h-full w-80 shrink-0 border-r border-[#1A2133] bg-[#0A0C12] p-5 overflow-y-auto">
          <div className="flex items-center justify-between border-b border-[#1A2133] pb-3 text-xs text-[#7A90B0]">
            <span className="font-semibold uppercase tracking-wider text-[#F0F4FF]">
              Version Timeline
            </span>
            <span>{snapshots.length} Snapshots</span>
          </div>

          <div className="mt-4 space-y-3">
            {snapshots.map((snap, idx) => {
              const isSelected = selectedSnapshotIndex === idx;

              return (
                <div
                  key={snap.id}
                  onClick={() => setSelectedSnapshotIndex(idx)}
                  className={`rounded-xl border p-3.5 transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#2563EB] bg-[#0D1117] shadow-lg"
                      : "border-[#1A2133] bg-[#07090E] hover:border-[#253047]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-[#2563EB]/15 px-2 py-0.5 font-mono text-[10px] font-bold text-[#93C5FD]">
                      Version {snap.version}
                    </span>
                    <span className="font-mono text-[10px] text-[#4A5F7A]">
                      {new Date(snap.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>

                  <h3 className="font-display mt-2 text-xs font-bold text-[#F0F4FF]">
                    {snap.label || "Schema Snapshot"}
                  </h3>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-[#7A90B0]">
                    <span>By {snap.authorName}</span>
                    <span>{snap.data.tables.length} tables</span>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Right SQL Diff Viewer */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#07090E] overflow-hidden">
          {/* Action Toolbar */}
          <div className="flex items-center justify-between border-b border-[#1A2133] bg-[#0A0C12] px-6 py-3">
            <div className="flex items-center gap-2 text-xs font-mono">
              <GitDiff size={16} className="text-[#60A5FA]" />
              <span className="text-[#F0F4FF]">
                Diff: <strong className="text-[#93C5FD]">v{targetSnapshot?.version || 1}</strong> → <strong className="text-[#10B981]">v{schema.version} (Active)</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg border border-[#253047] bg-[#131920] px-3 py-1.5 text-xs font-medium text-[#F0F4FF] hover:bg-[#1A2133] transition-colors cursor-pointer"
              >
                {copied ? <Check size={14} className="text-[#10B981]" /> : <Copy size={14} />}
                <span>{copied ? "Copied!" : "Copy Migration SQL"}</span>
              </button>

              <button
                onClick={handleDownload}
                className="btn-primary text-xs py-1.5 px-3 cursor-pointer"
              >
                <DownloadSimple size={14} weight="bold" />
                <span>Download .sql</span>
              </button>
            </div>
          </div>

          {/* Diff Summary Cards */}
          <div className="grid grid-cols-4 gap-4 border-b border-[#1A2133] bg-[#0D1117] px-6 py-3 font-mono text-xs">
            <div>
              <span className="text-[#7A90B0]">Added Tables:</span>
              <p className="font-bold text-[#10B981]">+{diff.addedTables.length}</p>
            </div>
            <div>
              <span className="text-[#7A90B0]">Dropped Tables:</span>
              <p className="font-bold text-[#EF4444]">-{diff.droppedTables.length}</p>
            </div>
            <div>
              <span className="text-[#7A90B0]">Added Columns:</span>
              <p className="font-bold text-[#10B981]">+{diff.addedColumns.length}</p>
            </div>
            <div>
              <span className="text-[#7A90B0]">Dropped Columns:</span>
              <p className="font-bold text-[#EF4444]">-{diff.droppedColumns.length}</p>
            </div>
          </div>

          {/* SQL Diff Code Editor View */}
          <div className="flex-1 overflow-auto p-6 font-mono text-xs leading-relaxed text-[#93C5FD] bg-[#050709]">
            <pre className="selection:bg-[#2563EB]/40">
              <code>{diff.sql}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
