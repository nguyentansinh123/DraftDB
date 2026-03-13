import { BrowserRouter, Route, Routes } from "react-router-dom";
import Editor from "./pages/Editor";
import Homepage from "./pages/Homepage";
import BasicLayout from "./pages/layout/BasicLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BasicLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/editor" element={<Editor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
