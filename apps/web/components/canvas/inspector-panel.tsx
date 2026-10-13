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
  "amber",
  "cobalt",
  "emerald",
  "rose",
  "violet",
  "cyan",
  "slate",
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
      <aside className="h-full w-80 shrink-0 border-l border-[#1C2436] bg-[#07090F] p-5 text-xs overflow-y-auto">
        <div className="flex items-center gap-2 border-b border-[#1C2436] pb-3 text-[#94A3B8]">
          <Info size={16} />
          <span className="font-display font-bold uppercase tracking-wider text-[#F8FAFC]">
            Schema Overview
          </span>
        </div>

        <div className="mt-5 space-y-4">
          <div className="rounded border border-[#1C2436] bg-[#111622] p-4 space-y-3 font-mono">
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Version:</span>
              <span className="font-bold text-[#F8FAFC]">v{schema.version}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Total Tables:</span>
              <span className="font-bold text-[#F8FAFC]">{schema.tables.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Total Columns:</span>
              <span className="font-bold text-[#F8FAFC]">{totalColumns}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Relationships:</span>
              <span className="font-bold text-[#F59E0B]">{schema.relations.length}</span>
            </div>
          </div>

          <div className="rounded border border-[#1C2436] bg-[#111622] p-4">
            <h4 className="font-display font-semibold text-xs text-[#F8FAFC]">
              Interactive Canvas Tips
            </h4>
            <ul className="mt-2.5 space-y-2 text-[11px] text-[#94A3B8] leading-relaxed">
              <li>• Click any table node to edit properties and manage columns.</li>
              <li>• Drag between table handles (dots) to create foreign key relations.</li>
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
    <aside className="h-full w-80 shrink-0 border-l border-[#1C2436] bg-[#07090F] p-5 text-xs overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1C2436] pb-3">
        <span className="font-display font-bold uppercase tracking-wider text-[#FBBF24]">
          {selectedColumn ? "Column Inspector" : "Table Inspector"}
        </span>
        <button
          onClick={() => selectObject(null)}
          className="rounded p-1 text-[#94A3B8] hover:text-[#F8FAFC]"
          title="Deselect"
        >
          <X size={14} />
        </button>
      </div>

      <div className="mt-4 space-y-5">
        {/* Table Name */}
        <div>
          <label className="block text-[11px] font-semibold text-[#94A3B8] mb-1">
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
          <label className="block text-[11px] font-semibold text-[#94A3B8] mb-1.5">
            Header Accent Color
          </label>
          <div className="flex items-center gap-2">
            {tableColors.map((c) => (
              <button
                key={c}
                onClick={() => updateTableColor(selectedTable.id, c)}
                className={`h-5 w-5 rounded-full border transition-all cursor-pointer ${
                  selectedTable.color === c
                    ? "border-white scale-110 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
                style={{
                  backgroundColor:
                    c === "amber" ? "#F59E0B" :
                    c === "cobalt" ? "#38BDF8" :
                    c === "emerald" ? "#10B981" :
                    c === "rose" ? "#EF4444" :
                    c === "violet" ? "#A855F7" :
                    c === "cyan" ? "#06B6D4" : "#64748B",
                }}
                title={c}
              />
            ))}
          </div>
        </div>

        {/* Columns Editor Section */}
        <div className="border-t border-[#1C2436] pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-[#F8FAFC]">
              Columns ({selectedTable.columns.length})
            </span>
            <button
              onClick={() => addColumn(selectedTable.id, { name: "new_field", type: "text" })}
              className="flex items-center gap-1 rounded bg-[#F59E0B]/20 px-2 py-0.5 text-[10px] font-semibold text-[#FBBF24] hover:bg-[#F59E0B] hover:text-[#0B0E14] transition-colors"
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
                  className={`rounded border p-2.5 transition-colors cursor-pointer ${
                    isColSelected
                      ? "border-[#F59E0B] bg-[#182030]"
                      : "border-[#1C2436] bg-[#111622] hover:border-[#28354D]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={col.name}
                      onChange={(e) => updateColumn(selectedTable.id, col.id, { name: e.target.value })}
                      className="bg-transparent font-mono text-xs font-semibold text-[#F8FAFC] focus:outline-none w-32"
                    />

                    <select
                      value={col.type}
                      onChange={(e) => updateColumn(selectedTable.id, col.id, { type: e.target.value as ColumnType })}
                      className="rounded bg-[#07090F] px-1.5 py-0.5 text-[10px] font-mono text-[#FBBF24] border border-[#1C2436] focus:outline-none"
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
                      className="text-[#64748B] hover:text-[#EF4444] p-1"
                      title="Delete column"
                    >
                      <Trash size={12} />
                    </button>
                  </div>

                  {/* Constraint toggles */}
                  <div className="mt-2 flex items-center gap-1.5 border-t border-[#1C2436]/60 pt-1.5 text-[10px] font-mono">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleConstraint("PRIMARY_KEY");
                      }}
                      className={`rounded px-1.5 py-0.5 transition-colors ${
                        isPk ? "bg-[#F59E0B] text-[#0B0E14] font-bold" : "bg-[#07090F] text-[#94A3B8]"
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
                        isNotNull ? "bg-[#38BDF8] text-[#0B0E14] font-bold" : "bg-[#07090F] text-[#94A3B8]"
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
                        isUnique ? "bg-[#10B981] text-[#0B0E14] font-bold" : "bg-[#07090F] text-[#94A3B8]"
                      }`}
                    >
                      UQ
                    </button>

                    <input
                      type="text"
                      placeholder="default..."
                      value={col.defaultValue || ""}
                      onChange={(e) => updateColumn(selectedTable.id, col.id, { defaultValue: e.target.value })}
                      className="ml-auto w-20 bg-transparent text-[10px] text-[#94A3B8] border-b border-[#1C2436] focus:outline-none"
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
