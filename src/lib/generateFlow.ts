import { TableDefinition } from "@/lib/types";

export function generateNodesFromTables(tables: TableDefinition[]) {
  return tables.map((table, index) => ({
    id: table.variableName,
    data: { label: table.tableName, table },
    position: { x: index * 350, y: 100 },
    type: "tableNode",
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
          const [refTable] = match[1].split(",");
          edges.push({
            id: `${table.tableName}-${refTable}`,
            source: table.variableName,
            target: refTable.trim(),
            label: `${column.name}`,
          });
        }
      }
    }
  }
  console.log(edges);
  return edges;
}
