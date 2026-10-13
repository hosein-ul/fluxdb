"use client";

import { useSchemaStore } from "@/lib/store";
import { TableColor, ColumnType, ColumnConstraint } from "@fluxdb/schema-types";
import {
  Trash,
  Plus,
  X,
  FileCode,
  Info,
} from "@phosphor-icons/react";

const tableColors: TableColor[] = [
  "slate",
  "cobalt",
  "emerald",
  "amber",
  "rose",
  "violet",
  "cyan",
];

const columnTypes: ColumnType[] = [
  "uuid",
  "varchar",
  "text",
  "integer",
  "bigint",
  "smallint",
  "decimal",
  "float",
  "boolean",
  "timestamp",
  "timestamptz",
  "date",
  "time",
  "json",
  "jsonb",
  "serial",
  "enum",
];

export function InspectorPanel({ onOpenExport }: { onOpenExport: () => void }) {
  const {
    schema,
    selectedTableId,
    selectedColumnId,
    updateTableName,
    updateTableColor,
    updateColumn,
    addColumn,
    deleteColumn,
    selectObject,
  } = useSchemaStore();

  const selectedTable = schema.tables.find((t) => t.id === selectedTableId);
  const selectedColumn = selectedTable?.columns.find((c) => c.id === selectedColumnId);

  // If nothing is selected, render Schema Summary
  if (!selectedTable) {
    const totalColumns = schema.tables.reduce((acc, t) => acc + t.columns.length, 0);

    return (
      <aside className="h-full w-80 shrink-0 border-l border-[#E2E8F0] bg-[#FFFFFF] p-5 text-xs overflow-y-auto">
        <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-3 text-[#475569]">
          <Info size={16} />
          <span className="font-display font-bold uppercase tracking-wider text-[#0F172A]">
            Schema Overview
          </span>
        </div>

        <div className="mt-5 space-y-4">
          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 space-y-3 font-mono">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Version:</span>
              <span className="font-bold text-[#0F172A]">v{schema.version}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Total Tables:</span>
              <span className="font-bold text-[#0F172A]">{schema.tables.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Total Columns:</span>
              <span className="font-bold text-[#0F172A]">{totalColumns}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Relationships:</span>
              <span className="font-bold text-[#0F172A]">{schema.relations.length}</span>
            </div>
          </div>

          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
            <h4 className="font-display font-semibold text-xs text-[#0F172A]">
              Canvas Shortcuts
            </h4>
            <ul className="mt-2.5 space-y-2 text-[11px] text-[#475569] leading-relaxed">
              <li>• Click any table node to inspect properties and columns.</li>
              <li>• Drag between handles to connect foreign keys.</li>
              <li>• Use Ctrl+Z / Ctrl+Y for undo and redo.</li>
            </ul>
          </div>

          <button
            onClick={onOpenExport}
            className="btn-primary w-full justify-center text-xs py-2.5"
          >
            <FileCode size={14} weight="bold" />
            <span>Generate Migration SQL</span>
          </button>
        </div>
      </aside>
    );
  }

  // Table & Column Inspector
  return (
    <aside className="h-full w-80 shrink-0 border-l border-[#E2E8F0] bg-[#FFFFFF] p-5 text-xs overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
        <span className="font-display font-bold uppercase tracking-wider text-[#0F172A]">
          {selectedColumn ? "Column Inspector" : "Table Inspector"}
        </span>
        <button
          onClick={() => selectObject(null)}
          className="rounded p-1 text-[#64748B] hover:text-[#0F172A]"
          title="Deselect"
        >
          <X size={14} />
        </button>
      </div>

      <div className="mt-4 space-y-5">
        {/* Table Name */}
        <div>
          <label className="block text-[11px] font-semibold text-[#475569] mb-1">
            Table Identifier
          </label>
          <input
            type="text"
            value={selectedTable.name}
            onChange={(e) => updateTableName(selectedTable.id, e.target.value.toLowerCase().replace(/\s+/g, "_"))}
            className="input-well w-full text-xs font-mono"
          />
        </div>

        {/* Color Palette */}
        <div>
          <label className="block text-[11px] font-semibold text-[#475569] mb-1.5">
            Color Accent
          </label>
          <div className="flex items-center gap-2">
            {tableColors.map((c) => (
              <button
                key={c}
                onClick={() => updateTableColor(selectedTable.id, c)}
                className={`h-5 w-5 rounded-full border transition-all cursor-pointer ${
                  selectedTable.color === c
                    ? "border-[#0F172A] scale-110 shadow-xs ring-1 ring-[#0F172A]"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
                style={{
                  backgroundColor:
                    c === "slate" ? "#475569" :
                    c === "cobalt" ? "#2563EB" :
                    c === "emerald" ? "#059669" :
                    c === "amber" ? "#D97706" :
                    c === "rose" ? "#DC2626" :
                    c === "violet" ? "#7C3AED" : "#0891B2",
                }}
                title={c}
              />
            ))}
          </div>
        </div>

        {/* Columns Editor Section */}
        <div className="border-t border-[#E2E8F0] pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-[#0F172A]">
              Columns ({selectedTable.columns.length})
            </span>
            <button
              onClick={() => addColumn(selectedTable.id, { name: "new_field", type: "text" })}
              className="flex items-center gap-1 rounded bg-[#F1F5F9] px-2 py-0.5 text-[10px] font-semibold text-[#0F172A] hover:bg-[#E2E8F0] transition-colors"
            >
              <Plus size={10} weight="bold" />
              <span>Add</span>
            </button>
          </div>

          <div className="space-y-2 mt-3">
            {selectedTable.columns.map((col) => {
              const isColSelected = selectedColumnId === col.id;
              const isPk = col.constraints.includes("PRIMARY_KEY");
              const isUnique = col.constraints.includes("UNIQUE");
              const isNotNull = col.constraints.includes("NOT_NULL");

              const toggleConstraint = (constraint: ColumnConstraint) => {
                const updatedConstraints = col.constraints.includes(constraint)
                  ? col.constraints.filter((c) => c !== constraint)
                  : [...col.constraints, constraint];
                updateColumn(selectedTable.id, col.id, { constraints: updatedConstraints });
              };

              return (
                <div
                  key={col.id}
                  onClick={() => selectObject(selectedTable.id, col.id)}
                  className={`rounded-lg border p-2.5 transition-colors cursor-pointer ${
                    isColSelected
                      ? "border-[#0F172A] bg-[#F8FAFC] shadow-xs"
                      : "border-[#E2E8F0] bg-[#FFFFFF] hover:border-[#CBD5E1]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={col.name}
                      onChange={(e) => updateColumn(selectedTable.id, col.id, { name: e.target.value })}
                      className="bg-transparent font-mono text-xs font-semibold text-[#0F172A] focus:outline-none w-32"
                    />

                    <select
                      value={col.type}
                      onChange={(e) => updateColumn(selectedTable.id, col.id, { type: e.target.value as ColumnType })}
                      className="rounded bg-[#F8FAFC] px-1.5 py-0.5 text-[10px] font-mono text-[#0F172A] border border-[#CBD5E1] focus:outline-none"
                    >
                      {columnTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteColumn(selectedTable.id, col.id);
                      }}
                      className="text-[#94A3B8] hover:text-[#DC2626] p-1"
                      title="Delete column"
                    >
                      <Trash size={12} />
                    </button>
                  </div>

                  {/* Constraint toggles */}
                  <div className="mt-2 flex items-center gap-1.5 border-t border-[#F1F5F9] pt-1.5 text-[10px] font-mono">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleConstraint("PRIMARY_KEY");
                      }}
                      className={`rounded px-1.5 py-0.5 transition-colors ${
                        isPk ? "bg-[#FEF3C7] text-[#D97706] font-bold" : "bg-[#F1F5F9] text-[#64748B]"
                      }`}
                    >
                      PK
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleConstraint("NOT_NULL");
                      }}
                      className={`rounded px-1.5 py-0.5 transition-colors ${
                        isNotNull ? "bg-[#EFF6FF] text-[#2563EB] font-bold" : "bg-[#F1F5F9] text-[#64748B]"
                      }`}
                    >
                      NN
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleConstraint("UNIQUE");
                      }}
                      className={`rounded px-1.5 py-0.5 transition-colors ${
                        isUnique ? "bg-[#ECFDF5] text-[#059669] font-bold" : "bg-[#F1F5F9] text-[#64748B]"
                      }`}
                    >
                      UQ
                    </button>

                    <input
                      type="text"
                      placeholder="default..."
                      value={col.defaultValue || ""}
                      onChange={(e) => updateColumn(selectedTable.id, col.id, { defaultValue: e.target.value })}
                      className="ml-auto w-20 bg-transparent text-[10px] text-[#64748B] border-b border-[#E2E8F0] focus:outline-none"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
