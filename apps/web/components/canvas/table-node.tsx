"use client";

import React, { memo } from "react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { Key, Plus, Trash } from "@phosphor-icons/react";
import { useSchemaStore } from "@/lib/store";
import type { Table, TableColor } from "@fluxdb/schema-types";

const colorStyles: Record<TableColor, { border: string; headerBg: string; text: string; dot: string }> = {
  amber: {
    border: "border-[#CBD5E1] hover:border-[#94A3B8]",
    headerBg: "bg-[#FFFBEB]",
    text: "text-[#B45309]",
    dot: "bg-[#D97706]",
  },
  cobalt: {
    border: "border-[#CBD5E1] hover:border-[#94A3B8]",
    headerBg: "bg-[#EFF6FF]",
    text: "text-[#1D4ED8]",
    dot: "bg-[#2563EB]",
  },
  emerald: {
    border: "border-[#CBD5E1] hover:border-[#94A3B8]",
    headerBg: "bg-[#ECFDF5]",
    text: "text-[#047857]",
    dot: "bg-[#059669]",
  },
  rose: {
    border: "border-[#CBD5E1] hover:border-[#94A3B8]",
    headerBg: "bg-[#FEF2F2]",
    text: "text-[#B91C1C]",
    dot: "bg-[#DC2626]",
  },
  violet: {
    border: "border-[#CBD5E1] hover:border-[#94A3B8]",
    headerBg: "bg-[#FAF5FF]",
    text: "text-[#6B21A8]",
    dot: "bg-[#7C3AED]",
  },
  cyan: {
    border: "border-[#CBD5E1] hover:border-[#94A3B8]",
    headerBg: "bg-[#ECFEFF]",
    text: "text-[#0E7490]",
    dot: "bg-[#0891B2]",
  },
  slate: {
    border: "border-[#CBD5E1] hover:border-[#94A3B8]",
    headerBg: "bg-[#F1F5F9]",
    text: "text-[#334155]",
    dot: "bg-[#475569]",
  },
};

export type TableNodeType = Node<{ table: Table }, "tableNode">;

export const TableNode = memo((props: NodeProps<TableNodeType>) => {
  const { data, selected } = props;
  const table = data.table;
  const { selectObject, addColumn, deleteTable, selectedTableId } = useSchemaStore();
  const isSelected = selected || selectedTableId === table.id;

  const style = colorStyles[table.color || "slate"] || colorStyles.slate;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        selectObject(table.id);
      }}
      className={`min-w-[240px] max-w-[320px] rounded-xl border bg-[#FFFFFF] shadow-sm transition-all select-none ${
        isSelected
          ? "border-[#0F172A] shadow-md ring-2 ring-[#0F172A]/10"
          : `${style.border} hover:shadow-md`
      }`}
    >
      {/* Universal Handles for React Flow connections */}
      <Handle
        type="target"
        position={Position.Left}
        className="!h-3 !w-3 !rounded-full !border-2 !border-[#FFFFFF] !bg-[#0F172A] transition-transform hover:!scale-125"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !rounded-full !border-2 !border-[#FFFFFF] !bg-[#0F172A] transition-transform hover:!scale-125"
      />

      {/* Table Header */}
      <div
        className={`flex items-center justify-between border-b border-[#F1F5F9] px-3.5 py-2.5 rounded-t-xl ${style.headerBg}`}
      >
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
          <span className={`font-display font-bold text-xs ${style.text}`}>
            {table.name}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] text-[#94A3B8]">
            {table.columns.length}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteTable(table.id);
            }}
            className="rounded p-1 text-[#94A3B8] hover:bg-[#F1F5F9] hover:text-[#DC2626] transition-colors"
            title="Delete table"
          >
            <Trash size={12} />
          </button>
        </div>
      </div>

      {/* Column Rows List */}
      <div className="divide-y divide-[#F1F5F9] py-1 font-mono text-[11px]">
        {table.columns.map((col) => {
          const isPk = col.constraints.includes("PRIMARY_KEY");
          const isUnique = col.constraints.includes("UNIQUE");

          return (
            <div
              key={col.id}
              onClick={(e) => {
                e.stopPropagation();
                selectObject(table.id, col.id);
              }}
              className="flex items-center justify-between px-3.5 py-1.5 hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                {isPk ? (
                  <Key size={12} weight="fill" className="text-[#D97706] shrink-0" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#CBD5E1] shrink-0" />
                )}
                <span className={`truncate ${isPk ? "font-bold text-[#0F172A]" : "text-[#334155]"}`}>
                  {col.name}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] text-[#64748B]">
                  {col.type}
                </span>
                {isPk && (
                  <span className="rounded bg-[#FEF3C7] px-1 text-[8px] font-bold text-[#D97706]">
                    PK
                  </span>
                )}
                {isUnique && !isPk && (
                  <span className="rounded bg-[#EFF6FF] px-1 text-[8px] font-bold text-[#2563EB]">
                    UQ
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer "+ Add column" */}
      <div className="border-t border-[#F1F5F9] p-1.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            addColumn(table.id, { name: "new_field", type: "text" });
          }}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg py-1 text-[11px] font-mono text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors"
        >
          <Plus size={12} weight="bold" />
          <span>Add column</span>
        </button>
      </div>
    </div>
  );
});

TableNode.displayName = "TableNode";
