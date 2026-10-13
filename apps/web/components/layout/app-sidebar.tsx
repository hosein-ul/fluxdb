"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Database,
  Folders,
  SignOut,
  FlowArrow,
  ClockCounterClockwise,
} from "@phosphor-icons/react";
import { useSchemaStore } from "@/lib/store";

export function AppSidebar() {
  const pathname = usePathname();
  const { project } = useSchemaStore();

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col justify-between border-r border-[#1C2436] bg-[#07090F] text-xs">
      {/* Top Part: Logo & Navigation */}
      <div>
        {/* Brand bar */}
        <div className="flex h-14 items-center justify-between border-b border-[#1C2436] px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded border border-[#F59E0B]/40 bg-[#111622] text-[#F59E0B] shadow-[0_0_12px_rgba(245,158,11,0.2)]">
              <Database size={16} weight="duotone" />
            </div>
            <span className="font-display text-sm font-bold text-[#F8FAFC]">
              Flux<span className="text-[#F59E0B]">DB</span>
            </span>
          </Link>
          <span className="rounded bg-[#111622] px-1.5 py-0.5 text-[10px] font-mono text-[#94A3B8]">
            v0.38
          </span>
        </div>

        {/* Project Context */}
        <div className="p-3">
          <div className="rounded border border-[#1C2436] bg-[#111622] p-2.5">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B] font-mono">
              Active Repository
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#F8FAFC] truncate">
                {project?.name || "saas-subscription-service"}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="space-y-1 px-3">
          <Link
            href="/app/dashboard"
            className={`flex items-center gap-2.5 rounded px-3 py-2 font-medium transition-colors ${
              pathname === "/app/dashboard"
                ? "bg-[#F59E0B]/15 text-[#FBBF24] border border-[#F59E0B]/30"
                : "text-[#94A3B8] hover:bg-[#111622] hover:text-[#F8FAFC]"
            }`}
          >
            <Folders size={16} weight="duotone" />
            <span>All Projects</span>
          </Link>

          <Link
            href="/app/proj_demo_saas"
            className={`flex items-center gap-2.5 rounded px-3 py-2 font-medium transition-colors ${
              pathname.includes("/app/") && !pathname.includes("/migrations") && !pathname.endsWith("/dashboard")
                ? "bg-[#F59E0B]/15 text-[#FBBF24] border border-[#F59E0B]/30"
                : "text-[#94A3B8] hover:bg-[#111622] hover:text-[#F8FAFC]"
            }`}
          >
            <FlowArrow size={16} weight="duotone" />
            <span>Canvas Studio</span>
          </Link>

          <Link
            href="/app/proj_demo_saas/migrations"
            className={`flex items-center gap-2.5 rounded px-3 py-2 font-medium transition-colors ${
              pathname.includes("/migrations")
                ? "bg-[#F59E0B]/15 text-[#FBBF24] border border-[#F59E0B]/30"
                : "text-[#94A3B8] hover:bg-[#111622] hover:text-[#F8FAFC]"
            }`}
          >
            <ClockCounterClockwise size={16} weight="duotone" />
            <span>Migrations & Diff</span>
          </Link>
        </nav>
      </div>

      {/* Bottom Part: User profile & status */}
      <div className="border-t border-[#1C2436] p-3">
        <div className="flex items-center justify-between rounded bg-[#111622] p-2.5 border border-[#1C2436]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-[#F59E0B] text-[11px] font-bold text-[#0B0E14]">
              LE
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-xs font-semibold text-[#F8FAFC]">Staff Engineer</p>
              <p className="truncate text-[10px] text-[#64748B] font-mono">dev@fluxdb.studio</p>
            </div>
          </div>
          <Link
            href="/"
            className="text-[#94A3B8] hover:text-[#F8FAFC] p-1"
            title="Exit to Landing"
          >
            <SignOut size={16} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
