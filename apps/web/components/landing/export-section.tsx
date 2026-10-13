"use client";

import { useState } from "react";
import { Copy, Check, Terminal, FileCode } from "@phosphor-icons/react";

export function ExportSection() {
  const [activeFormat, setActiveFormat] = useState<"postgres" | "prisma" | "drizzle" | "mysql">("postgres");
  const [copied, setCopied] = useState(false);

  const snippets = {
    postgres: `-- FluxDB Generated PostgreSQL Schema
CREATE TABLE "users" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" VARCHAR(255) NOT NULL UNIQUE,
  "role" VARCHAR(64) NOT NULL DEFAULT 'customer',
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "orders" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL,
  "status" VARCHAR(64) NOT NULL DEFAULT 'pending',
  "total_amount" DECIMAL(12, 2) NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE "orders"
  ADD CONSTRAINT "fk_orders_user_id"
  FOREIGN KEY ("user_id") REFERENCES "users" ("id")
  ON DELETE CASCADE ON UPDATE CASCADE;`,

    prisma: `// FluxDB Generated Prisma Schema
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  role      String   @default("customer")
  createdAt DateTime @default(now())
  orders    Order[]

  @@map("users")
}

model Order {
  id          String   @id @default(uuid())
  userId      String   @map("user_id")
  user        User     @relation(fields: [userId], references: [id])
  status      String   @default("pending")
  totalAmount Float    @map("total_amount")
  createdAt   DateTime @default(now())

  @@map("orders")
}`,

    drizzle: `// FluxDB Generated Drizzle ORM Models
import { pgTable, uuid, varchar, decimal, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: varchar("role", { length: 64 }).notNull().default("customer"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  status: varchar("status", { length: 64 }).notNull().default("pending"),
  totalAmount: decimal("total_amount", { precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const ordersRelations = relations(orders, ({ one }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
}));`,

    mysql: `-- FluxDB Generated MySQL Schema
CREATE TABLE \`users\` (
  \`id\` VARCHAR(36) PRIMARY KEY,
  \`email\` VARCHAR(255) NOT NULL UNIQUE,
  \`role\` VARCHAR(64) NOT NULL DEFAULT 'customer',
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE \`orders\` (
  \`id\` VARCHAR(36) PRIMARY KEY,
  \`user_id\` VARCHAR(36) NOT NULL,
  \`status\` VARCHAR(64) NOT NULL DEFAULT 'pending',
  \`total_amount\` DECIMAL(12, 2) NOT NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE \`orders\`
  ADD CONSTRAINT \`fk_orders_user_id\`
  FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`)
  ON DELETE CASCADE ON UPDATE CASCADE;`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeFormat]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ecosystems = [
    { name: "PostgreSQL", category: "Relational DB" },
    { name: "Prisma", category: "TypeScript ORM" },
    { name: "Drizzle ORM", category: "Edge-Ready ORM" },
    { name: "MySQL", category: "Relational DB" },
    { name: "SQLite", category: "Embedded DB" },
    { name: "TypeORM", category: "TypeScript ORM" },
    { name: "Supabase", category: "Backend Platform" },
    { name: "PlanetScale", category: "Serverless MySQL" },
  ];

  return (
    <section id="integrations" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#60A5FA]">
            Works with your stack
          </p>
          <h2 className="font-display mt-2 text-balance text-3xl font-bold tracking-tight text-[#F0F4FF] sm:text-4xl md:text-5xl">
            Your schema. Your format. One click.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#7A90B0]">
            Export production-ready, type-safe definitions into any modern ORM or database format.
          </p>
        </div>

        {/* Tabbed Code Window */}
        <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-[#253047] bg-[#0D1117] shadow-2xl overflow-hidden">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-[#1A2133] bg-[#0A0C12] px-4 py-2.5">
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              <button
                onClick={() => setActiveFormat("postgres")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
                  activeFormat === "postgres"
                    ? "bg-[#1A2133] text-[#F0F4FF] border border-[#253047]"
                    : "text-[#7A90B0] hover:text-[#F0F4FF]"
                }`}
              >
                <span>schema.sql</span>
                <span className="rounded bg-[#2563EB]/20 px-1 text-[9px] text-[#93C5FD]">PostgreSQL</span>
              </button>
              <button
                onClick={() => setActiveFormat("prisma")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
                  activeFormat === "prisma"
                    ? "bg-[#1A2133] text-[#F0F4FF] border border-[#253047]"
                    : "text-[#7A90B0] hover:text-[#F0F4FF]"
                }`}
              >
                <span>schema.prisma</span>
                <span className="rounded bg-[#10B981]/20 px-1 text-[9px] text-[#10B981]">Prisma</span>
              </button>
              <button
                onClick={() => setActiveFormat("drizzle")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
                  activeFormat === "drizzle"
                    ? "bg-[#1A2133] text-[#F0F4FF] border border-[#253047]"
                    : "text-[#7A90B0] hover:text-[#F0F4FF]"
                }`}
              >
                <span>schema.ts</span>
                <span className="rounded bg-[#F59E0B]/20 px-1 text-[9px] text-[#F59E0B]">Drizzle</span>
              </button>
              <button
                onClick={() => setActiveFormat("mysql")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
                  activeFormat === "mysql"
                    ? "bg-[#1A2133] text-[#F0F4FF] border border-[#253047]"
                    : "text-[#7A90B0] hover:text-[#F0F4FF]"
                }`}
              >
                <span>mysql.sql</span>
                <span className="rounded bg-[#6366F1]/20 px-1 text-[9px] text-[#93C5FD]">MySQL</span>
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-md border border-[#253047] bg-[#131920] px-3 py-1 text-xs font-medium text-[#F0F4FF] transition-all hover:bg-[#1A2133] cursor-pointer"
            >
              {copied ? <Check size={14} className="text-[#10B981]" /> : <Copy size={14} />}
              <span>{copied ? "Copied to clipboard!" : "Copy Code"}</span>
            </button>
          </div>

          {/* Code Viewer Body */}
          <div className="overflow-x-auto bg-[#07090E] p-6 font-mono text-xs leading-relaxed text-[#93C5FD]">
            <pre className="selection:bg-[#2563EB]/40">
              <code>{snippets[activeFormat]}</code>
            </pre>
          </div>
        </div>

        {/* Ecosystem Badges */}
        <div className="mt-14 border-t border-[#1A2133] pt-10">
          <p className="text-center font-mono text-xs uppercase tracking-wider text-[#4A5F7A]">
            Verified compatibility across enterprise environments
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {ecosystems.map((eco, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 rounded-lg border border-[#1A2133] bg-[#0D1117] px-4 py-2 text-xs font-medium text-[#F0F4FF] transition-colors hover:border-[#253047]"
              >
                <FileCode size={16} weight="duotone" className="text-[#60A5FA]" />
                <span className="font-semibold">{eco.name}</span>
                <span className="text-[10px] text-[#7A90B0]">({eco.category})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
