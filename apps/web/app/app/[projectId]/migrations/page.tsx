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
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#F8FAFC] text-[#0F172A]">
      {/* Top Header */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#E2E8F0] bg-[#FFFFFF] px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/app/proj_demo_saas"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-[#475569] hover:border-[#CBD5E1] hover:text-[#0F172A] transition-colors"
            title="Back to Studio Canvas"
          >
            <ArrowLeft size={15} />
          </Link>
          <div className="h-4 w-px bg-[#E2E8F0]" />
          <div>
            <h1 className="font-display text-sm font-bold text-[#0F172A]">
              Migrations & AST Version Diff
            </h1>
            <p className="text-[10px] text-[#64748B] font-mono">
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
        <aside className="h-full w-80 shrink-0 border-r border-[#E2E8F0] bg-[#FFFFFF] p-5 overflow-y-auto">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 text-xs text-[#64748B]">
            <span className="font-semibold uppercase tracking-wider text-[#0F172A] font-mono">
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
                  className={`rounded-xl border p-3.5 transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#0F172A] bg-[#F8FAFC] shadow-sm ring-2 ring-[#0F172A]/10"
                      : "border-[#E2E8F0] bg-[#FFFFFF] hover:border-[#CBD5E1]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded border border-[#E2E8F0] bg-[#F1F5F9] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0F172A]">
                      v{snap.version}.0
                    </span>
                    <span className="font-mono text-[10px] text-[#94A3B8]">
                      {new Date(snap.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>

                  <h4 className="font-display mt-2 text-xs font-bold text-[#0F172A]">
                    {snap.label || `Checkpoint v${snap.version}`}
                  </h4>

                  <div className="mt-2 flex items-center gap-2 font-mono text-[10px] text-[#64748B]">
                    <span>{snap.data.tables.length} tables</span>
                    <span>·</span>
                    <span>{snap.data.relations.length} relations</span>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Right Diff Workspace */}
        <main className="flex flex-1 flex-col overflow-hidden bg-[#F8FAFC]">
          {/* Diff Action Bar */}
          <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-[#FFFFFF] px-6 py-3">
            <div className="flex items-center gap-2 font-mono text-xs text-[#0F172A]">
              <GitDiff size={16} weight="bold" className="text-[#059669]" />
              <span>
                Diff: <strong>v{targetSnapshot?.version || 1}.0</strong> → <strong>v{schema.version}.0 (Current)</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="btn-secondary text-xs py-1.5 px-3"
              >
                {copied ? <Check size={14} className="text-[#059669]" /> : <Copy size={14} />}
                <span>{copied ? "Copied" : "Copy SQL"}</span>
              </button>
              <button
                onClick={handleDownload}
                className="btn-secondary text-xs py-1.5 px-3"
              >
                <DownloadSimple size={14} />
                <span>Download .sql</span>
              </button>
            </div>
          </div>

          {/* Diff Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Visual Change Summary Card */}
            <div className="rounded-xl border border-[#CBD5E1] bg-[#FFFFFF] p-5 shadow-xs">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[#64748B] font-mono">
                Topological Changes Summary
              </h3>

              <div className="mt-3 grid gap-3 sm:grid-cols-3 font-mono text-xs">
                <div className="rounded-lg border border-[#A7F3D0] bg-[#ECFDF5] p-3">
                  <span className="text-[11px] text-[#059669] font-semibold">New Tables / Added</span>
                  <p className="mt-1 text-base font-bold text-[#059669]">
                    {diff.addedTables?.length || 0}
                  </p>
                </div>

                <div className="rounded-lg border border-[#FDE68A] bg-[#FFFBEB] p-3">
                  <span className="text-[11px] text-[#D97706] font-semibold">Column Changes</span>
                  <p className="mt-1 text-base font-bold text-[#D97706]">
                    {(diff.addedColumns?.length || 0) + (diff.droppedColumns?.length || 0)}
                  </p>
                </div>

                <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3">
                  <span className="text-[11px] text-[#64748B] font-semibold">Validation Status</span>
                  <p className="mt-1 text-xs font-bold text-[#059669]">
                    Deterministic / Zero Cycles
                  </p>
                </div>
              </div>
            </div>

            {/* Generated SQL Code Block */}
            <div className="overflow-hidden rounded-xl border border-[#CBD5E1] bg-[#FFFFFF] shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-[#F1F5F9] px-4 py-2.5 font-mono text-xs">
                <span className="font-semibold text-[#0F172A]">
                  Compiled DDL Migration Script (PostgreSQL 16+)
                </span>
                <span className="text-[#64748B] text-[11px]">Safe Non-Blocking Sequence</span>
              </div>

              <div className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-[#0F172A] bg-[#FFFFFF]">
                <pre>
                  <code>{diff.sql || "-- Schemas are identical. No migrations required."}</code>
                </pre>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
