import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InputPage from "./InputPage";
import "./styles.css";
import ViewPage from "./ViewPage";

export default function App() {
  const [points, setPoints] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  return (
    <div className="App">
      <h1>Triangle Maker</h1>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<InputPage points={points} setPoints={setPoints} />}
          />
          <Route path="/view" element={<ViewPage points={points} />} />
        </Routes>
      </Router>
    </div>
  );
}
