"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
  NodeChange,
  applyNodeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { TableNode } from "./table-node";
import { RelationEdge } from "./relation-edge";
import { CanvasToolbar } from "./canvas-toolbar";
import { InspectorPanel } from "./inspector-panel";
import { ExportModal } from "./export-modal";
import { ShareModal } from "./share-modal";
import { useSchemaStore } from "@/lib/store";
import { TableColor } from "@fluxdb/schema-types";
import { Cursor, Plus, X } from "@phosphor-icons/react";

import type { NodeTypes, EdgeTypes } from "@xyflow/react";

const nodeTypes: NodeTypes = {
  tableNode: TableNode as any,
};

const edgeTypes: EdgeTypes = {
  relationEdge: RelationEdge as any,
};

const tableColorsList: TableColor[] = [
  "cobalt",
  "emerald",
  "amber",
  "rose",
  "violet",
  "cyan",
  "slate",
];

export function SchemaCanvas({ readOnly = false }: { readOnly?: boolean }) {
  const {
    schema,
    updateTablePosition,
    addRelation,
    addTable,
    selectObject,
    collaborators,
  } = useSchemaStore();

  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isAddTableOpen, setIsAddTableOpen] = useState(false);
  const [newTableName, setNewTableName] = useState("");
  const [newTableColor, setNewTableColor] = useState<TableColor>("cobalt");

  // Map Schema tables to React Flow nodes
  const nodes: Node[] = useMemo(() => {
    return schema.tables.map((table) => ({
      id: table.id,
      type: "tableNode",
      position: table.position,
      data: { table },
    }));
  }, [schema.tables]);

  // Map Schema relations to React Flow edges
  const edges: Edge[] = useMemo(() => {
    return schema.relations.map((rel) => ({
      id: rel.id,
      source: rel.fromTableId,
      target: rel.toTableId,
      type: "relationEdge",
      label: rel.type || "1:N",
    }));
  }, [schema.relations]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      changes.forEach((change) => {
        if (change.type === "position" && change.position && change.id) {
          updateTablePosition(change.id, change.position);
        }
      });
    },
    [updateTablePosition]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      if (params.source && params.target) {
        addRelation({
          fromTableId: params.source,
          fromColumnId: "col-default",
          toTableId: params.target,
          toColumnId: "col-default",
          type: "1:N",
          label: "references",
        });
      }
    },
    [addRelation]
  );

  const handleCreateNewTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableName.trim()) return;
    addTable(newTableName.trim(), newTableColor);
    setNewTableName("");
    setIsAddTableOpen(false);
  };

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden bg-[#050709]"
      onClick={() => selectObject(null)}
      data-testid="canvas"
    >
      {/* Top Toolbar */}
      {!readOnly && (
        <CanvasToolbar
          onOpenExport={() => setIsExportOpen(true)}
          onOpenShare={() => setIsShareOpen(true)}
          onOpenAddTable={() => setIsAddTableOpen(true)}
        />
      )}

      {/* Main Canvas Body + Right Inspector */}
      <div className="relative flex flex-1 min-h-0 w-full overflow-hidden">
        {/* React Flow Viewport */}
        <div className="relative flex-1 h-full w-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={readOnly ? undefined : onNodesChange}
            onConnect={readOnly ? undefined : onConnect}
            fitView
            minZoom={0.2}
            maxZoom={2}
            proOptions={{ hideAttribution: true }}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={24}
              size={1}
              color="#1A2133"
              className="bg-[#050709]"
            />
            <Controls className="!border-[#1A2133] !bg-[#0D1117]" />
            <MiniMap
              nodeColor={(n) => "#2563EB"}
              maskColor="rgba(7, 9, 14, 0.85)"
              className="!border-[#1A2133] !bg-[#0D1117] !rounded-lg"
            />
          </ReactFlow>

          {/* Real-time Collaborators Floating Presence Overlay */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {collaborators.map((c) => (
              <div
                key={c.id}
                style={{
                  left: `${c.cursor?.x ?? 400}px`,
                  top: `${c.cursor?.y ?? 200}px`,
                }}
                className="absolute flex items-center gap-1 transition-all duration-300"
              >
                <Cursor
                  size={16}
                  weight="fill"
                  style={{ color: c.color }}
                  className="drop-shadow"
                />
                <span
                  style={{ backgroundColor: c.color }}
                  className="rounded px-1.5 py-0.5 text-[9px] font-bold text-black shadow-md font-mono"
                >
                  {c.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Inspector Panel */}
        {!readOnly && <InspectorPanel onOpenExport={() => setIsExportOpen(true)} />}
      </div>

      {/* Export Modal */}
      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />

      {/* Share Modal */}
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />

      {/* Add Table Modal */}
      {isAddTableOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-[#253047] bg-[#0D1117] p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1A2133] pb-3">
              <h3 className="font-display text-sm font-bold text-[#F0F4FF]">
                Add Database Table
              </h3>
              <button
                onClick={() => setIsAddTableOpen(false)}
                className="text-[#7A90B0] hover:text-[#F0F4FF]"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateNewTable} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#7A90B0] mb-1">
                  Table Name
                </label>
                <input
                  type="text"
                  required
                  value={newTableName}
                  onChange={(e) => setNewTableName(e.target.value)}
                  placeholder="e.g. audit_logs"
                  className="input-well w-full text-xs font-mono"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#7A90B0] mb-1.5">
                  Header Color
                </label>
                <div className="flex items-center gap-2">
                  {tableColorsList.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setNewTableColor(c)}
                      className={`h-6 w-6 rounded-full border transition-all cursor-pointer ${
                        newTableColor === c
                          ? "border-white scale-110 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                      style={{
                        backgroundColor:
                          c === "cobalt" ? "#2563EB" :
                          c === "emerald" ? "#10B981" :
                          c === "amber" ? "#F59E0B" :
                          c === "rose" ? "#EF4444" :
                          c === "violet" ? "#8B5CF6" :
                          c === "cyan" ? "#06B6D4" : "#64748B",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-[#1A2133] pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddTableOpen(false)}
                  className="btn-secondary text-xs py-1.5 px-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-1.5 px-3.5"
                >
                  <span>Add Table to Canvas</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
