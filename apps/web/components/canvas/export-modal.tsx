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
      <div className="flex h-[90vh] max-h-[720px] w-full max-w-4xl flex-col rounded-xl border border-[#28354D] bg-[#111622] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1C2436] px-6 py-4 bg-[#07090F]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-[#F59E0B]/30 bg-[#182030] text-[#F59E0B]">
              <FileCode size={18} weight="duotone" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#F8FAFC]">
                Export Target Dialect DDL
              </h3>
              <p className="text-[11px] text-[#94A3B8] font-mono">
                Synthesized live from schema topology AST (v{schema.version}).
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded p-1.5 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Format Selector Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#1C2436] bg-[#07090F] px-6 py-2.5">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <button
              onClick={() => setFormat("postgresql")}
              className={`rounded px-3 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
                format === "postgresql"
                  ? "bg-[#F59E0B] text-[#0B0E14] font-bold"
                  : "bg-[#182030] text-[#94A3B8] hover:text-[#F8FAFC]"
              }`}
            >
              PostgreSQL (.sql)
            </button>
            <button
              onClick={() => setFormat("drizzle")}
              className={`rounded px-3 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
                format === "drizzle"
                  ? "bg-[#F59E0B] text-[#0B0E14] font-bold"
                  : "bg-[#182030] text-[#94A3B8] hover:text-[#F8FAFC]"
              }`}
            >
              Drizzle ORM (.ts)
            </button>
            <button
              onClick={() => setFormat("prisma")}
              className={`rounded px-3 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
                format === "prisma"
                  ? "bg-[#F59E0B] text-[#0B0E14] font-bold"
                  : "bg-[#182030] text-[#94A3B8] hover:text-[#F8FAFC]"
              }`}
            >
              Prisma (.prisma)
            </button>
            <button
              onClick={() => setFormat("mysql")}
              className={`rounded px-3 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
                format === "mysql"
                  ? "bg-[#F59E0B] text-[#0B0E14] font-bold"
                  : "bg-[#182030] text-[#94A3B8] hover:text-[#F8FAFC]"
              }`}
            >
              MySQL (.sql)
            </button>
            <button
              onClick={() => setFormat("sqlite")}
              className={`rounded px-3 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
                format === "sqlite"
                  ? "bg-[#F59E0B] text-[#0B0E14] font-bold"
                  : "bg-[#182030] text-[#94A3B8] hover:text-[#F8FAFC]"
              }`}
            >
              SQLite (.sql)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="btn-secondary text-xs py-1.5 px-3"
            >
              {copied ? <Check size={14} className="text-[#10B981]" /> : <Copy size={14} />}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
            <button
              onClick={handleDownload}
              className="btn-primary text-xs py-1.5 px-3.5"
            >
              <DownloadSimple size={14} weight="bold" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Code Content View */}
        <div className="flex-1 overflow-auto bg-[#0B0E14] p-6 font-mono text-xs leading-relaxed text-[#FCD34D]">
          <pre className="selection:bg-[#F59E0B]/30">
            <code>{codeOutput}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
