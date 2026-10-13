"use client";

import { WarningOctagon, GitMerge, ArrowsSplit } from "@phosphor-icons/react";

export function ProblemSection() {
  const problems = [
    {
      icon: WarningOctagon,
      title: "Screenshot-driven reviews",
      quote: "“Check this DBdiagram link — does the schema look right?”",
      desc: "Schema feedback is scattered in Slack threads and Notion docs. Zero real-time validation, no diff against existing databases, and zero automated checks.",
      badge: "Broken Workflow",
      badgeColor: "border-[#EF4444]/30 bg-[#EF4444]/10 text-[#EF4444]",
    },
    {
      icon: GitMerge,
      title: "Silent migration collisions",
      quote: "“Who modified orders.sql? My local migration failed again.”",
      desc: "Multiple engineers working on parallel branches create incompatible schema migrations. Collisions are caught late in staging or, worse, in production deployment.",
      badge: "High Risk",
      badgeColor: "border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#F59E0B]",
    },
    {
      icon: ArrowsSplit,
      title: "Scattered 5-tool disconnect",
      quote: "“Design in one, document in another, migrate in a third.”",
      desc: "Teams bounce across Lucidchart, DBdiagram, GitHub PRs, Flyway, and Prisma Studio. Five disjointed tools for what should be a single continuous feedback loop.",
      badge: "Context Loss",
      badgeColor: "border-[#6366F1]/30 bg-[#6366F1]/10 text-[#6366F1]",
    },
  ];

  return (
    <section className="border-y border-[#1A2133] bg-[#0D1117] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#EF4444]">
            The Schema Friction
          </p>
          <h2 className="font-display mt-2 text-balance text-3xl font-bold tracking-tight text-[#F0F4FF] sm:text-4xl md:text-5xl">
            Schema work is scattered. Five tools. Zero collaboration.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#7A90B0]">
            Database design is the foundation of every application, yet it remains one of the most archaic,
            isolated parts of the modern engineering stack.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {problems.map((p, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between rounded-xl border border-[#1A2133] bg-[#07090E] p-6 transition-all duration-200 hover:border-[#253047] hover:bg-[#0A0C12]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#1A2133] bg-[#0D1117] text-[#F0F4FF] transition-colors group-hover:border-[#253047]">
                    <p.icon size={20} weight="duotone" className="text-[#60A5FA]" />
                  </div>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                </div>

                <h3 className="font-display mt-6 text-lg font-bold text-[#F0F4FF]">
                  {p.title}
                </h3>
                <p className="mt-2 font-mono text-xs text-[#93C5FD]/80 italic">
                  {p.quote}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#7A90B0]">
                  {p.desc}
                </p>
              </div>

              <div className="mt-6 border-t border-[#1A2133] pt-4 text-xs font-mono text-[#4A5F7A]">
                Problem Vector 0{idx + 1} // Resolved by FluxDB
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
