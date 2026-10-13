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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-[#CBD5E1] bg-[#FFFFFF] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0F172A] text-[#FFFFFF] shadow-xs">
              <ShareNetwork size={16} weight="bold" />
            </div>
            <h3 className="font-display text-base font-bold text-[#0F172A]">
              Share Schema Canvas
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-[#64748B] hover:text-[#0F172A]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <p className="text-xs text-[#475569] leading-relaxed">
            Generate a secure, read-only link for frontend engineers, tech leads, or external stakeholders.
            Visitors can inspect the canvas topology and export code without logging in.
          </p>

          <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3 space-y-2 text-xs">
            <div className="flex items-center justify-between text-[#0F172A]">
              <span className="flex items-center gap-1.5 font-semibold">
                <ShieldCheck size={15} className="text-[#059669]" />
                Access Permission:
              </span>
              <span className="rounded border border-[#A7F3D0] bg-[#ECFDF5] px-2 py-0.5 text-[10px] font-mono font-bold text-[#059669]">
                Read-Only (Viewer)
              </span>
            </div>
            <p className="text-[11px] text-[#64748B]">
              Edits, table deletions, and column modifications are cryptographically locked.
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#64748B] mb-1.5 font-mono">
              Public Share URL
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="input-well w-full font-mono text-xs text-[#0F172A] bg-[#FFFFFF]"
              />
              <button
                onClick={handleCopy}
                className="btn-primary shrink-0 text-xs py-2 px-3 font-mono"
              >
                {copied ? <Check size={14} className="text-[#059669]" /> : <Copy size={14} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-4 text-xs">
            <a
              href="/share/share_demo_token"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[#2563EB] hover:underline font-mono"
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
