"use client";

import { useState } from "react";
import { X, Copy, Check, DownloadSimple, FileCode } from "@phosphor-icons/react";
import { useSchemaStore } from "@/lib/store";
import { generateSQL, SQLDialect } from "@/lib/sql-generator";
import { generatePrismaSchema } from "@/lib/prisma-generator";
import { generateDrizzleSchema } from "@/lib/drizzle-generator";

type ExportFormat = "postgresql" | "mysql" | "sqlite" | "prisma" | "drizzle";

export function ExportModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { schema, project } = useSchemaStore();
  const [format, setFormat] = useState<ExportFormat>("postgresql");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  let codeOutput = "";
  let fileExtension = "sql";

  switch (format) {
    case "postgresql":
      codeOutput = generateSQL(schema, "postgresql");
      fileExtension = "sql";
      break;
    case "mysql":
      codeOutput = generateSQL(schema, "mysql");
      fileExtension = "sql";
      break;
    case "sqlite":
      codeOutput = generateSQL(schema, "sqlite");
      fileExtension = "sql";
      break;
    case "prisma":
      codeOutput = generatePrismaSchema(schema);
      fileExtension = "prisma";
      break;
    case "drizzle":
      codeOutput = generateDrizzleSchema(schema);
      fileExtension = "ts";
      break;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(codeOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = `${project?.name || "schema"}.${fileExtension}`;
    const blob = new Blob([codeOutput], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="flex h-[90vh] max-h-[720px] w-full max-w-4xl flex-col rounded-2xl border border-[#253047] bg-[#0D1117] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1A2133] px-6 py-4 bg-[#0A0C12]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB]/20 text-[#60A5FA]">
              <FileCode size={18} weight="duotone" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#F0F4FF]">
                Export Schema Code
              </h3>
              <p className="text-[11px] text-[#7A90B0]">
                Compiled live from your active studio canvas model (v{schema.version}).
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#7A90B0] hover:text-[#F0F4FF] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Format Selector Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#1A2133] bg-[#0A0C12] px-6 py-2.5">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <button
              onClick={() => setFormat("postgresql")}
              className={`rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
                format === "postgresql"
                  ? "bg-[#2563EB] text-white"
                  : "bg-[#131920] text-[#7A90B0] hover:text-[#F0F4FF]"
              }`}
            >
              PostgreSQL (.sql)
            </button>
            <button
              onClick={() => setFormat("prisma")}
              className={`rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
                format === "prisma"
                  ? "bg-[#2563EB] text-white"
                  : "bg-[#131920] text-[#7A90B0] hover:text-[#F0F4FF]"
              }`}
            >
              Prisma (.prisma)
            </button>
            <button
              onClick={() => setFormat("drizzle")}
              className={`rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
                format === "drizzle"
                  ? "bg-[#2563EB] text-white"
                  : "bg-[#131920] text-[#7A90B0] hover:text-[#F0F4FF]"
              }`}
            >
              Drizzle ORM (.ts)
            </button>
            <button
              onClick={() => setFormat("mysql")}
              className={`rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
                format === "mysql"
                  ? "bg-[#2563EB] text-white"
                  : "bg-[#131920] text-[#7A90B0] hover:text-[#F0F4FF]"
              }`}
            >
              MySQL (.sql)
            </button>
            <button
              onClick={() => setFormat("sqlite")}
              className={`rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
                format === "sqlite"
                  ? "bg-[#2563EB] text-white"
                  : "bg-[#131920] text-[#7A90B0] hover:text-[#F0F4FF]"
              }`}
            >
              SQLite (.sql)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-lg border border-[#253047] bg-[#131920] px-3 py-1.5 text-xs font-medium text-[#F0F4FF] hover:bg-[#1A2133] transition-colors cursor-pointer"
            >
              {copied ? <Check size={14} className="text-[#10B981]" /> : <Copy size={14} />}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-3.5 py-1.5 text-xs font-medium text-white hover:bg-[#1D4ED8] transition-colors cursor-pointer"
            >
              <DownloadSimple size={14} weight="bold" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Code Content View */}
        <div className="flex-1 overflow-auto bg-[#07090E] p-6 font-mono text-xs leading-relaxed text-[#93C5FD]">
          <pre className="selection:bg-[#2563EB]/40">
            <code>{codeOutput}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
