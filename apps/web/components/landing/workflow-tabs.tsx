"use client";

import { useState } from "react";
import { PenNib, Users, RocketLaunch, Check, Copy } from "@phosphor-icons/react";

export function WorkflowTabs() {
  const [activeTab, setActiveTab] = useState<"design" | "collaborate" | "ship">("design");
  const [copied, setCopied] = useState(false);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="workflow" className="border-t border-[#1A2133] bg-[#07090E] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#60A5FA]">
            How It Works
          </p>
          <h2 className="font-display mt-2 text-balance text-3xl font-bold tracking-tight text-[#F0F4FF] sm:text-4xl md:text-5xl">
            From visual canvas to production database in three steps
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#7A90B0]">
            The loop that eliminates migration dread and keeps your team in sync.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex rounded-xl border border-[#1A2133] bg-[#0D1117] p-1.5 shadow-lg">
            <button
              onClick={() => setActiveTab("design")}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === "design"
                  ? "bg-[#2563EB] text-white shadow-md"
                  : "text-[#7A90B0] hover:text-[#F0F4FF]"
              }`}
            >
              <PenNib size={16} weight="duotone" />
              <span>01. Design Visually</span>
            </button>
            <button
              onClick={() => setActiveTab("collaborate")}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === "collaborate"
                  ? "bg-[#2563EB] text-white shadow-md"
                  : "text-[#7A90B0] hover:text-[#F0F4FF]"
              }`}
            >
              <Users size={16} weight="duotone" />
              <span>02. Collaborate Live</span>
            </button>
            <button
              onClick={() => setActiveTab("ship")}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === "ship"
                  ? "bg-[#2563EB] text-white shadow-md"
                  : "text-[#7A90B0] hover:text-[#F0F4FF]"
              }`}
            >
              <RocketLaunch size={16} weight="duotone" />
              <span>03. Ship Migrations</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-[#253047] bg-[#0D1117] p-6 sm:p-10 shadow-2xl">
          {activeTab === "design" && (
            <div className="grid gap-8 items-center md:grid-cols-2">
              <div>
                <span className="rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 px-3 py-1 text-xs font-semibold text-[#93C5FD]">
                  Step 01 · Visual Schema Construction
                </span>
                <h3 className="font-display mt-4 text-2xl font-bold text-[#F0F4FF] sm:text-3xl">
                  Drag. Drop. Connect tables with relationships.
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#7A90B0]">
                  Add tables, define columns, choose primary keys, and establish foreign keys with simple connector lines.
                  FluxDB prevents invalid relationships and enforces database best practices in real time.
                </p>
                <div className="mt-6 space-y-2.5 text-xs text-[#93C5FD]">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
                    <span>20+ data types: UUID, JSONB, Timestamps, Enums, Decimals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
                    <span>Smart constraint toggles: UNIQUE, NOT NULL, AUTO-INCREMENT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
                    <span>1:1, 1:N, and N:M visual cardinalities</span>
                  </div>
                </div>
              </div>

              {/* Visual Demo */}
              <div className="rounded-xl border border-[#1A2133] bg-[#050709] p-5 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[#1A2133] pb-2 text-[#7A90B0]">
                  <span>Visual Canvas Node</span>
                  <span className="text-[#10B981]">Active</span>
                </div>
                <div className="mt-4 rounded-lg border border-[#253047] bg-[#0D1117] p-3">
                  <div className="flex items-center justify-between font-bold text-[#60A5FA]">
                    <span>TABLE: payments</span>
                    <span className="text-[10px] text-[#7A90B0]">color: emerald</span>
                  </div>
                  <div className="mt-2 space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-[#F0F4FF]">
                      <span>+ id: uuid</span>
                      <span className="text-[#F59E0B]">PK</span>
                    </div>
                    <div className="flex justify-between text-[#F0F4FF]">
                      <span>+ order_id: uuid</span>
                      <span className="text-[#60A5FA]">FK → orders</span>
                    </div>
                    <div className="flex justify-between text-[#F0F4FF]">
                      <span>+ amount: decimal(12,2)</span>
                      <span className="text-[#10B981]">NOT NULL</span>
                    </div>
                    <div className="flex justify-between text-[#7A90B0]">
                      <span>+ provider: varchar(32)</span>
                      <span>&apos;stripe&apos;</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "collaborate" && (
            <div className="grid gap-8 items-center md:grid-cols-2">
              <div>
                <span className="rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-3 py-1 text-xs font-semibold text-[#10B981]">
                  Step 02 · Collaborative Schema Review
                </span>
                <h3 className="font-display mt-4 text-2xl font-bold text-[#F0F4FF] sm:text-3xl">
                  Your team. Same canvas. Right now.
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#7A90B0]">
                  Share a workspace with your engineering teammates. See what tables they are editing,
                  review schema additions on the fly, and resolve design bottlenecks in minutes instead of days.
                </p>
                <div className="mt-6 space-y-2.5 text-xs text-[#10B981]">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                    <span>Real-time presence: know who is online and where they are working</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                    <span>Role-based access: Admin, Editor, and Viewer modes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                    <span>Read-only public links for stakeholders without sign-in</span>
                  </div>
                </div>
              </div>

              {/* Visual Demo */}
              <div className="rounded-xl border border-[#1A2133] bg-[#050709] p-5 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[#1A2133] pb-2 text-[#7A90B0]">
                  <span>Live Presence Stream</span>
                  <span className="text-[#10B981]">WebSocket Connected</span>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between rounded border border-[#10B981]/40 bg-[#10B981]/10 p-2 text-[#10B981]">
                    <span>🟢 Sarah Chen (Tech Lead)</span>
                    <span>Editing &quot;orders&quot; schema</span>
                  </div>
                  <div className="flex items-center justify-between rounded border border-[#6366F1]/40 bg-[#6366F1]/10 p-2 text-[#93C5FD]">
                    <span>🔵 Tom Rivera (Backend)</span>
                    <span>Viewing &quot;payments&quot; node</span>
                  </div>
                  <div className="flex items-center justify-between rounded border border-[#2563EB]/40 bg-[#2563EB]/10 p-2 text-[#60A5FA]">
                    <span>👤 You (Lead Engineer)</span>
                    <span>Broadcasting changes</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "ship" && (
            <div className="grid gap-8 items-center md:grid-cols-2">
              <div>
                <span className="rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-3 py-1 text-xs font-semibold text-[#F59E0B]">
                  Step 03 · Safe Production Migrations
                </span>
                <h3 className="font-display mt-4 text-2xl font-bold text-[#F0F4FF] sm:text-3xl">
                  Inspect diffs. Generate SQL. Deploy with confidence.
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#7A90B0]">
                  FluxDB generates accurate, dialect-native SQL migration diffs between your checkpoints.
                  Copy the clean SQL, paste into your deployment pipeline, and merge your pull request safely.
                </p>
                <div className="mt-6 space-y-2.5 text-xs text-[#F59E0B]">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                    <span>Safe ALTER TABLE generation without data loss</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                    <span>Compatible with Flyway, Prisma Migrate, Drizzle Kit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                    <span>Automated test verification on every GitHub PR</span>
                  </div>
                </div>
              </div>

              {/* Visual Demo */}
              <div className="relative rounded-xl border border-[#1A2133] bg-[#050709] p-5 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[#1A2133] pb-2 text-[#7A90B0]">
                  <span>Migration Diff: v2 → v3</span>
                  <button
                    onClick={() =>
                      copyCode(
                        `ALTER TABLE "orders" ADD COLUMN "discount" DECIMAL(12,2) DEFAULT 0.00;\nALTER TABLE "orders" ADD CONSTRAINT fk_orders_user FOREIGN KEY ("user_id") REFERENCES "users"("id");`
                      )
                    }
                    className="flex items-center gap-1 rounded bg-[#131920] px-2 py-1 text-[10px] text-[#F0F4FF] hover:bg-[#1A2133] cursor-pointer"
                  >
                    {copied ? <Check size={12} className="text-[#10B981]" /> : <Copy size={12} />}
                    <span>{copied ? "Copied" : "Copy SQL"}</span>
                  </button>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="rounded bg-[#10B981]/15 p-2 text-[#10B981]">
                    + ALTER TABLE &quot;orders&quot; ADD COLUMN &quot;discount&quot; DECIMAL(12,2) DEFAULT 0.00;
                  </div>
                  <div className="rounded bg-[#10B981]/15 p-2 text-[#10B981]">
                    + CREATE INDEX &quot;idx_orders_status&quot; ON &quot;orders&quot; (&quot;status&quot;);
                  </div>
                  <div className="rounded bg-[#EF4444]/15 p-2 text-[#EF4444]">
                    - ALTER TABLE &quot;orders&quot; DROP COLUMN &quot;legacy_notes&quot;;
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
