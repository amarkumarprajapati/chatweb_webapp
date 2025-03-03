import React from "react";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { SplashScreen } from "./components/SplashScreen";
import LoginForm from "./components/LoginForm";
import { SuccessPage } from "./components/SuccessPage";
import ChatInterface from "./components/ChatInterface";
import { API_URL_new } from "./Endpoints/baseurl";

export default function App() {
  const [appState, setAppState] = useState({
    phone: "",
    otp: "",
    showSplash: true,
    loginSuccess: false,
  });

  const navigate = useNavigate();

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route
          path="/"
          element={
            appState.showSplash ? <SplashScreen /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/login"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <LoginForm />
            </div>
          }
        />

        <Route
          path="/success"
          element={<SuccessPage handleEnterChat={() => navigate("/chat")} />}
        />

        <Route path="/chat" element={<ChatInterface />} />
      </Routes>
    </AnimatePresence>
  );
}
