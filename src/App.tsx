import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages";
import AgoraRTCPage from "./pages/AgoraRTCPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="AgoraPage/:channelName/:id" element={<AgoraRTCPage />} />
    </Routes>
  );
}

export default App;
