"use client";

import Link from "next/link";
import { SchemaCanvas } from "@/components/canvas/schema-canvas";
import { useSchemaStore } from "@/lib/store";
import { Eye, ArrowRight, Database } from "@phosphor-icons/react";

export default function PublicSharePage() {
  const { project, schema } = useSchemaStore();

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#07090E] text-[#F0F4FF]">
      {/* Top Read-Only Banner */}
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-[#F59E0B]/30 bg-[#F59E0B]/10 px-4 text-xs font-mono text-[#F59E0B]">
        <div className="flex items-center gap-2">
          <Eye size={16} weight="bold" />
          <span>
            Viewing <strong>{project?.name || "storefront-production"}</strong> (v{schema.version}) — Read-Only Mode
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-[11px] text-[#7A90B0]">
            Shared via FluxDB Studio
          </span>
          <Link
            href="/app/dashboard"
            className="flex items-center gap-1 rounded bg-[#2563EB] px-2.5 py-1 text-xs font-semibold text-white hover:bg-[#1D4ED8] transition-colors"
          >
            <span>Open in FluxDB</span>
            <ArrowRight size={12} weight="bold" />
          </Link>
        </div>
      </div>

      {/* Read-Only Canvas Mount */}
      <div className="flex-1 w-full h-full overflow-hidden">
        <SchemaCanvas readOnly={true} />
      </div>
    </div>
  );
}
