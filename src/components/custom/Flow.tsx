"use client";

import {
  generateEdgesFromTables,
  generateNodesFromTables,
} from "@/lib/generateFlow";
import { TableDefinition } from "@/lib/types";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useState } from "react";
import DrizzleNode from "./DrizzleNode";

type FlowProps = {
  tables: TableDefinition[];
};

const nodeTypes = {
  drizzleNode: DrizzleNode,
};

export default function Flow({ tables }: FlowProps) {
  const [nodes, setNodes] = useState<any>([]);
  const [edges, setEdges] = useState<any>([]);

  useEffect(() => {
    setNodes(generateNodesFromTables(tables));
    setEdges(generateEdgesFromTables(tables));
  }, [tables]);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background
          gap={20}
          size={3}
          color="currentColor"
          className="text-zinc-200"
        />
        <Controls />
      </ReactFlow>
    </div>
  );
}
