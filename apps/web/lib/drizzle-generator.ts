import type { FluxSchema, Table, Column, ColumnType } from "@fluxdb/schema-types";

function mapDrizzleType(col: Column): string {
  const name = `"${col.name}"`;
  let base: string;

  switch (col.type) {
    case "uuid":
      base = `uuid(${name})`;
      break;
    case "serial":
      base = `serial(${name})`;
      break;
    case "bigserial":
    case "bigint":
      base = `bigint(${name}, { mode: "number" })`;
      break;
    case "integer":
    case "smallint":
      base = `integer(${name})`;
      break;
    case "decimal":
      base = `decimal(${name}, { precision: 12, scale: 2 })`;
      break;
    case "float":
      base = `real(${name})`;
      break;
    case "boolean":
      base = `boolean(${name})`;
      break;
    case "timestamp":
    case "timestamptz":
      base = `timestamp(${name}, { withTimezone: true })`;
      break;
    case "date":
      base = `date(${name})`;
      break;
    case "time":
      base = `time(${name})`;
      break;
    case "json":
    case "jsonb":
      base = `jsonb(${name})`;
      break;
    case "text":
    default:
      base = `text(${name})`;
      break;
  }

  if (col.constraints.includes("PRIMARY_KEY")) {
    base += ".primaryKey()";
    if (col.type === "uuid") {
      base += ".defaultRandom()";
    }
  }

  if (col.constraints.includes("NOT_NULL")) {
    base += ".notNull()";
  }

  if (col.constraints.includes("UNIQUE") && !col.constraints.includes("PRIMARY_KEY")) {
    base += ".unique()";
  }

  if (col.defaultValue && !col.constraints.includes("PRIMARY_KEY")) {
    if (col.defaultValue.toLowerCase() === "now()" || col.defaultValue.toLowerCase() === "current_timestamp") {
      base += ".defaultNow()";
    } else {
      base += `.default(${col.defaultValue})`;
    }
  }

  return base;
}

export function generateDrizzleSchema(schema: FluxSchema): string {
  const lines: string[] = [
    `// FluxDB Generated Drizzle Schema`,
    `// Generated on: ${new Date().toISOString()}`,
    `// Version: ${schema.version}`,
    "",
    `import {`,
    `  pgTable,`,
    `  uuid,`,
    `  text,`,
    `  integer,`,
    `  bigint,`,
    `  real,`,
    `  decimal,`,
    `  boolean,`,
    `  timestamp,`,
    `  date,`,
    `  time,`,
    `  jsonb,`,
    `  serial,`,
    `} from "drizzle-orm/pg-core";`,
    `import { relations } from "drizzle-orm";`,
    "",
  ];

  for (const table of schema.tables) {
    const tableName = table.name;
    lines.push(`export const ${tableName} = pgTable("${tableName}", {`);

    for (const col of table.columns) {
      lines.push(`  ${col.name}: ${mapDrizzleType(col)},`);
    }

    lines.push(`});`);
    lines.push("");
  }

  // Relations definition
  if (schema.relations.length > 0) {
    lines.push(`// Relations`);
    for (const table of schema.tables) {
      const outRels = schema.relations.filter((r) => r.fromTableId === table.id);
      if (outRels.length > 0) {
        lines.push(`export const ${table.name}Relations = relations(${table.name}, ({ one }) => ({`);
        for (const rel of outRels) {
          const toTable = schema.tables.find((t) => t.id === rel.toTableId);
          const fromCol = table.columns.find((c) => c.id === rel.fromColumnId);
          const toCol = toTable?.columns.find((c) => c.id === rel.toColumnId);

          if (toTable && fromCol && toCol) {
            lines.push(`  ${toTable.name}: one(${toTable.name}, {`);
            lines.push(`    fields: [${table.name}.${fromCol.name}],`);
            lines.push(`    references: [${toTable.name}.${toCol.name}],`);
            lines.push(`  }),`);
          }
        }
        lines.push(`}));`);
        lines.push("");
      }
    }
  }

  return lines.join("\n");
}
