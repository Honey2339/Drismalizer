import React from "react";
import { Handle, Position } from "@xyflow/react";
import { ColumnDefinition } from "@/lib/types";

type Props = {
  data: {
    tableName: string;
    columns: ColumnDefinition[];
  };
};

const DrizzleNode: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border w-64 overflow-hidden">
      <div className="bg-blue-600 text-white font-bold text-center py-2">
        {data.tableName}
      </div>
      <div className="p-2 space-y-1">
        {data.columns.map((col, index) => (
          <div
            key={index}
            className="flex justify-between text-sm border-b py-1"
          >
            <span className="font-medium">{col.name}</span>
            <span className="text-gray-500">{col.type}</span>
          </div>
        ))}
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default DrizzleNode;
