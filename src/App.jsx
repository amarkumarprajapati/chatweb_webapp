import React, { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./components/SplashScreen";


const SuccessPage = lazy(() => import("./components/SuccessPage"));
const ChatInterface = lazy(() => import("./pages/chat/ChatInterface"));
const LoginForm = lazy(() => import("./pages/Loginpage/LoginForm"));
const Home = lazy(() => import("./pages/Home/Home"));

const App = () => {
  const [appState, setAppState] = useState({
    phone: "",
    otp: "",
    showSplash: true,
    loginSuccess: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !appState.showSplash) {
      setAppState((prev) => ({ ...prev, loginSuccess: true }));
      navigate("/chat");
    } else if (appState.showSplash) {
      const timer = setTimeout(() => {
        setAppState((prev) => ({ ...prev, showSplash: false }));
        navigate(token ? "/chat" : "/home");
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
        <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                appState.showSplash ? (
                  <SplashScreen />
                ) : appState.loginSuccess || localStorage.getItem("token") ? (
                  <Navigate to="/chat" />
                ) : (
                  <Navigate to="/home" />
                )
              }
            />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/chat" element={<ChatInterface />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </div>
  );
};

export default App;
