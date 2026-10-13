"use client";

import Link from "next/link";
import { Check, Sparkle, ArrowRight } from "@phosphor-icons/react";

export function PricingSection() {
  const plans = [
    {
      name: "Starter",
      badge: "Free forever",
      price: "$0",
      cadence: "no credit card required",
      desc: "Perfect for solo developers and small teams starting their next schema.",
      features: [
        "1 active schema project",
        "Up to 3 live canvas collaborators",
        "10 version history checkpoints",
        "All export formats (Postgres, MySQL, Prisma, Drizzle)",
        "Instant public read-only share links",
        "Client-side edge compilation",
      ],
      ctaText: "Start building free",
      ctaLink: "/app/dashboard",
      isPopular: false,
    },
    {
      name: "Pro Team",
      badge: "✦ Most Popular",
      price: "$19",
      cadence: "per user / month (billed monthly)",
      desc: "Built for scaling engineering organizations shipping continuous database migrations.",
      features: [
        "Unlimited schema projects",
        "Unlimited real-time collaborators",
        "Unlimited version snapshots & audit history",
        "Side-by-side migration diff inspection",
        "TestSprite PR bot automated checks",
        "Role-based permissions & team workspace",
        "Custom domain share portals",
        "Priority 24/7 Slack & Discord support",
      ],
      ctaText: "Start 14-day Pro trial",
      ctaLink: "/app/dashboard",
      isPopular: true,
    },
  ];

  return (
    <section id="pricing" className="border-t border-[#1A2133] bg-[#07090E] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#60A5FA]">
            Pricing Plans
          </p>
          <h2 className="font-display mt-2 text-balance text-3xl font-bold tracking-tight text-[#F0F4FF] sm:text-4xl md:text-5xl">
            Start free. Scale with your team.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#7A90B0]">
            Transparent pricing with zero lock-in. You keep your schemas and exported code forever.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-8 lg:grid-cols-2">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col justify-between rounded-2xl border p-8 transition-all ${
                p.isPopular
                  ? "border-[#2563EB] bg-[#0D1117] shadow-[0_0_40px_rgba(37,99,235,0.2)]"
                  : "border-[#1A2133] bg-[#0D1117]/60"
              }`}
            >
              {p.isPopular && (
                <div className="absolute -top-3 right-8 rounded-full border border-[#2563EB] bg-[#2563EB] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold text-[#F0F4FF]">
                    {p.name}
                  </h3>
                  <span className="rounded-full border border-[#1A2133] bg-[#131920] px-2.5 py-0.5 text-xs text-[#7A90B0]">
                    {p.badge}
                  </span>
                </div>

                <p className="mt-2 text-xs text-[#7A90B0]">{p.desc}</p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-extrabold text-[#F0F4FF]">
                    {p.price}
                  </span>
                  <span className="text-xs text-[#7A90B0]">/{p.cadence}</span>
                </div>

                <div className="mt-8 space-y-3 border-t border-[#1A2133] pt-6">
                  {p.features.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3 text-xs text-[#F0F4FF]">
                      <Check size={16} weight="bold" className="shrink-0 text-[#10B981] mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href={p.ctaLink}
                  className={
                    p.isPopular
                      ? "btn-primary w-full justify-center py-3 text-sm"
                      : "btn-secondary w-full justify-center py-3 text-sm"
                  }
                >
                  <span>{p.ctaText}</span>
                  <ArrowRight size={14} weight="bold" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
