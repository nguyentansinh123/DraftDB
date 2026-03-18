import Dagre from "@dagrejs/dagre";
import type { Edge, Node } from "@xyflow/react";

export type LayoutOptions = {
  direction: "TB" | "LR" | "BT" | "RL";
};

export const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  options: LayoutOptions,
) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

  g.setGraph({
    rankdir: options.direction,
    ranksep: 200, // Increase vertical separation
    nodesep: 100, // Increase horizontal separation
  });

  const nodesWithDimensions = nodes.filter(
    (node) => node.measured?.width && node.measured?.height,
  );
  const nodeIds = nodesWithDimensions.map((node) => node.id);

  const validEdges = edges.filter(
    (edge) => nodeIds.includes(edge.source) && nodeIds.includes(edge.target),
  );

  nodesWithDimensions.forEach((node) => {
    g.setNode(node.id, {
      width: node.measured!.width!,
      height: node.measured!.height!,
    });
  });

  validEdges.forEach((edge) => g.setEdge(edge.source, edge.target));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const nodeWithPosition = g.node(node.id);
      if (!nodeWithPosition) {
        return node;
      }

      const { x, y } = nodeWithPosition;
      const { width, height } = g.node(node.id);

      return {
        ...node,
        position: {
          x: x - width / 2,
          y: y - height / 2,
        },
      };
    }),
    edges: validEdges,
  };
};
