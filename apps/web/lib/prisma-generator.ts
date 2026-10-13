import type { FluxSchema, Table, Column, ColumnType } from "@fluxdb/schema-types";

function mapPrismaType(type: ColumnType): string {
  switch (type) {
    case "uuid": return "String";
    case "serial":
    case "integer":
    case "smallint": return "Int";
    case "bigserial":
    case "bigint": return "BigInt";
    case "decimal":
    case "float": return "Float";
    case "boolean": return "Boolean";
    case "timestamp":
    case "timestamptz":
    case "date":
    case "time": return "DateTime";
    case "json":
    case "jsonb": return "Json";
    case "text":
    case "varchar":
    case "char":
    case "enum": return "String";
  }
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function generatePrismaSchema(schema: FluxSchema): string {
  const lines: string[] = [
    `// FluxDB Generated Prisma Schema`,
    `// Generated on: ${new Date().toISOString()}`,
    `// Version: ${schema.version}`,
    "",
    `datasource db {`,
    `  provider = "postgresql"`,
    `  url      = env("DATABASE_URL")`,
    `}`,
    "",
    `generator client {`,
    `  provider = "prisma-client-js"`,
    `}`,
    "",
  ];

  for (const table of schema.tables) {
    const modelName = capitalize(table.name);
    lines.push(`model ${modelName} {`);

    for (const col of table.columns) {
      const isPk = col.constraints.includes("PRIMARY_KEY");
      const isUnique = col.constraints.includes("UNIQUE") && !isPk;
      const isNullable = !col.constraints.includes("NOT_NULL") && !isPk;

      let typeStr = mapPrismaType(col.type);
      if (isNullable) {
        typeStr += "?";
      }

      const attributes: string[] = [];
      if (isPk) {
        if (col.type === "uuid") {
          attributes.push("@id @default(uuid())");
        } else if (col.type === "serial" || col.type === "bigserial") {
          attributes.push("@id @default(autoincrement())");
        } else {
          attributes.push("@id");
        }
      }

      if (isUnique) {
        attributes.push("@unique");
      }

      if (col.defaultValue && !isPk) {
        if (col.defaultValue.toLowerCase() === "now()" || col.defaultValue.toLowerCase() === "current_timestamp") {
          attributes.push("@default(now())");
        } else {
          attributes.push(`@default(${col.defaultValue})`);
        }
      }

      const attrStr = attributes.length > 0 ? " " + attributes.join(" ") : "";
      lines.push(`  ${col.name.padEnd(16)} ${typeStr.padEnd(10)}${attrStr}`);
    }

    // Model Relations
    const incomingRelations = schema.relations.filter((r) => r.toTableId === table.id);
    const outgoingRelations = schema.relations.filter((r) => r.fromTableId === table.id);

    for (const outRel of outgoingRelations) {
      const toTable = schema.tables.find((t) => t.id === outRel.toTableId);
      const fromCol = table.columns.find((c) => c.id === outRel.fromColumnId);
      const toCol = toTable?.columns.find((c) => c.id === outRel.toColumnId);

      if (toTable && fromCol && toCol) {
        const targetModel = capitalize(toTable.name);
        const relFieldName = toTable.name.toLowerCase();
        lines.push(`  ${relFieldName.padEnd(16)} ${targetModel.padEnd(10)} @relation(fields: [${fromCol.name}], references: [${toCol.name}])`);
      }
    }

    for (const inRel of incomingRelations) {
      const fromTable = schema.tables.find((t) => t.id === inRel.fromTableId);
      if (fromTable) {
        const sourceModel = capitalize(fromTable.name);
        const relFieldName = fromTable.name.toLowerCase() + "s";
        lines.push(`  ${relFieldName.padEnd(16)} ${sourceModel}[]`);
      }
    }

    lines.push(`  @@map("${table.name}")`);
    lines.push(`}`);
    lines.push("");
  }

  return lines.join("\n");
}
