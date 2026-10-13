"use client";

import { Quotes } from "@phosphor-icons/react";

export function Testimonials() {
  const quotes = [
    {
      text: "We used to fight over migration collisions in Git PRs every sprint. FluxDB eliminated that friction entirely — our schema discussions happen live on canvas now.",
      author: "Sarah K.",
      role: "Lead Engineer @ Acme Payments",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    },
    {
      text: "Finally, a schema design studio that doesn't force me to open Notion to write paragraphs explaining an ER diagram. The automated SQL diff generator is pure magic.",
      author: "David M.",
      role: "Head of Infrastructure @ ScaleCloud",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    },
    {
      text: "The integration with our PR pipeline via TestSprite caught a broken foreign key constraint before staging deployment. That single catch paid for our team license 10x over.",
      author: "Elena Rostova",
      role: "CTO @ Synthetix Data",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="border-t border-[#1A2133] bg-[#0D1117] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#60A5FA]">
            Voices from the Field
          </p>
          <h2 className="font-display mt-2 text-balance text-3xl font-bold tracking-tight text-[#F0F4FF] sm:text-4xl md:text-5xl">
            Trusted by engineers who ship without fear
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {quotes.map((q, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-xl border border-[#1A2133] bg-[#07090E] p-6"
            >
              <div>
                <Quotes size={24} weight="fill" className="text-[#2563EB]/40 mb-3" />
                <p className="text-sm leading-relaxed text-[#F0F4FF] italic">
                  &ldquo;{q.text}&rdquo;
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-[#1A2133] pt-4">
                <img
                  src={q.avatar}
                  alt={q.author}
                  className="h-9 w-9 rounded-full border border-[#253047] object-cover"
                />
                <div>
                  <h4 className="font-display text-xs font-bold text-[#F0F4FF]">
                    {q.author}
                  </h4>
                  <p className="text-[11px] text-[#7A90B0]">{q.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
