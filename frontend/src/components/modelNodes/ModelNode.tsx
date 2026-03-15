import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { Model } from "../../types/SchemaVisualizer.types";

type ModelNodeType = Node<Model>;

const ModelNode = ({ data }: NodeProps<ModelNodeType>) => {
  return (
    <div className="rounded-lg min-w-[200px] bg-white dark:bg-zinc-800 shadow-md border border-gray-200 dark:border-zinc-700">
      {data.isChild && (
        <Handle id={data.name} position={Position.Top} type="target" />
      )}
      <div className="p-1 text-center rounded-t-lg bg-[#3d5787]">
        <p className="font-bold text-white">{data.name}</p>
      </div>
      {data.fields.map((field, index) => (
        <div
          key={field.name}
          className="flex justify-between px-3 py-1 border-t border-gray-200 dark:border-zinc-700 text-sm"
        >
          <span className="dark:text-white">{field.name}</span>
          <span className="text-gray-400 dark:text-gray-300">{field.type}</span>
          {field.hasConnections && (
            <Handle
              id={`${data.name}-${field.name}`}
              position={Position.Right}
              type="source"
              style={{ top: 32 + 15 + 29 * index }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ModelNode;
