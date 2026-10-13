"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Database,
  Folders,
  Plus,
  Gear,
  Question,
  SignOut,
  FlowArrow,
  ShareNetwork,
  Export,
  ClockCounterClockwise,
} from "@phosphor-icons/react";
import { useSchemaStore } from "@/lib/store";

export function AppSidebar() {
  const pathname = usePathname();
  const { project } = useSchemaStore();

  const isEditor = pathname.includes("/app/") && !pathname.endsWith("/dashboard");

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col justify-between border-r border-[#1A2133] bg-[#0A0C12] text-xs">
      {/* Top Part: Logo & Navigation */}
      <div>
        {/* Brand bar */}
        <div className="flex h-14 items-center justify-between border-b border-[#1A2133] px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#2563EB]/40 bg-[#0D1117] text-[#60A5FA]">
              <Database size={16} weight="duotone" />
            </div>
            <span className="font-display text-sm font-bold text-[#F0F4FF]">
              Flux<span className="text-[#60A5FA]">DB</span>
            </span>
          </Link>
          <span className="rounded bg-[#131920] px-1.5 py-0.5 text-[10px] font-mono text-[#7A90B0]">
            v1.0
          </span>
        </div>

        {/* Project Context */}
        <div className="p-3">
          <div className="rounded-lg border border-[#1A2133] bg-[#0D1117] p-2.5">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#4A5F7A]">
              Active Project
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#F0F4FF] truncate">
                {project?.name || "storefront-production"}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="space-y-1 px-3">
          <Link
            href="/app/dashboard"
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 font-medium transition-colors ${
              pathname === "/app/dashboard"
                ? "bg-[#2563EB]/15 text-[#93C5FD] border border-[#2563EB]/30"
                : "text-[#7A90B0] hover:bg-[#131920] hover:text-[#F0F4FF]"
            }`}
          >
            <Folders size={16} weight="duotone" />
            <span>All Projects</span>
          </Link>

          <Link
            href="/app/proj-ecommerce-main"
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 font-medium transition-colors ${
              pathname.includes("/app/proj-ecommerce-main") && !pathname.includes("/migrations")
                ? "bg-[#2563EB]/15 text-[#93C5FD] border border-[#2563EB]/30"
                : "text-[#7A90B0] hover:bg-[#131920] hover:text-[#F0F4FF]"
            }`}
          >
            <FlowArrow size={16} weight="duotone" />
            <span>Canvas Studio</span>
          </Link>

          <Link
            href="/app/proj-ecommerce-main/migrations"
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 font-medium transition-colors ${
              pathname.includes("/migrations")
                ? "bg-[#2563EB]/15 text-[#93C5FD] border border-[#2563EB]/30"
                : "text-[#7A90B0] hover:bg-[#131920] hover:text-[#F0F4FF]"
            }`}
          >
            <ClockCounterClockwise size={16} weight="duotone" />
            <span>Migrations & Diff</span>
          </Link>
        </nav>
      </div>

      {/* Bottom Part: User profile & status */}
      <div className="border-t border-[#1A2133] p-3">
        <div className="flex items-center justify-between rounded-lg bg-[#0D1117] p-2.5 border border-[#1A2133]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2563EB] text-[11px] font-bold text-white">
              LE
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-xs font-semibold text-[#F0F4FF]">Lead Engineer</p>
              <p className="truncate text-[10px] text-[#4A5F7A]">team@fluxdb.dev</p>
            </div>
          </div>
          <Link
            href="/"
            className="text-[#7A90B0] hover:text-[#F0F4FF] p-1"
            title="Sign out"
          >
            <SignOut size={16} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
