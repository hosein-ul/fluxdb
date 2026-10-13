"use client";

import Link from "next/link";
import { SchemaCanvas } from "@/components/canvas/schema-canvas";
import { useSchemaStore } from "@/lib/store";
import { Eye, ArrowRight } from "@phosphor-icons/react";

export default function PublicSharePage() {
  const { project, schema } = useSchemaStore();

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#0B0E14] text-[#F8FAFC]">
      {/* Top Read-Only Banner */}
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-[#F59E0B]/30 bg-[#F59E0B]/10 px-4 text-xs font-mono text-[#FBBF24]">
        <div className="flex items-center gap-2">
          <Eye size={16} weight="bold" />
          <span>
            Viewing <strong>{project?.name || "saas-subscription-service"}</strong> (v{schema.version}) — Read-Only Mode
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-[11px] text-[#94A3B8]">
            Shared via FluxDB Studio
          </span>
          <Link
            href="/app/dashboard"
            className="btn-primary text-xs py-1 px-3"
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
