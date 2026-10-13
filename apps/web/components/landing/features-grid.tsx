"use client";

import { Users, ClockCounterClockwise, GitDiff, ShareNetwork, Export, Key } from "@phosphor-icons/react";

export function FeaturesGrid() {
  const features = [
    {
      icon: Users,
      title: "Live Multiplayer Presence",
      description: "See who is on the canvas, which tables they have selected, and their cursor movements in sub-10ms latency.",
      badge: "Real-time",
    },
    {
      icon: ClockCounterClockwise,
      title: "Immutable Version Snapshots",
      description: "Every checkpoint is recorded with an author and timestamp. Revert to any prior schema with zero guesswork.",
      badge: "Audit Ready",
    },
    {
      icon: GitDiff,
      title: "Visual Schema Diff Engine",
      description: "Side-by-side comparison of structural changes, column additions, dropped tables, and modified constraint keys.",
      badge: "Zero Loss",
    },
    {
      icon: ShareNetwork,
      title: "Instant Public Share Links",
      description: "Send a read-only canvas link to frontend engineers, PMs, or investors without requiring them to create an account.",
      badge: "Zero Friction",
    },
    {
      icon: Export,
      title: "Multi-Engine Code Generation",
      description: "One click exports clean PostgreSQL, MySQL, SQLite DDL scripts, alongside complete Prisma and Drizzle models.",
      badge: "Full Stack",
    },
    {
      icon: Key,
      title: "Granular Team Permissions",
      description: "Role-based controls for Admin, Editor, and Viewer modes to prevent accidental schema changes in production.",
      badge: "Enterprise",
    },
  ];

  return (
    <section className="border-t border-[#1A2133] bg-[#07090E] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#60A5FA]">
            Built for High-Velocity Teams
          </p>
          <h2 className="font-display mt-2 text-balance text-3xl font-bold tracking-tight text-[#F0F4FF] sm:text-4xl md:text-5xl">
            Engineered with extreme precision
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#7A90B0]">
            Every interaction is calibrated for high density, instantaneous feedback, and zero cognitive load.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="group relative rounded-xl border border-[#1A2133] bg-[#0D1117] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#253047] hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#1A2133] bg-[#131920] text-[#60A5FA] transition-colors group-hover:border-[#2563EB]/40 group-hover:bg-[#2563EB]/10">
                  <f.icon size={20} weight="duotone" />
                </div>
                <span className="rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 px-2 py-0.5 text-[10px] font-semibold text-[#93C5FD]">
                  {f.badge}
                </span>
              </div>

              <h3 className="font-display mt-5 text-base font-bold text-[#F0F4FF]">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#7A90B0]">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
