import ELK from "elkjs/lib/elk.bundled";
import { type Node, type Edge } from "@xyflow/react";

const elk = new ELK();

// Ref: https://www.eclipse.org/elk/reference/options.html
const defaultOptions = {
  "elk.algorithm": "layered",
  "elk.layered.spacing.nodeNodeBetweenLayers": "100",
  "elk.spacing.nodeNode": "80",
  "elk.direction": "RIGHT", // Default to LR
  // This is crucial for straight lines
  "elk.edgeRouting": "ORTHOGONAL",
  // Helps reduce edge crossing
  "elk.layered.nodePlacement.strategy": "BRANDES_KOEPF",
};

export const getElkLayoutedElements = async (
  nodes: Node[],
  edges: Edge[],
  options: { direction?: "TB" | "LR" | "BT" | "RL" } = {},
) => {
  const isHorizontal = options.direction === "LR" || options.direction === "RL";

  const graph = {
    id: "root",
    layoutOptions: {
      ...defaultOptions,
      "elk.direction": options.direction === "TB" ? "DOWN" : "RIGHT",
    },
    // Map React Flow nodes to ELK nodes
    children: nodes.map((node) => ({
      id: node.id,
      width: node.measured?.width ?? 150,
      height: node.measured?.height ?? 50,
      labels: [{ text: node.data.label as string }],
    })),
    // Map React Flow edges to ELK edges
    edges: edges.map((edge) => ({
      id: edge.id,
      sources: [edge.source],
      targets: [edge.target],
    })),
  };

  try {
    // Perform the layout
    const layoutedGraph = await elk.layout(graph);

    // Write back the positions to React Flow nodes
    const layoutedNodes = nodes.map((node) => {
      const elkNode = layoutedGraph.children?.find((n) => n.id === node.id);

      if (elkNode) {
        return {
          ...node,
          position: {
            x: elkNode.x!,
            y: elkNode.y!,
          },
        };
      }
      return node;
    });

    return { nodes: layoutedNodes, edges };
  } catch (error) {
    console.error("ELK Layout Error:", error);
    return { nodes, edges };
  }
};
