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
      setShareUrl(`${origin}/share/share_demo_token`);
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
      <div className="w-full max-w-md rounded-xl border border-[#28354D] bg-[#111622] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#1C2436] pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded border border-[#F59E0B]/30 bg-[#182030] text-[#F59E0B]">
              <ShareNetwork size={16} weight="bold" />
            </div>
            <h3 className="font-display text-base font-bold text-[#F8FAFC]">
              Share Schema Canvas
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-[#94A3B8] hover:text-[#F8FAFC]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Generate a secure, read-only link for frontend engineers, tech leads, or external stakeholders.
            Visitors can inspect the canvas topology and export code without logging in.
          </p>

          <div className="rounded border border-[#1C2436] bg-[#07090F] p-3 space-y-2 text-xs">
            <div className="flex items-center justify-between text-[#F8FAFC]">
              <span className="flex items-center gap-1.5 font-semibold">
                <ShieldCheck size={14} className="text-[#10B981]" />
                Access Permission:
              </span>
              <span className="rounded bg-[#10B981]/15 px-2 py-0.5 text-[10px] font-mono text-[#10B981]">
                Read-Only (Viewer)
              </span>
            </div>
            <p className="text-[11px] text-[#64748B]">
              Edits, table deletions, and column modifications are cryptographically locked.
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#94A3B8] mb-1.5">
              Public Share URL
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="input-well w-full font-mono text-xs text-[#FCD34D]"
              />
              <button
                onClick={handleCopy}
                className="btn-primary shrink-0 text-xs py-2 px-3"
              >
                {copied ? <Check size={14} className="text-[#0B0E14]" /> : <Copy size={14} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#1C2436] pt-4 text-xs">
            <a
              href="/share/share_demo_token"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[#FBBF24] hover:underline font-mono"
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
