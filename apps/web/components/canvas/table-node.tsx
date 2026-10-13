"use client";

import React, { memo } from "react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { Key, Plus, Trash } from "@phosphor-icons/react";
import { useSchemaStore } from "@/lib/store";
import type { Table, TableColor } from "@fluxdb/schema-types";

const colorStyles: Record<TableColor, { border: string; headerBg: string; text: string; dot: string }> = {
  cobalt: {
    border: "border-[#2563EB]/40 hover:border-[#2563EB]",
    headerBg: "bg-[#2563EB]/15",
    text: "text-[#93C5FD]",
    dot: "bg-[#2563EB]",
  },
  emerald: {
    border: "border-[#10B981]/40 hover:border-[#10B981]",
    headerBg: "bg-[#10B981]/15",
    text: "text-[#10B981]",
    dot: "bg-[#10B981]",
  },
  amber: {
    border: "border-[#F59E0B]/40 hover:border-[#F59E0B]",
    headerBg: "bg-[#F59E0B]/15",
    text: "text-[#F59E0B]",
    dot: "bg-[#F59E0B]",
  },
  rose: {
    border: "border-[#EF4444]/40 hover:border-[#EF4444]",
    headerBg: "bg-[#EF4444]/15",
    text: "text-[#EF4444]",
    dot: "bg-[#EF4444]",
  },
  violet: {
    border: "border-[#8B5CF6]/40 hover:border-[#8B5CF6]",
    headerBg: "bg-[#8B5CF6]/15",
    text: "text-[#C4B5FD]",
    dot: "bg-[#8B5CF6]",
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

  const style = colorStyles[table.color || "cobalt"];

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        selectObject(table.id);
      }}
      className={`min-w-[240px] max-w-[320px] rounded-xl border bg-[#0D1117] shadow-xl transition-all select-none ${
        isSelected
          ? "border-[#2563EB] shadow-[0_0_24px_rgba(37,99,235,0.3)] ring-1 ring-[#2563EB]"
          : `${style.border} hover:shadow-2xl`
      }`}
    >
      {/* Universal Handles for React Flow connections */}
      <Handle
        type="target"
        position={Position.Left}
        className="!h-3 !w-3 !rounded-full !border-2 !border-[#07090E] !bg-[#2563EB] transition-transform hover:!scale-125"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !rounded-full !border-2 !border-[#07090E] !bg-[#60A5FA] transition-transform hover:!scale-125"
      />

      {/* Table Header */}
      <div
        className={`flex items-center justify-between border-b border-[#1A2133] px-3.5 py-2.5 rounded-t-xl ${style.headerBg}`}
      >
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
          <span className={`font-display font-bold text-xs ${style.text}`}>
            {table.name}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="font-mono text-[10px] text-[#7A90B0]">
            {table.columns.length}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteTable(table.id);
            }}
            className="rounded p-1 text-[#7A90B0] hover:bg-[#1A2133] hover:text-[#EF4444] transition-colors"
            title="Delete table"
          >
            <Trash size={12} />
          </button>
        </div>
      </div>

      {/* Column Rows List */}
      <div className="divide-y divide-[#1A2133]/60 py-1 font-mono text-[11px]">
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
              className="flex items-center justify-between px-3.5 py-1.5 hover:bg-[#131920]/80 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                {isPk ? (
                  <Key size={12} weight="fill" className="text-[#F59E0B] shrink-0" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#4A5F7A] shrink-0" />
                )}
                <span className={`truncate ${isPk ? "font-bold text-[#F0F4FF]" : "text-[#D8E2F2]"}`}>
                  {col.name}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] text-[#7A90B0]">
                  {col.type}
                </span>
                {isPk && (
                  <span className="rounded bg-[#F59E0B]/20 px-1 text-[8px] font-bold text-[#F59E0B]">
                    PK
                  </span>
                )}
                {isUnique && !isPk && (
                  <span className="rounded bg-[#2563EB]/20 px-1 text-[8px] font-bold text-[#93C5FD]">
                    U
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer "+ Add column" */}
      <div className="border-t border-[#1A2133] p-1.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            addColumn(table.id, { name: "new_field", type: "text" });
          }}
          className="flex w-full items-center justify-center gap-1.5 rounded-md py-1 text-[11px] font-mono text-[#7A90B0] hover:bg-[#131920] hover:text-[#F0F4FF] transition-colors"
        >
          <Plus size={12} weight="bold" />
          <span>Add column</span>
        </button>
      </div>
    </div>
  );
});

TableNode.displayName = "TableNode";
