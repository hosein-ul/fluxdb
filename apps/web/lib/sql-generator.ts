import type { FluxSchema, Table, Column, ColumnType } from "@fluxdb/schema-types";

export type SQLDialect = "postgresql" | "mysql" | "sqlite";

export function mapType(type: ColumnType, dialect: SQLDialect): string {
  switch (dialect) {
    case "postgresql":
      switch (type) {
        case "uuid": return "UUID";
        case "serial": return "SERIAL";
        case "bigserial": return "BIGSERIAL";
        case "text": return "TEXT";
        case "varchar": return "VARCHAR(255)";
        case "char": return "CHAR(1)";
        case "integer": return "INTEGER";
        case "bigint": return "BIGINT";
        case "smallint": return "SMALLINT";
        case "decimal": return "DECIMAL(12, 2)";
        case "float": return "REAL";
        case "boolean": return "BOOLEAN";
        case "timestamp": return "TIMESTAMP";
        case "timestamptz": return "TIMESTAMPTZ";
        case "date": return "DATE";
        case "time": return "TIME";
        case "json": return "JSON";
        case "jsonb": return "JSONB";
        case "enum": return "VARCHAR(64)";
      }
    case "mysql":
      switch (type) {
        case "uuid": return "VARCHAR(36)";
        case "serial": return "INT AUTO_INCREMENT";
        case "bigserial": return "BIGINT AUTO_INCREMENT";
        case "text": return "TEXT";
        case "varchar": return "VARCHAR(255)";
        case "char": return "CHAR(1)";
        case "integer": return "INT";
        case "bigint": return "BIGINT";
        case "smallint": return "SMALLINT";
        case "decimal": return "DECIMAL(12, 2)";
        case "float": return "FLOAT";
        case "boolean": return "TINYINT(1)";
        case "timestamp": return "DATETIME";
        case "timestamptz": return "DATETIME";
        case "date": return "DATE";
        case "time": return "TIME";
        case "json":
        case "jsonb": return "JSON";
        case "enum": return "VARCHAR(64)";
      }
    case "sqlite":
      switch (type) {
        case "uuid": return "TEXT";
        case "serial":
        case "bigserial": return "INTEGER PRIMARY KEY AUTOINCREMENT";
        case "text":
        case "varchar":
        case "char": return "TEXT";
        case "integer":
        case "bigint":
        case "smallint": return "INTEGER";
        case "decimal":
        case "float": return "REAL";
        case "boolean": return "INTEGER";
        case "timestamp":
        case "timestamptz":
        case "date":
        case "time": return "TEXT";
        case "json":
        case "jsonb": return "TEXT";
        case "enum": return "TEXT";
      }
  }
}

function quoteIdent(name: string, dialect: SQLDialect): string {
  if (dialect === "mysql") return `\`${name}\``;
  return `"${name}"`;
}

export function generateSQL(schema: FluxSchema, dialect: SQLDialect = "postgresql"): string {
  const lines: string[] = [
    `-- FluxDB Schema Export`,
    `-- Generated on: ${new Date().toISOString()}`,
    `-- Dialect: ${dialect.toUpperCase()}`,
    `-- Version: ${schema.version}`,
    "",
  ];

  for (const table of schema.tables) {
    if (table.comment) {
      lines.push(`-- Table: ${table.name} (${table.comment})`);
    }
    lines.push(`CREATE TABLE ${quoteIdent(table.name, dialect)} (`);

    const colDefs = table.columns.map((col, index) => {
      const isLast = index === table.columns.length - 1;
      let def = `  ${quoteIdent(col.name, dialect)} ${mapType(col.type, dialect)}`;

      if (col.constraints.includes("NOT_NULL")) {
        def += " NOT NULL";
      }
      if (col.constraints.includes("UNIQUE")) {
        def += " UNIQUE";
      }
      if (col.defaultValue !== undefined && col.defaultValue !== "") {
        def += ` DEFAULT ${col.defaultValue}`;
      }
      if (col.constraints.includes("PRIMARY_KEY")) {
        if (!(dialect === "sqlite" && (col.type === "serial" || col.type === "bigserial"))) {
          def += " PRIMARY KEY";
        }
      }

      return def + (isLast ? "" : ",");
    });

    lines.push(...colDefs);
    lines.push(`);`);
    lines.push("");
  }

  // Generate Foreign Key Constraints
  if (schema.relations.length > 0) {
    lines.push(`-- Foreign Key Relationships`);
    for (const rel of schema.relations) {
      const fromTable = schema.tables.find((t) => t.id === rel.fromTableId);
      const toTable = schema.tables.find((t) => t.id === rel.toTableId);
      const fromCol = fromTable?.columns.find((c) => c.id === rel.fromColumnId);
      const toCol = toTable?.columns.find((c) => c.id === rel.toColumnId);

      if (fromTable && toTable && fromCol && toCol) {
        if (dialect === "sqlite") {
          lines.push(`-- SQLite enforces FKs during CREATE TABLE definition.`);
        } else {
          const fkName = `fk_${fromTable.name}_${fromCol.name}`;
          lines.push(
            `ALTER TABLE ${quoteIdent(fromTable.name, dialect)}`,
            `  ADD CONSTRAINT ${quoteIdent(fkName, dialect)}`,
            `  FOREIGN KEY (${quoteIdent(fromCol.name, dialect)})`,
            `  REFERENCES ${quoteIdent(toTable.name, dialect)} (${quoteIdent(toCol.name, dialect)})`,
            `  ON DELETE CASCADE ON UPDATE CASCADE;`,
            ""
          );
        }
      }
    }
  }

  return lines.join("\n");
}
