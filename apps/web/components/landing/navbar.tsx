"use client";

import Link from "next/link";
import { useState } from "react";
import { List, X, Database, ArrowRight } from "@phosphor-icons/react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1A2133] bg-[#07090E]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-2.5 outline-none">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#2563EB]/40 bg-[#0D1117] text-[#60A5FA] shadow-[0_0_12px_rgba(37,99,235,0.25)] transition-all duration-150 group-hover:border-[#2563EB] group-hover:shadow-[0_0_16px_rgba(37,99,235,0.4)]">
              <Database size={18} weight="duotone" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-[#F0F4FF]">
              Flux<span className="text-[#60A5FA]">DB</span>
            </span>
            <span className="rounded border border-[#2563EB]/30 bg-[#2563EB]/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#93C5FD]">
              Beta
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="#features"
              className="rounded-md px-3 py-1.5 text-sm font-medium text-[#7A90B0] transition-colors hover:bg-[#131920] hover:text-[#F0F4FF]"
            >
              Features
            </Link>
            <Link
              href="#workflow"
              className="rounded-md px-3 py-1.5 text-sm font-medium text-[#7A90B0] transition-colors hover:bg-[#131920] hover:text-[#F0F4FF]"
            >
              Workflow
            </Link>
            <Link
              href="#integrations"
              className="rounded-md px-3 py-1.5 text-sm font-medium text-[#7A90B0] transition-colors hover:bg-[#131920] hover:text-[#F0F4FF]"
            >
              Integrations
            </Link>
            <Link
              href="#pricing"
              className="rounded-md px-3 py-1.5 text-sm font-medium text-[#7A90B0] transition-colors hover:bg-[#131920] hover:text-[#F0F4FF]"
            >
              Pricing
            </Link>
            <Link
              href="/app/dashboard"
              className="rounded-md px-3 py-1.5 text-sm font-medium text-[#7A90B0] transition-colors hover:bg-[#131920] hover:text-[#F0F4FF]"
            >
              Studio
            </Link>
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/app/dashboard"
            className="rounded-lg px-3.5 py-1.5 text-sm font-medium text-[#7A90B0] transition-colors hover:text-[#F0F4FF]"
          >
            Sign in
          </Link>
          <Link
            href="/app/dashboard"
            className="btn-primary"
          >
            <span>Start for free</span>
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#1A2133] text-[#7A90B0] transition-colors hover:text-[#F0F4FF] md:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <List size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-[#1A2133] bg-[#07090E] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            <Link
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-[#7A90B0] hover:bg-[#131920] hover:text-[#F0F4FF]"
            >
              Features
            </Link>
            <Link
              href="#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-[#7A90B0] hover:bg-[#131920] hover:text-[#F0F4FF]"
            >
              Workflow
            </Link>
            <Link
              href="#integrations"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-[#7A90B0] hover:bg-[#131920] hover:text-[#F0F4FF]"
            >
              Integrations
            </Link>
            <Link
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-[#7A90B0] hover:bg-[#131920] hover:text-[#F0F4FF]"
            >
              Pricing
            </Link>
            <div className="mt-3 flex flex-col gap-2 border-t border-[#1A2133] pt-3">
              <Link
                href="/app/dashboard"
                className="btn-secondary w-full justify-center"
              >
                Sign in
              </Link>
              <Link
                href="/app/dashboard"
                className="btn-primary w-full justify-center"
              >
                Start for free
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
