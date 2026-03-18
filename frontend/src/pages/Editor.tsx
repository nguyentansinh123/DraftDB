import { ReactFlowProvider } from "@xyflow/react";
import Canvas from "../components/Canvas";
import FloatBar from "../components/optionBar/FloatBar";

const Editor = () => {
  return (
    <div>
      <FloatBar />
      <ReactFlowProvider>
        <Canvas />
      </ReactFlowProvider>
    </div>
  );
};

export default Editor;
