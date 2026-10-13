"use client";

import Link from "next/link";
import { ArrowRight, Play, Database } from "@phosphor-icons/react";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-[#1A2133] bg-[#07090E] py-24 md:py-32">
      {/* Radial electric cobalt ambient glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[350px] w-[600px] rounded-full bg-[#2563EB]/15 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[#2563EB]/40 bg-[#0D1117] text-[#60A5FA] shadow-[0_0_24px_rgba(37,99,235,0.3)]">
          <Database size={24} weight="duotone" />
        </div>

        <h2 className="font-display mt-6 text-balance text-3xl font-bold tracking-tight text-[#F0F4FF] sm:text-5xl md:text-6xl">
          Stop designing in isolation.{" "}
          <span className="block text-[#60A5FA]">Your team&apos;s schema deserves better.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-base text-[#7A90B0]">
          Join modern software engineering teams using FluxDB to craft, review, and ship databases with zero friction.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/app/dashboard"
            className="btn-primary text-base px-6 py-3"
          >
            <span>Start for free</span>
            <ArrowRight size={16} weight="bold" />
          </Link>
          <Link
            href="/app/proj-ecommerce-main"
            className="btn-secondary text-base px-6 py-3"
          >
            <Play size={16} weight="duotone" className="text-[#60A5FA]" />
            <span>Open Studio Canvas</span>
          </Link>
        </div>

        <p className="mt-6 font-mono text-xs text-[#4A5F7A]">
          Free forever tier · No credit card required · Instant setup in your browser
        </p>
      </div>
    </section>
  );
}
