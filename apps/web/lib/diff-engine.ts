import type { FluxSchema, Table, Column } from "@fluxdb/schema-types";
import { mapType } from "./sql-generator";

export interface MigrationDiffResult {
  sql: string;
  addedTables: string[];
  droppedTables: string[];
  addedColumns: { table: string; column: string }[];
  droppedColumns: { table: string; column: string }[];
}

export function generateMigrationDiff(prev: FluxSchema, next: FluxSchema): MigrationDiffResult {
  const lines: string[] = [
    `-- FluxDB Migration Diff: v${prev.version} -> v${next.version}`,
    `-- Generated on: ${new Date().toISOString()}`,
    "",
  ];

  const addedTables: string[] = [];
  const droppedTables: string[] = [];
  const addedColumns: { table: string; column: string }[] = [];
  const droppedColumns: { table: string; column: string }[] = [];

  const prevMap = new Map(prev.tables.map((t) => [t.name, t]));
  const nextMap = new Map(next.tables.map((t) => [t.name, t]));

  // 1. Detect dropped tables
  for (const [prevName] of prevMap) {
    if (!nextMap.has(prevName)) {
      droppedTables.push(prevName);
      lines.push(`-- Drop Table: ${prevName}`);
      lines.push(`DROP TABLE IF EXISTS "${prevName}" CASCADE;`);
      lines.push("");
    }
  }

  // 2. Detect added tables
  for (const [nextName, nextTable] of nextMap) {
    if (!prevMap.has(nextName)) {
      addedTables.push(nextName);
      lines.push(`-- Create New Table: ${nextName}`);
      lines.push(`CREATE TABLE "${nextName}" (`);

      const colDefs = nextTable.columns.map((col, idx) => {
        const isLast = idx === nextTable.columns.length - 1;
        let def = `  "${col.name}" ${mapType(col.type, "postgresql")}`;
        if (col.constraints.includes("NOT_NULL")) def += " NOT NULL";
        if (col.constraints.includes("UNIQUE")) def += " UNIQUE";
        if (col.defaultValue) def += ` DEFAULT ${col.defaultValue}`;
        if (col.constraints.includes("PRIMARY_KEY")) def += " PRIMARY KEY";
        return def + (isLast ? "" : ",");
      });

      lines.push(...colDefs);
      lines.push(`);`);
      lines.push("");
    }
  }

  // 3. Detect column changes in existing tables
  for (const [name, nextTable] of nextMap) {
    const prevTable = prevMap.get(name);
    if (!prevTable) continue;

    const prevCols = new Map(prevTable.columns.map((c) => [c.name, c]));
    const nextCols = new Map(nextTable.columns.map((c) => [c.name, c]));

    // Dropped columns
    for (const [colName] of prevCols) {
      if (!nextCols.has(colName)) {
        droppedColumns.push({ table: name, column: colName });
        lines.push(`ALTER TABLE "${name}" DROP COLUMN "${colName}";`);
      }
    }

    // Added columns
    for (const [colName, col] of nextCols) {
      if (!prevCols.has(colName)) {
        addedColumns.push({ table: name, column: colName });
        let def = `ALTER TABLE "${name}" ADD COLUMN "${colName}" ${mapType(col.type, "postgresql")}`;
        if (col.constraints.includes("NOT_NULL") && col.defaultValue) {
          def += ` NOT NULL DEFAULT ${col.defaultValue}`;
        }
        lines.push(`${def};`);
      }
    }
  }

  if (addedTables.length === 0 && droppedTables.length === 0 && addedColumns.length === 0 && droppedColumns.length === 0) {
    lines.push(`-- No structural schema differences detected between v${prev.version} and v${next.version}.`);
  }

  return {
    sql: lines.join("\n"),
    addedTables,
    droppedTables,
    addedColumns,
    droppedColumns,
  };
}
