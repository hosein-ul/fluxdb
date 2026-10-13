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
    <aside className="flex h-screen w-60 shrink-0 flex-col justify-between border-r border-[#E2E8F0] bg-[#FFFFFF] text-xs">
      {/* Top Part: Logo & Navigation */}
      <div>
        {/* Brand bar */}
        <div className="flex h-14 items-center justify-between border-b border-[#E2E8F0] px-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0F172A] text-[#FFFFFF] shadow-sm">
              <Database size={15} weight="bold" />
            </div>
            <span className="font-display text-sm font-extrabold tracking-tight text-[#0F172A]">
              FluxDB
            </span>
          </Link>
          <span className="rounded border border-[#E2E8F0] bg-[#F8FAFC] px-1.5 py-0.5 text-[10px] font-mono text-[#64748B]">
            v0.38
          </span>
        </div>

        {/* Project Context */}
        <div className="p-3">
          <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-2.5">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B] font-mono">
              Active Repository
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#0F172A] truncate">
                {project?.name || "saas-subscription-service"}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#059669]" />
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="space-y-1 px-3">
          <Link
            href="/app/dashboard"
            className={`flex items-center gap-2.5 rounded-md px-3 py-2 font-medium transition-colors ${
              pathname === "/app/dashboard"
                ? "bg-[#F1F5F9] text-[#0F172A] border border-[#CBD5E1] font-semibold shadow-xs"
                : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
            }`}
          >
            <Folders size={16} weight="duotone" className={pathname === "/app/dashboard" ? "text-[#0F172A]" : "text-[#64748B]"} />
            <span>All Projects</span>
          </Link>

          <Link
            href="/app/proj_demo_saas"
            className={`flex items-center gap-2.5 rounded-md px-3 py-2 font-medium transition-colors ${
              pathname.includes("/app/") && !pathname.includes("/migrations") && !pathname.endsWith("/dashboard")
                ? "bg-[#F1F5F9] text-[#0F172A] border border-[#CBD5E1] font-semibold shadow-xs"
                : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
            }`}
          >
            <FlowArrow size={16} weight="duotone" className={pathname.includes("/app/") && !pathname.includes("/migrations") && !pathname.endsWith("/dashboard") ? "text-[#0F172A]" : "text-[#64748B]"} />
            <span>Canvas Studio</span>
          </Link>

          <Link
            href="/app/proj_demo_saas/migrations"
            className={`flex items-center gap-2.5 rounded-md px-3 py-2 font-medium transition-colors ${
              pathname.includes("/migrations")
                ? "bg-[#F1F5F9] text-[#0F172A] border border-[#CBD5E1] font-semibold shadow-xs"
                : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
            }`}
          >
            <ClockCounterClockwise size={16} weight="duotone" className={pathname.includes("/migrations") ? "text-[#0F172A]" : "text-[#64748B]"} />
            <span>Migrations & Diff</span>
          </Link>
        </nav>
      </div>

      {/* Bottom Part: User profile & status */}
      <div className="border-t border-[#E2E8F0] p-3">
        <div className="flex items-center justify-between rounded-lg bg-[#F8FAFC] p-2.5 border border-[#E2E8F0]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0F172A] text-[11px] font-bold text-[#FFFFFF]">
              LE
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-xs font-semibold text-[#0F172A]">Staff Engineer</p>
              <p className="truncate text-[10px] text-[#64748B] font-mono">dev@fluxdb.studio</p>
            </div>
          </div>
          <Link
            href="/"
            className="text-[#64748B] hover:text-[#0F172A] p-1 transition-colors"
            title="Exit to Landing"
          >
            <SignOut size={16} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
