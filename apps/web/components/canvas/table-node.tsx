"use client";

import React, { memo } from "react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { Key, Plus, Trash } from "@phosphor-icons/react";
import { useSchemaStore } from "@/lib/store";
import type { Table, TableColor } from "@fluxdb/schema-types";

const colorStyles: Record<TableColor, { border: string; headerBg: string; text: string; dot: string }> = {
  amber: {
    border: "border-[#F59E0B]/50 hover:border-[#F59E0B]",
    headerBg: "bg-[#F59E0B]/15",
    text: "text-[#FBBF24]",
    dot: "bg-[#F59E0B]",
  },
  cobalt: {
    border: "border-[#38BDF8]/40 hover:border-[#38BDF8]",
    headerBg: "bg-[#38BDF8]/15",
    text: "text-[#7DD3FC]",
    dot: "bg-[#38BDF8]",
  },
  emerald: {
    border: "border-[#10B981]/40 hover:border-[#10B981]",
    headerBg: "bg-[#10B981]/15",
    text: "text-[#34D399]",
    dot: "bg-[#10B981]",
  },
  rose: {
    border: "border-[#EF4444]/40 hover:border-[#EF4444]",
    headerBg: "bg-[#EF4444]/15",
    text: "text-[#F87171]",
    dot: "bg-[#EF4444]",
  },
  violet: {
    border: "border-[#A855F7]/40 hover:border-[#A855F7]",
    headerBg: "bg-[#A855F7]/15",
    text: "text-[#C084FC]",
    dot: "bg-[#A855F7]",
  },
  cyan: {
    border: "border-[#06B6D4]/40 hover:border-[#06B6D4]",
    headerBg: "bg-[#06B6D4]/15",
    text: "text-[#67E8F9]",
    dot: "bg-[#06B6D4]",
  },
  slate: {
    border: "border-[#64748B]/40 hover:border-[#64748B]",
    headerBg: "bg-[#64748B]/15",
    text: "text-[#CBD5E1]",
    dot: "bg-[#64748B]",
  },
};

export type TableNodeType = Node<{ table: Table }, "tableNode">;

export const TableNode = memo((props: NodeProps<TableNodeType>) => {
  const { data, selected } = props;
  const table = data.table;
  const { selectObject, addColumn, deleteTable, selectedTableId } = useSchemaStore();
  const isSelected = selected || selectedTableId === table.id;

  const style = colorStyles[table.color || "amber"] || colorStyles.amber;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        selectObject(table.id);
      }}
      className={`min-w-[240px] max-w-[320px] rounded-lg border bg-[#111622] shadow-2xl transition-all select-none ${
        isSelected
          ? "border-[#F59E0B] shadow-[0_0_24px_rgba(245,158,11,0.25)] ring-1 ring-[#F59E0B]"
          : `${style.border} hover:shadow-2xl`
      }`}
    >
      {/* Universal Handles for React Flow connections */}
      <Handle
        type="target"
        position={Position.Left}
        className="!h-3 !w-3 !rounded-full !border-2 !border-[#0B0E14] !bg-[#F59E0B] transition-transform hover:!scale-125"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !rounded-full !border-2 !border-[#0B0E14] !bg-[#FBBF24] transition-transform hover:!scale-125"
      />

      {/* Table Header */}
      <div
        className={`flex items-center justify-between border-b border-[#1C2436] px-3.5 py-2.5 rounded-t-lg ${style.headerBg}`}
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
            className="rounded p-1 text-[#64748B] hover:bg-[#182030] hover:text-[#EF4444] transition-colors"
            title="Delete table"
          >
            <Trash size={12} />
          </button>
        </div>
      </div>

      {/* Column Rows List */}
      <div className="divide-y divide-[#1C2436]/60 py-1 font-mono text-[11px]">
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
              className="flex items-center justify-between px-3.5 py-1.5 hover:bg-[#182030]/80 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                {isPk ? (
                  <Key size={12} weight="fill" className="text-[#F59E0B] shrink-0" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#334155] shrink-0" />
                )}
                <span className={`truncate ${isPk ? "font-bold text-[#F8FAFC]" : "text-[#E2E8F0]"}`}>
                  {col.name}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] text-[#94A3B8]">
                  {col.type}
                </span>
                {isPk && (
                  <span className="rounded bg-[#F59E0B]/20 px-1 text-[8px] font-bold text-[#FBBF24]">
                    PK
                  </span>
                )}
                {isUnique && !isPk && (
                  <span className="rounded bg-[#10B981]/20 px-1 text-[8px] font-bold text-[#34D399]">
                    UQ
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer "+ Add column" */}
      <div className="border-t border-[#1C2436] p-1.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            addColumn(table.id, { name: "new_field", type: "text" });
          }}
          className="flex w-full items-center justify-center gap-1.5 rounded py-1 text-[11px] font-mono text-[#94A3B8] hover:bg-[#182030] hover:text-[#F8FAFC] transition-colors"
        >
          <Plus size={12} weight="bold" />
          <span>Add column</span>
        </button>
      </div>
    </div>
  );
});

TableNode.displayName = "TableNode";
