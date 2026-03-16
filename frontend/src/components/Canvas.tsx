import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
  type Node,
  // type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "../hooks/useTheme";
import { extractData } from "../utils/core/CoreVisualizer.utils";
import { mockSchema } from "../types/MockData/mockSchema";
import ModelNode from "./modelNodes/ModelNode";
// import { getInfoFromSchema } from "../utils/SchemaVisualzer.utils";
// import { schema } from "../data/SchemaVisualizer.constants";
// import ModelNode from "./modelNodes/ModelNode";

// const modelTypes = {
//   model: ModelNode,
// };

// const { models, connections } = getInfoFromSchema(schema);

// const numModels = models.length;
// const gridSize = Math.ceil(Math.sqrt(numModels));

// const nodes: Node[] = models.map((model, index) => {
//   const row = Math.floor(index / gridSize);
//   const col = index % gridSize;
//   const x = col * 300;
//   const y = row * 300;

//   return {
//     id: model.name,
//     position: { x, y },
//     data: model,
//     type: "model",
//   };
// });
// const edges: Edge[] = connections.map((connection) => {
//   const sourceId = `${connection.source}-${connection.name}`;
//   return {
//     id: sourceId,
//     source: connection.source,
//     target: connection.target,
//     sourceHandle: sourceId,
//     targetHandle: connection.target,
//     animated: true,
//   };
// });

const nodeTypes_1 = {
  model1: ModelNode,
};

const { nodes } = extractData(mockSchema);
const models: Node[] = nodes.map((model) => {
  console.log("nnnn");
  console.log(model);
  return {
    id: model.modelName,
    position: { x: 0, y: 0 },
    data: model as unknown as Record<string, unknown>,
    type: "model1",
  };
});

const Canvas = () => {
  const { theme } = useTheme();

  return (
    <div style={{ width: "100vw", height: "calc(100vh - 4rem)" }}>
      <ReactFlow
        // defaultNodes={nodes}
        // defaultEdges={edges}
        // nodeTypes={modelTypes}
        nodeTypes={nodeTypes_1}
        defaultNodes={models}
        fitView
        colorMode={theme == "dark" ? "dark" : "light"}
      >
        <Background
          color={theme == "light" ? "#1A1717" : "#ccc"}
          variant={BackgroundVariant.Dots}
        />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Canvas;
