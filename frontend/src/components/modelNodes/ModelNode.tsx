import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { TableNode } from "../../utils/core/CoreVisualizer.utils";
import ToolTips from "./ToolTips";

const ModelNode = ({ data }: NodeProps<Node<TableNode>>) => {
  {
    console.log("log from model");

    console.log(data.fields);
  }
  return (
    <div className="rounded-lg min-w-[250px] bg-white dark:bg-zinc-800 shadow-md border border-gray-200 dark:border-zinc-700">
      {/* {data.isChild && ( */}
      {/*   <Handle id={data.name} position={Position.Top} type="target" /> */}
      {/* )} */}
      <div className="p-1 text-center rounded-t-lg bg-[#3d5787]">
        <p className="font-semibold text-white text-[15px]">{data.modelName}</p>
      </div>
      {data.fields.map((field) => (
        <div
          key={field.name}
          className="group relative z-10 hover:z-1000 flex justify-between px-3 py-1 border-t border-gray-200 dark:border-zinc-700 text-sm"
        >
          <Handle id={field.name} type="source" position={Position.Left} />
          <Handle
            id={`${field.name}-target`}
            type="target"
            position={Position.Right}
          />

          <span className="dark:text-white">{field.name}</span>
          <div className="flex items-center gap-2">
            {field.isPrimary && (
              <span className="px-1 py-0.5 rounded bg-yellow-100 dark:bg-yellow-900/30 text-[9px] font-bold text-yellow-600 dark:text-yellow-500 border border-yellow-200 dark:border-yellow-700/50 leading-none">
                PK
              </span>
            )}
            {field.isForeignKey && (
              <span className="px-1 py-0.5 rounded bg-blue-400/10 text-[9px] font-black text-blue-600 dark:text-blue-400 border border-blue-400/20 leading-none">
                FK
              </span>
            )}
            <span className="text-gray-400 dark:text-zinc-400 font-mono text-[12px]">
              {field.type}
            </span>
          </div>

          <ToolTips field={field} />
        </div>
      ))}
    </div>
  );
};

export default ModelNode;
