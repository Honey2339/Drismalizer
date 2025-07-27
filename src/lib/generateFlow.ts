import { TableDefinition } from "@/lib/types";

export function generateNodesFromTables(tables: TableDefinition[]) {
  return tables.map((table, index) => ({
    id: table.variableName,
    type: "drizzleNode",
    position: { x: 100 + index * 300, y: 100 },
    data: { tableName: table.tableName, columns: table.columns },
  }));
}

export function generateEdgesFromTables(tables: TableDefinition[]) {
  const edges: any[] = [];

  for (const table of tables) {
    for (const column of table.columns) {
      const ref = column.config.find((c) => c.startsWith("references("));
      if (ref) {
        const match = ref.match(/references\(([^)]+)\)/);
        if (match) {
          const [refTable, refColumn] = match[1]
            .split(",")
            .map((s) => s.trim());
          edges.push({
            id: `${table.tableName}-${column.name}-to-${refTable}-${refColumn}`,
            source: table.variableName,
            sourceHandle: column.name,
            target: refTable,
            targetHandle: refColumn || "id",
            label: `${column.name}`,
            animated: true,
            type: "",
            markerEnd: {
              type: "arrowclosed",
              width: 20,
              height: 20,
              color: "#0ea5e9",
            },
            style: { stroke: "#0ea5e9", strokeWidth: "2px" },
          });
        }
      }
    }
  }
  return edges;
}
