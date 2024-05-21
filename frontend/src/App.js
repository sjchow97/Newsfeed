import React from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Login from "./components/Login/Login";
import Feed from "./components/Feed/Feed";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import Post from "./components/Post";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </div>
  );
}

export default App;
