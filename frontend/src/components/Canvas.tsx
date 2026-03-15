import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "../hooks/useTheme";
import { getInfoFromSchema } from "../utils/SchemaVisualzer.utils";
import { schema } from "../data/SchemaVisualizer.constants";
import ModelNode from "./modelNodes/ModelNode";

const modelTypes = {
  model: ModelNode,
};

const { models, connections } = getInfoFromSchema(schema);

let row = 0;
let column = 0;

const numModel = models.length;
let numGrid = 1;

while (1) {
  if (numGrid ** 2 >= numModel) {
    break;
  }
  numGrid++;
}

const nodes: Node[] = models.map((model, index) => {
  const x = row * 300;
  const y = column * 300;
  if (numGrid % index == 0) {
    column = 0;
    row += 1;
  } else {
    column += 1;
  }

  return {
    id: model.name,
    position: { x, y },
    data: model,
    type: "model",
  };
});
const edges: Edge[] = connections.map((connection) => {
  const sourceId = `${connection.source}-${connection.name}`;
  return {
    id: sourceId,
    source: connection.source,
    target: connection.target,
    sourceHandle: sourceId,
    targetHandle: connection.target,
    animated: true,
  };
});

const Canvas = () => {
  const { theme } = useTheme();

  return (
    <div style={{ width: "100vw", height: "calc(100vh - 4rem)" }}>
      <ReactFlow
        defaultNodes={nodes}
        defaultEdges={edges}
        nodeTypes={modelTypes}
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
