import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./components/SplashScreen";
import SuccessPage from "./components/SuccessPage";
import ChatInterface from "./components/ChatInterface";
import LoginForm from "./pages/LoginForm";

const App = () => {
  const [appState, setAppState] = useState({
    phone: "",
    otp: "",
    showSplash: true,
    loginSuccess: false,
  });
  const navigate = useNavigate();

  // Check token on mount and after splash screen
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !appState.showSplash) {
      // If user is already logged in, skip splash and go to chat
      setAppState((prev) => ({ ...prev, loginSuccess: true }));
      navigate("/chat");
    } else if (appState.showSplash) {
      // Show splash screen, then redirect to login if not authenticated
      const timer = setTimeout(() => {
        setAppState((prev) => ({ ...prev, showSplash: false }));
        navigate(token ? "/chat" : "/login");
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [appState.showSplash, navigate]);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/"
            element={
              appState.showSplash ? (
                <SplashScreen />
              ) : appState.loginSuccess || localStorage.getItem("token") ? (
                <Navigate to="/chat" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/success"
            element={<SuccessPage handleEnterChat={() => navigate("/chat")} />}
          />
          <Route path="/chat" element={<ChatInterface />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;