"use client";

import Link from "next/link";
import { SchemaCanvas } from "@/components/canvas/schema-canvas";
import { useSchemaStore } from "@/lib/store";
import { Eye, ArrowRight } from "@phosphor-icons/react";

export default function PublicSharePage() {
  const { project, schema } = useSchemaStore();

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#FFFFFF] text-[#0F172A]">
      {/* Top Read-Only Banner */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 text-xs font-mono text-[#0F172A]">
        <div className="flex items-center gap-2">
          <Eye size={16} weight="bold" className="text-[#059669]" />
          <span>
            Viewing <strong>{project?.name || "saas-subscription-service"}</strong> (v{schema.version}) — Read-Only Mode
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-[11px] text-[#64748B]">
            Shared via FluxDB Studio
          </span>
          <Link
            href="/app/dashboard"
            className="btn-primary text-xs py-1.5 px-3"
          >
            <span>Open in FluxDB</span>
            <ArrowRight size={12} weight="bold" />
          </Link>
        </div>
      </div>

      {/* Read-Only Canvas Mount */}
      <div className="flex-1 w-full h-full overflow-hidden bg-[#F8FAFC]">
        <SchemaCanvas readOnly={true} />
      </div>
    </div>
  );
}
