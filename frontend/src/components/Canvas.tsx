import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "../hooks/useTheme";

const Canvas = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow fitView colorMode={theme == "dark" ? "dark" : "light"}>
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
