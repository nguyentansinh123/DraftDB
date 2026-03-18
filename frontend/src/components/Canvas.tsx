import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
  type Node,
  useNodesState,
  useEdgesState,
  type Edge,
  addEdge,
  type Connection,
  ConnectionMode,
  // type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "../hooks/useTheme";
import {
  extractData,
  type TableNode,
} from "../utils/core/CoreVisualizer.utils";
import { mockSchema } from "../types/MockData/mockSchema";
import ModelNode from "./modelNodes/ModelNode";
import { useCallback, useState } from "react";
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

// edges
const { nodes, edges } = extractData(mockSchema);
const models: Node[] = nodes.map((model, index) => {
  return {
    id: model.modelName,
    position: { x: (index % 4) * 400, y: Math.floor(index / 4) * 400 },
    data: model as unknown as Record<string, unknown>,
    type: "model1",
  };
});

const edgeEdgeType: Edge[] = edges.map((edge) => {
  return {
    id: edge.id,
    source: edge.fromModel,
    target: edge.toModel,
    sourceHandle: edge.fromField,
    targetHandle: `${edge.toField}-target`,
    type: "bezier",
  };
});

const Canvas = () => {
  const { theme } = useTheme();

  const [nodesState, _setNodesState, onNodesChange] = useNodesState(models);
  const [edgeState, _setEdgeState, onEdgeChange] =
    useEdgesState<Edge>(edgeEdgeType);
  // const onConnect = useCallback(
  //   (connection: Connection) => {
  //     setEdgeState((oldEdges) => addEdge(connection, oldEdges));
  //   },
  //   [setEdgeState],
  // );

  return (
    <div style={{ width: "100vw", height: "calc(100vh - 4rem)" }}>
      <ReactFlow
        // defaultNodes={nodes}
        // defaultEdges={edges}
        // nodeTypes={modelTypes}
        //defaultNodes={models}
        nodeTypes={nodeTypes_1}
        nodes={nodesState}
        edges={edgeState}
        // onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgeChange}
        connectionMode={ConnectionMode.Strict}
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
