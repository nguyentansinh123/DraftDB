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
  useReactFlow,
  Panel,
  MiniMap,
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
import { getLayoutedElements } from "../layout/Darge/BasicLayout";
import { getElkLayoutedElements } from "../layout/Elk/ElkLayout"; // Import the new layout
import {
  SmartBezierEdge,
  SmartStepEdge,
  SmartStraightEdge,
} from "@jalez/react-flow-smart-edge";
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
const edgeTypes = {
  smart: SmartBezierEdge,
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
    type: "smart",
  };
});

const Canvas = () => {
  const { theme } = useTheme();

  const { fitView } = useReactFlow();

  const [nodesState, setNodesState, onNodesChange] = useNodesState(models);
  const [edgeState, setEdgeState, onEdgeChange] =
    useEdgesState<Edge>(edgeEdgeType);
  // const onConnect = useCallback(
  //   (connection: Connection) => {
  //     setEdgeState((oldEdges) => addEdge(connection, oldEdges));
  //   },
  //   [setEdgeState],
  // );

  console.log("edgeEdgeType", edgeEdgeType);
  console.log(edgeState);

  const onLayout = (direction: "TB" | "LR" | "BT" | "RL") => {
    // console.log(nodesState.map(n => n.measured))
    const layouted = getLayoutedElements(nodesState, edgeState, { direction });
    setNodesState([...layouted.nodes]);
    setEdgeState([...layouted.edges]);
    fitView();
  };

  // New function for ELK
  const onElkLayout = useCallback(
    async (direction: "TB" | "LR" | "BT" | "RL") => {
      const layouted = await getElkLayoutedElements(nodesState, edgeState, {
        direction,
      });
      setNodesState([...layouted.nodes]);
      setEdgeState([...layouted.edges]);
      // ELK is async, wait a tick for React Flow to update state before fitting view
      setTimeout(() => window.requestAnimationFrame(() => fitView()), 10);
    },
    [nodesState, edgeState, fitView, setNodesState, setEdgeState],
  );

  return (
    <div style={{ width: "100vw", height: "calc(100vh - 4rem)" }}>
      <ReactFlow
        // defaultNodes={nodes}
        // defaultEdges={edges}
        // nodeTypes={modelTypes}
        //defaultNodes={models}
        nodeTypes={nodeTypes_1}
        nodes={nodesState}
        edgeTypes={edgeTypes}
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
        <Panel position="top-right">
          {/* Existing Dagre Buttons */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <span>Dagre: </span>
            <button onClick={() => onLayout("TB")}>Vertical</button>
            <button onClick={() => onLayout("LR")}>Horizontal</button>
          </div>

          {/* New ELK Buttons */}
          <div style={{ display: "flex", gap: "10px" }}>
            <span>ELK: </span>
            <button onClick={() => onElkLayout("TB")}>Vertical</button>
            <button onClick={() => onElkLayout("LR")}>Horizontal</button>
          </div>
        </Panel>
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default Canvas;
