import React from "react";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Error from "./pages/Error";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
