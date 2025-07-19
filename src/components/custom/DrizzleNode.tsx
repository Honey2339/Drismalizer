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
    <div className="bg-white rounded-sm border-2 border-zinc-900 w-80 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="bg-gray-200 border-b border-zinc-900 px-4 py-3">
        <h3 className="text-gray-900 text-center uppercase font-medium text-sm tracking-tight">
          {data?.tableName}
        </h3>
      </div>
      <div className="p-0">
        {data.columns.map((col, index) => {
          const handleId = `${col.name}`;
          return (
            <div
              key={index}
              className="relative px-6 py-2.5 border-b border-gray-500 last:border-b-0 hover:bg-gray-25 transition-colors duration-150"
            >
              <Handle
                type="source"
                position={Position.Right}
                id={handleId}
                className="!w-3 !h-3 !bg-zinc-700 !border-2 !border-white hover:!bg-blue-500 !rounded-full transition-colors duration-200 absolute top-1/2 -translate-y-1/2"
                style={{ right: "8px" }}
              />
              <Handle
                type="target"
                position={Position.Left}
                id={handleId}
                className="!w-3 !h-3 !bg-zinc-700 !border-2 !border-white hover:!bg-green-500 !rounded-full transition-colors duration-200 absolute top-1/2 -translate-y-1/2"
                style={{ left: "8px" }}
              />

              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                  <span className="text-gray-900 text-sm font-medium">
                    {col.name}
                  </span>
                  <span className="text-gray-500 text-xs font-mono">
                    {col.type}
                  </span>
                </div>

                <div className="flex flex-col gap-1 items-end flex-shrink-0">
                  {col.config?.map((meta, i) => (
                    <span
                      key={i}
                      className="bg-zinc-100 text-zinc-700 text-[10px] px-2 py-0.5 rounded-full border border-zinc-300 font-mono whitespace-nowrap"
                    >
                      {meta}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DrizzleNode;
