import React from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Login from "./components/Login/Login";
import FeedPage from "./components/Feed/FeedPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<FeedPage />} />
      </Routes>
    </div>
  );
}

export default App;
