import React from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Login from "./components/Login/Login";
import FeedPageLayout from "./components/Feed/FeedPageLayout";
import FeedPostLayout from "./components/Feed/FeedPostLayout";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/feed"
          element={
            <PrivateRoute>
              <FeedPageLayout />
            </PrivateRoute>
          }
        />
        <Route
          path="/feed/:id"
          element={
            <PrivateRoute>
              <FeedPostLayout />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

const WrappedApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default WrappedApp;
