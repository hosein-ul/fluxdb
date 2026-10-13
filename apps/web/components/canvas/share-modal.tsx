"use client";

import { useState, useEffect } from "react";
import { X, Copy, Check, ShareNetwork, Eye, ShieldCheck } from "@phosphor-icons/react";
import { useSchemaStore } from "@/lib/store";

export function ShareModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { project, schema } = useSchemaStore();
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      setShareUrl(`${origin}/share/tok-public-access-preview`);
    }
  }, []);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-[#253047] bg-[#0D1117] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#1A2133] pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2563EB]/20 text-[#60A5FA]">
              <ShareNetwork size={16} weight="bold" />
            </div>
            <h3 className="font-display text-base font-bold text-[#F0F4FF]">
              Share Schema Canvas
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[#7A90B0] hover:text-[#F0F4FF]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <p className="text-xs text-[#7A90B0] leading-relaxed">
            Generate a secure, read-only link for frontend engineers, tech leads, or external stakeholders.
            Visitors can inspect the canvas and export schemas without logging in.
          </p>

          <div className="rounded-lg border border-[#1A2133] bg-[#07090E] p-3 space-y-2 text-xs">
            <div className="flex items-center justify-between text-[#F0F4FF]">
              <span className="flex items-center gap-1.5 font-semibold">
                <ShieldCheck size={14} className="text-[#10B981]" />
                Access Permission:
              </span>
              <span className="rounded bg-[#10B981]/15 px-2 py-0.5 text-[10px] font-mono text-[#10B981]">
                Read-Only (Viewer)
              </span>
            </div>
            <p className="text-[11px] text-[#4A5F7A]">
              Edits, table deletions, and column modifications are locked.
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#7A90B0] mb-1.5">
              Public Share URL
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="input-well w-full font-mono text-xs text-[#93C5FD]"
              />
              <button
                onClick={handleCopy}
                className="btn-primary shrink-0 text-xs py-2 px-3"
              >
                {copied ? <Check size={14} className="text-white" /> : <Copy size={14} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#1A2133] pt-4 text-xs">
            <a
              href="/share/tok-public-access-preview"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[#60A5FA] hover:underline"
            >
              <Eye size={14} />
              <span>Preview Read-Only Page ↗</span>
            </a>
            <button
              onClick={onClose}
              className="btn-secondary text-xs py-1.5 px-3"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
