"use client";

import { useState } from "react";
import { X, Copy, Check, DownloadSimple, FileCode } from "@phosphor-icons/react";
import { useSchemaStore } from "@/lib/store";
import { generateSQL } from "@/lib/sql-generator";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="flex h-[90vh] max-h-[720px] w-full max-w-4xl flex-col rounded-2xl border border-[#CBD5E1] bg-[#FFFFFF] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0] px-6 py-4 bg-[#FFFFFF]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F172A] text-[#FFFFFF] shadow-xs">
              <FileCode size={18} weight="bold" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#0F172A]">
                Export Target Dialect DDL
              </h3>
              <p className="text-[11px] text-[#64748B] font-mono">
                Synthesized live from schema topology AST (v{schema.version}).
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded p-1.5 text-[#64748B] hover:text-[#0F172A] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Format Selector Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#E2E8F0] bg-[#F8FAFC] px-6 py-2.5">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <button
              onClick={() => setFormat("postgresql")}
              className={`rounded-md px-3 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
                format === "postgresql"
                  ? "bg-[#0F172A] text-[#FFFFFF] font-bold shadow-xs"
                  : "bg-[#FFFFFF] text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0]"
              }`}
            >
              PostgreSQL (.sql)
            </button>
            <button
              onClick={() => setFormat("drizzle")}
              className={`rounded-md px-3 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
                format === "drizzle"
                  ? "bg-[#0F172A] text-[#FFFFFF] font-bold shadow-xs"
                  : "bg-[#FFFFFF] text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0]"
              }`}
            >
              Drizzle ORM (.ts)
            </button>
            <button
              onClick={() => setFormat("prisma")}
              className={`rounded-md px-3 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
                format === "prisma"
                  ? "bg-[#0F172A] text-[#FFFFFF] font-bold shadow-xs"
                  : "bg-[#FFFFFF] text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0]"
              }`}
            >
              Prisma (.prisma)
            </button>
            <button
              onClick={() => setFormat("mysql")}
              className={`rounded-md px-3 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
                format === "mysql"
                  ? "bg-[#0F172A] text-[#FFFFFF] font-bold shadow-xs"
                  : "bg-[#FFFFFF] text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0]"
              }`}
            >
              MySQL (.sql)
            </button>
            <button
              onClick={() => setFormat("sqlite")}
              className={`rounded-md px-3 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
                format === "sqlite"
                  ? "bg-[#0F172A] text-[#FFFFFF] font-bold shadow-xs"
                  : "bg-[#FFFFFF] text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0]"
              }`}
            >
              SQLite (.sql)
            </button>
          </div>

          <div className="flex items-center gap-2 py-1">
            <button
              onClick={handleCopy}
              className="btn-secondary text-xs py-1.5 px-3 font-mono"
            >
              {copied ? <Check size={14} className="text-[#059669]" /> : <Copy size={14} />}
              <span>{copied ? "Copied" : "Copy Code"}</span>
            </button>
            <button
              onClick={handleDownload}
              className="btn-primary text-xs py-1.5 px-3 font-mono"
            >
              <DownloadSimple size={14} weight="bold" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Code Preview Area */}
        <div className="flex-1 overflow-auto p-6 bg-[#FFFFFF] font-mono text-xs leading-relaxed text-[#0F172A]">
          <pre className="overflow-x-auto rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-[#0F172A]">
            <code>{codeOutput}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
