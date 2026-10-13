"use client";

import { useState } from "react";
import { UsersThree, GitDiff, ShieldCheck, FileCode, CheckCircle } from "@phosphor-icons/react";

export function ProductShowcase() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: UsersThree,
      tag: "Real-time Collaboration",
      title: "Design schemas in multiplayer",
      description:
        "Invite your backend and frontend engineers onto the same canvas. Watch cursor movements, see live table edits, and discuss schema modifications as they happen.",
      bullets: [
        "Sub-10ms cursor synchronization",
        "Color-coded collaborator badges",
        "Concurrent column and relationship editing",
      ],
    },
    {
      icon: GitDiff,
      tag: "Migration Diff Engine",
      title: "Automated SQL migration diffs",
      description:
        "FluxDB computes exact structural diffs between schema versions, compiling clean ALTER TABLE, ADD COLUMN, and DROP statements without manual coding.",
      bullets: [
        "Dialect-aware SQL output (Postgres, MySQL, SQLite)",
        "Zero syntax errors or typo risks",
        "Automatic foreign key dependency ordering",
      ],
    },
    {
      icon: ShieldCheck,
      tag: "Version History",
      title: "Named snapshots & version control",
      description:
        "Every save creates an immutable version snapshot. Inspect historical diffs, compare changes with teammates, and restore any previous schema in seconds.",
      bullets: [
        "Timestamped team audit trail",
        "One-click rollback capabilities",
        "Side-by-side visual schema comparisons",
      ],
    },
    {
      icon: FileCode,
      tag: "Framework Agnostic",
      title: "Export to your favorite ORM",
      description:
        "Never rewrite schema definitions by hand. FluxDB instantly compiles your visual model into type-safe Prisma schemas, Drizzle tables, or raw SQL migrations.",
      bullets: [
        "Production-grade Prisma 5+ syntax",
        "TypeScript-native Drizzle ORM models",
        "Copy-to-clipboard or instant file download",
      ],
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#60A5FA]">
            The FluxDB Studio
          </p>
          <h2 className="font-display mt-2 text-balance text-3xl font-bold tracking-tight text-[#F0F4FF] sm:text-4xl md:text-5xl">
            One canvas. Your whole team. Always in sync.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#7A90B0]">
            Everything engineering teams need to plan, review, and ship databases without friction.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-12">
          {/* Left Feature Switchers (5 cols) */}
          <div className="space-y-3 lg:col-span-5">
            {features.map((f, idx) => {
              const isActive = activeFeature === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveFeature(idx)}
                  className={`w-full text-left rounded-xl border p-5 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "border-[#2563EB] bg-[#0D1117] shadow-[0_0_20px_rgba(37,99,235,0.15)]"
                      : "border-[#1A2133] bg-[#07090E] hover:border-[#253047] hover:bg-[#0A0C12]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                        isActive
                          ? "border-[#2563EB] bg-[#2563EB]/20 text-[#93C5FD]"
                          : "border-[#1A2133] bg-[#0D1117] text-[#7A90B0]"
                      }`}
                    >
                      <f.icon size={18} weight="duotone" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#60A5FA]">
                        {f.tag}
                      </span>
                      <h3 className="font-display text-base font-bold text-[#F0F4FF]">
                        {f.title}
                      </h3>
                    </div>
                  </div>
                  {isActive && (
                    <p className="mt-3 text-xs leading-relaxed text-[#7A90B0]">
                      {f.description}
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Live Interactive Showcase (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#253047] bg-[#0D1117] p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#1A2133] pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#10B981] animate-ping" />
                  <span className="font-mono text-xs font-semibold text-[#F0F4FF]">
                    {features[activeFeature].title}
                  </span>
                </div>
                <span className="rounded bg-[#2563EB]/10 px-2 py-0.5 font-mono text-[11px] text-[#60A5FA]">
                  Feature 0{activeFeature + 1} // Active
                </span>
              </div>

              <div className="mt-6 rounded-xl border border-[#1A2133] bg-[#07090E] p-6">
                <p className="text-sm leading-relaxed text-[#F0F4FF]">
                  {features[activeFeature].description}
                </p>

                <div className="mt-6 space-y-3">
                  {features[activeFeature].bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2.5 text-xs text-[#7A90B0]">
                      <CheckCircle size={16} weight="fill" className="shrink-0 text-[#10B981]" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                {/* Micro preview snippet */}
                <div className="mt-6 rounded-lg border border-[#1A2133] bg-[#050709] p-3 font-mono text-xs">
                  <div className="text-[10px] text-[#4A5F7A] mb-1">// Real-time preview snippet</div>
                  {activeFeature === 0 && (
                    <div className="text-[#10B981]">
                      ✓ Broadcast: user_sarah updated table &quot;orders&quot; columns (+ discount: decimal)
                    </div>
                  )}
                  {activeFeature === 1 && (
                    <div className="text-[#93C5FD]">
                      ALTER TABLE &quot;orders&quot; ADD COLUMN &quot;discount&quot; DECIMAL(12,2) DEFAULT 0.00;
                    </div>
                  )}
                  {activeFeature === 2 && (
                    <div className="text-[#F59E0B]">
                      Snapshot saved: snap-v4 (author: Sarah Chen, 2 minutes ago)
                    </div>
                  )}
                  {activeFeature === 3 && (
                    <div className="text-[#60A5FA]">
                      export const orders = pgTable(&quot;orders&quot;, &#123; discount: decimal(&quot;discount&quot;) &#125;);
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
