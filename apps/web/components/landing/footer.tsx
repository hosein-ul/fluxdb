"use client";

import Link from "next/link";
import { Database, GithubLogo, XLogo, DiscordLogo } from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="border-t border-[#1A2133] bg-[#07090E] pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-5">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#2563EB]/40 bg-[#0D1117] text-[#60A5FA]">
                <Database size={16} weight="duotone" />
              </div>
              <span className="font-display text-base font-bold text-[#F0F4FF]">
                Flux<span className="text-[#60A5FA]">DB</span>
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-[#7A90B0]">
              The real-time collaborative database studio for high-velocity engineering teams. Design visually,
              review like pull requests, and deploy migrations without collisions.
            </p>
            <div className="mt-6 flex items-center gap-3 text-[#7A90B0]">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg p-2 transition-colors hover:bg-[#131920] hover:text-[#F0F4FF]"
                aria-label="GitHub"
              >
                <GithubLogo size={18} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg p-2 transition-colors hover:bg-[#131920] hover:text-[#F0F4FF]"
                aria-label="X / Twitter"
              >
                <XLogo size={18} />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg p-2 transition-colors hover:bg-[#131920] hover:text-[#F0F4FF]"
                aria-label="Discord"
              >
                <DiscordLogo size={18} />
              </a>
            </div>
          </div>

          {/* Product Col */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F0F4FF]">
              Product
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-[#7A90B0]">
              <li>
                <Link href="#features" className="hover:text-[#F0F4FF]">
                  Canvas Studio
                </Link>
              </li>
              <li>
                <Link href="#workflow" className="hover:text-[#F0F4FF]">
                  Migration Diff Engine
                </Link>
              </li>
              <li>
                <Link href="#integrations" className="hover:text-[#F0F4FF]">
                  ORM Code Export
                </Link>
              </li>
              <li>
                <Link href="/app/dashboard" className="hover:text-[#F0F4FF]">
                  Multiplayer Presence
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Col */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F0F4FF]">
              Resources
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-[#7A90B0]">
              <li>
                <Link href="#features" className="hover:text-[#F0F4FF]">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#integrations" className="hover:text-[#F0F4FF]">
                  Schema Templates
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-[#F0F4FF]">
                  CLI Tools
                </Link>
              </li>
              <li>
                <span className="inline-flex items-center gap-1.5 text-[#10B981]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                  Systems Operational
                </span>
              </li>
            </ul>
          </div>

          {/* Hackathon & Legal Col */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F0F4FF]">
              Hackathon
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-[#7A90B0]">
              <li>
                <a
                  href="https://www.testsprite.com/hackathon-s4"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#F0F4FF]"
                >
                  TestSprite Season 4
                </a>
              </li>
              <li>
                <Link href="/app/proj-ecommerce-main" className="hover:text-[#F0F4FF]">
                  Automated PR Testing
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#F0F4FF]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#F0F4FF]">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#1A2133] pt-8 text-xs text-[#4A5F7A] sm:flex-row">
          <p>© {new Date().getFullYear()} FluxDB Studio. All rights reserved.</p>
          <p className="font-mono text-[11px]">
            Engineered with Next.js 15 · Edge Ready · TestSprite Verified
          </p>
        </div>
      </div>
    </footer>
  );
}
