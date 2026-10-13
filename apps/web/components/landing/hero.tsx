"use client";

import Link from "next/link";
import { ArrowRight, Play, Sparkle, Cursor, Database, Key, ShieldCheck, Check } from "@phosphor-icons/react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
      {/* Background Animated SVG ER Diagram (Pure CSS, 8% opacity) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-30 select-none">
        <svg
          className="h-full w-full stroke-[#2563EB]/40 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="hero-dot-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#1A2133" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dot-grid)" />

          {/* Floating mock schema outlines */}
          <g className="animate-pulse" style={{ animationDuration: "8s" }}>
            <rect x="10%" y="15%" width="180" height="120" rx="8" fill="#0D1117" stroke="#1A2133" />
            <path d="M 10% 18% H calc(10% + 180)" stroke="#1A2133" />
            <path d="M calc(10% + 180) 22% C calc(25% + 100) 22%, calc(30% - 100) 35%, 35% 35%" fill="none" stroke="#2563EB" strokeDasharray="4 4" />

            <rect x="35%" y="28%" width="220" height="160" rx="8" fill="#0D1117" stroke="#1A2133" />
            <path d="M 35% 32% H calc(35% + 220)" stroke="#1A2133" />

            <rect x="75%" y="18%" width="190" height="140" rx="8" fill="#0D1117" stroke="#1A2133" />
            <path d="M calc(35% + 220) 34% C calc(55% + 100) 34%, calc(70% - 80) 24%, 75% 24%" fill="none" stroke="#3B82F6" strokeDasharray="4 4" />
          </g>
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Small Caps Pill */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#93C5FD] uppercase">
            <Sparkle size={13} weight="fill" className="text-[#60A5FA]" />
            <span>Collaborative Schema Studio · Season 4 Beta</span>
          </div>

          {/* H1 Display Heading */}
          <h1 className="font-display max-w-4xl text-balance text-4xl font-bold tracking-tight text-[#F0F4FF] sm:text-6xl md:text-7xl lg:leading-[1.05]">
            Design your database schema.{" "}
            <span className="bg-gradient-to-r from-[#93C5FD] via-[#60A5FA] to-[#2563EB] bg-clip-text text-transparent">
              Together.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-2xl text-balance text-base text-[#7A90B0] sm:text-lg md:text-xl">
            FluxDB is the visual studio where engineering teams design, review, and ship database
            schemas in real-time. No more screenshots of DBdiagram in Slack or merge conflicts in migration files.
          </p>

          {/* CTAs */}
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
              <span>Explore Studio Canvas</span>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-[#7A90B0]">
            <div className="flex -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                alt="Avatar"
                className="inline-block h-6 w-6 rounded-full border-2 border-[#07090E] object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                alt="Avatar"
                className="inline-block h-6 w-6 rounded-full border-2 border-[#07090E] object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80"
                alt="Avatar"
                className="inline-block h-6 w-6 rounded-full border-2 border-[#07090E] object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80"
                alt="Avatar"
                className="inline-block h-6 w-6 rounded-full border-2 border-[#07090E] object-cover"
              />
            </div>
            <span className="font-medium text-[#F0F4FF]">Loved by 200+ engineers</span>
            <span>·</span>
            <span className="text-[#F59E0B]">★★★★★</span>
            <span>Zero install · Runs on edge</span>
          </div>

          {/* High-Fidelity Interactive Studio Mockup Preview */}
          <div className="mt-12 w-full max-w-5xl">
            <div className="relative rounded-xl border border-[#253047] bg-[#0D1117] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.8),0_0_0_1px_rgba(37,99,235,0.15)] md:rounded-2xl md:p-3">
              {/* Window Chrome */}
              <div className="flex items-center justify-between border-b border-[#1A2133] pb-3 px-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#EF4444]/80" />
                  <div className="h-3 w-3 rounded-full bg-[#F59E0B]/80" />
                  <div className="h-3 w-3 rounded-full bg-[#10B981]/80" />
                  <span className="ml-3 font-mono text-xs text-[#7A90B0]">
                    fluxdb.studio/storefront-production
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-2 py-0.5 text-[10px] font-medium text-[#10B981]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
                    3 Active
                  </span>
                  <Link
                    href="/app/proj-ecommerce-main"
                    className="rounded bg-[#2563EB] px-2.5 py-1 text-xs font-medium text-white hover:bg-[#1D4ED8]"
                  >
                    Open Studio
                  </Link>
                </div>
              </div>

              {/* Canvas Preview Area */}
              <div className="relative h-[340px] sm:h-[420px] md:h-[480px] w-full overflow-hidden rounded-lg bg-[#050709] p-4 font-mono text-xs select-none">
                {/* Dot background */}
                <div className="absolute inset-0 bg-[radial-gradient(#1A2133_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

                {/* Table 1: users */}
                <div className="absolute left-6 top-8 w-56 rounded-lg border border-[#253047] bg-[#0D1117] shadow-xl">
                  <div className="flex items-center justify-between border-b border-[#1A2133] bg-[#2563EB]/15 px-3 py-2 text-[#93C5FD]">
                    <div className="flex items-center gap-1.5 font-bold">
                      <div className="h-2 w-2 rounded-full bg-[#2563EB]" />
                      <span>users</span>
                    </div>
                    <span className="text-[10px] text-[#7A90B0]">5 cols</span>
                  </div>
                  <div className="divide-y divide-[#1A2133]/60 p-1">
                    <div className="flex items-center justify-between px-2 py-1 text-[#F0F4FF]">
                      <span className="flex items-center gap-1">
                        <Key size={12} className="text-[#F59E0B]" />
                        id
                      </span>
                      <span className="text-[10px] text-[#93C5FD]">uuid</span>
                    </div>
                    <div className="flex items-center justify-between px-2 py-1 text-[#F0F4FF]">
                      <span>email</span>
                      <span className="text-[10px] text-[#7A90B0]">varchar · U</span>
                    </div>
                    <div className="flex items-center justify-between px-2 py-1 text-[#7A90B0]">
                      <span>full_name</span>
                      <span className="text-[10px]">text</span>
                    </div>
                    <div className="flex items-center justify-between px-2 py-1 text-[#7A90B0]">
                      <span>role</span>
                      <span className="text-[10px] text-[#10B981]">enum</span>
                    </div>
                  </div>
                </div>

                {/* Table 2: orders */}
                <div className="absolute left-[290px] top-6 w-60 rounded-lg border-2 border-[#2563EB] bg-[#0D1117] shadow-[0_0_24px_rgba(37,99,235,0.2)]">
                  <div className="flex items-center justify-between border-b border-[#1A2133] bg-[#10B981]/15 px-3 py-2 text-[#10B981]">
                    <div className="flex items-center gap-1.5 font-bold">
                      <div className="h-2 w-2 rounded-full bg-[#10B981]" />
                      <span>orders</span>
                    </div>
                    <span className="rounded bg-[#2563EB]/20 px-1 text-[9px] text-[#93C5FD]">SELECTED</span>
                  </div>
                  <div className="divide-y divide-[#1A2133]/60 p-1">
                    <div className="flex items-center justify-between px-2 py-1 text-[#F0F4FF]">
                      <span className="flex items-center gap-1">
                        <Key size={12} className="text-[#F59E0B]" />
                        id
                      </span>
                      <span className="text-[10px] text-[#93C5FD]">uuid</span>
                    </div>
                    <div className="flex items-center justify-between px-2 py-1 text-[#F0F4FF]">
                      <span className="text-[#60A5FA]">user_id</span>
                      <span className="text-[10px] text-[#60A5FA]">FK → users</span>
                    </div>
                    <div className="flex items-center justify-between px-2 py-1 text-[#7A90B0]">
                      <span>status</span>
                      <span className="text-[10px] text-[#10B981]">enum</span>
                    </div>
                    <div className="flex items-center justify-between px-2 py-1 text-[#7A90B0]">
                      <span>total_amount</span>
                      <span className="text-[10px]">decimal</span>
                    </div>
                  </div>
                </div>

                {/* Table 3: order_items */}
                <div className="hidden md:block absolute left-[580px] top-14 w-60 rounded-lg border border-[#253047] bg-[#0D1117] shadow-xl">
                  <div className="flex items-center justify-between border-b border-[#1A2133] bg-[#F59E0B]/15 px-3 py-2 text-[#F59E0B]">
                    <div className="flex items-center gap-1.5 font-bold">
                      <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                      <span>order_items</span>
                    </div>
                    <span className="text-[10px] text-[#7A90B0]">5 cols</span>
                  </div>
                  <div className="divide-y divide-[#1A2133]/60 p-1">
                    <div className="flex items-center justify-between px-2 py-1 text-[#F0F4FF]">
                      <span className="flex items-center gap-1">
                        <Key size={12} className="text-[#F59E0B]" />
                        id
                      </span>
                      <span className="text-[10px] text-[#93C5FD]">uuid</span>
                    </div>
                    <div className="flex items-center justify-between px-2 py-1 text-[#60A5FA]">
                      <span>order_id</span>
                      <span className="text-[10px]">FK</span>
                    </div>
                    <div className="flex items-center justify-between px-2 py-1 text-[#60A5FA]">
                      <span>product_id</span>
                      <span className="text-[10px]">FK</span>
                    </div>
                    <div className="flex items-center justify-between px-2 py-1 text-[#7A90B0]">
                      <span>quantity</span>
                      <span className="text-[10px]">int</span>
                    </div>
                  </div>
                </div>

                {/* Connection SVG lines */}
                <svg className="pointer-events-none absolute inset-0 h-full w-full stroke-[#3B82F6]">
                  {/* users to orders line */}
                  <path
                    d="M 230 60 C 260 60, 260 80, 290 80"
                    fill="none"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                  {/* orders to order_items line */}
                  <path
                    d="M 530 80 C 555 80, 555 100, 580 100"
                    fill="none"
                    strokeWidth="2"
                  />
                </svg>

                {/* Live Real-time Collaborator Cursor: Sarah Chen */}
                <div
                  className="absolute left-[360px] top-[140px] z-20 flex items-center gap-1 transition-all duration-300"
                  style={{ transform: "translate(0, 0)" }}
                >
                  <Cursor size={18} weight="fill" className="text-[#10B981] drop-shadow-md" />
                  <span className="rounded bg-[#10B981] px-2 py-0.5 text-[10px] font-bold text-black shadow-md">
                    Sarah Chen (Tech Lead)
                  </span>
                </div>

                {/* Live Real-time Collaborator Cursor: Tom Rivera */}
                <div className="hidden sm:flex absolute left-[620px] top-[220px] z-20 items-center gap-1">
                  <Cursor size={18} weight="fill" className="text-[#6366F1] drop-shadow-md" />
                  <span className="rounded bg-[#6366F1] px-2 py-0.5 text-[10px] font-bold text-white shadow-md">
                    Tom Rivera (typing...)
                  </span>
                </div>

                {/* Mini-map Widget bottom-right */}
                <div className="absolute bottom-3 right-3 hidden rounded border border-[#1A2133] bg-[#0D1117]/90 p-2 sm:block">
                  <div className="flex items-center justify-between pb-1 text-[9px] text-[#7A90B0]">
                    <span>Mini-Map</span>
                    <span>100%</span>
                  </div>
                  <div className="h-12 w-20 rounded bg-[#050709] border border-[#1A2133] relative">
                    <div className="absolute left-2 top-2 h-3 w-4 rounded-sm bg-[#2563EB]/40" />
                    <div className="absolute left-7 top-2 h-4 w-4 rounded-sm bg-[#10B981]/50 border border-[#2563EB]" />
                    <div className="absolute left-12 top-3 h-3 w-4 rounded-sm bg-[#F59E0B]/40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
