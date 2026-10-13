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
} from "@phosphor-icons/react";
import { useSchemaStore } from "@/lib/store";
import { generateMigrationDiff } from "@/lib/diff-engine";

export default function MigrationsPage() {
  const { snapshots, schema, saveSnapshot } = useSchemaStore();
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
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#0B0E14]">
      {/* Top Header */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#1C2436] bg-[#07090F] px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/app/proj_demo_saas"
            className="flex h-8 w-8 items-center justify-center rounded border border-[#1C2436] bg-[#111622] text-[#94A3B8] hover:border-[#28354D] hover:text-[#F8FAFC]"
            title="Back to Studio Canvas"
          >
            <ArrowLeft size={15} />
          </Link>
          <div className="h-4 w-px bg-[#1C2436]" />
          <div>
            <h1 className="font-display text-sm font-bold text-[#F8FAFC]">
              Migrations & AST Version Diff
            </h1>
            <p className="text-[10px] text-[#94A3B8] font-mono">
              Deterministic DDL compiler comparing schema mutations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => saveSnapshot(`Manual Checkpoint v${schema.version + 1}`)}
            className="btn-primary text-xs py-1.5 px-3"
          >
            <ClockCounterClockwise size={14} weight="bold" />
            <span>Create Checkpoint</span>
          </button>
        </div>
      </div>

      {/* Main Split Body */}
      <div className="flex flex-1 min-h-0">
        {/* Left Timeline Panel (320px) */}
        <aside className="h-full w-80 shrink-0 border-r border-[#1C2436] bg-[#07090F] p-5 overflow-y-auto">
          <div className="flex items-center justify-between border-b border-[#1C2436] pb-3 text-xs text-[#94A3B8]">
            <span className="font-semibold uppercase tracking-wider text-[#F8FAFC] font-mono">
              Version Timeline
            </span>
            <span className="font-mono text-[11px]">{snapshots.length} Snapshots</span>
          </div>

          <div className="mt-4 space-y-3">
            {snapshots.map((snap, idx) => {
              const isSelected = selectedSnapshotIndex === idx;

              return (
                <div
                  key={snap.id}
                  onClick={() => setSelectedSnapshotIndex(idx)}
                  className={`rounded border p-3.5 transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#F59E0B] bg-[#182030] shadow-xl ring-1 ring-[#F59E0B]"
                      : "border-[#1C2436] bg-[#111622] hover:border-[#28354D]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-[#F59E0B]/15 px-2 py-0.5 font-mono text-[10px] font-bold text-[#FBBF24]">
                      Version {snap.version}
                    </span>
                    <span className="font-mono text-[10px] text-[#64748B]">
                      {new Date(snap.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>

                  <h3 className="font-display mt-2 text-xs font-bold text-[#F8FAFC]">
                    {snap.label || "Schema Snapshot"}
                  </h3>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-[#94A3B8]">
                    <span>By {snap.authorName}</span>
                    <span className="font-mono">{snap.data.tables.length} tables</span>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Right SQL Diff Viewer */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#0B0E14] overflow-hidden">
          {/* Action Toolbar */}
          <div className="flex items-center justify-between border-b border-[#1C2436] bg-[#07090F] px-6 py-3">
            <div className="flex items-center gap-2 text-xs font-mono">
              <GitDiff size={16} className="text-[#F59E0B]" />
              <span className="text-[#F8FAFC]">
                Diff: <strong className="text-[#FBBF24]">v{targetSnapshot?.version || 1}</strong> → <strong className="text-[#10B981]">v{schema.version} (Active)</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="btn-secondary text-xs py-1.5 px-3"
              >
                {copied ? <Check size={14} className="text-[#10B981]" /> : <Copy size={14} />}
                <span>{copied ? "Copied!" : "Copy SQL"}</span>
              </button>

              <button
                onClick={handleDownload}
                className="btn-primary text-xs py-1.5 px-3"
              >
                <DownloadSimple size={14} weight="bold" />
                <span>Download .sql</span>
              </button>
            </div>
          </div>

          {/* Diff Summary Cards */}
          <div className="grid grid-cols-4 gap-4 border-b border-[#1C2436] bg-[#111622] px-6 py-3 font-mono text-xs">
            <div>
              <span className="text-[#64748B]">Added Tables:</span>
              <p className="font-bold text-[#10B981]">+{diff.addedTables.length}</p>
            </div>
            <div>
              <span className="text-[#64748B]">Dropped Tables:</span>
              <p className="font-bold text-[#EF4444]">-{diff.droppedTables.length}</p>
            </div>
            <div>
              <span className="text-[#64748B]">Added Columns:</span>
              <p className="font-bold text-[#10B981]">+{diff.addedColumns.length}</p>
            </div>
            <div>
              <span className="text-[#64748B]">Dropped Columns:</span>
              <p className="font-bold text-[#EF4444]">-{diff.droppedColumns.length}</p>
            </div>
          </div>

          {/* SQL Diff Code Editor View */}
          <div className="flex-1 overflow-auto p-6 font-mono text-xs leading-relaxed text-[#FCD34D] bg-[#0B0E14]">
            <pre className="selection:bg-[#F59E0B]/30">
              <code>{diff.sql}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
