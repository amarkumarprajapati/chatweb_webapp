import React from "react";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom"; // Add Navigate import
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { SplashScreen } from "./components/SplashScreen";
import { LoginForm } from "./components/LoginForm";
import { SuccessPage } from "./components/SuccessPage";
import { ChatInterface } from "./components/ChatInterface";
import { addMessage } from "./redux/features/chatSlice";
import axios from "axios";
import io from "socket.io-client";
import { API_URL_new } from "./Endpoints/baseurl";

const API_URL = API_URL_new;
const socket = io(API_URL);

export default function App() {
  const [appState, setAppState] = useState({
    phone: "",
    otp: "",
    showSplash: true,
    loginSuccess: false,
  });
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Add selectedUser state
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUsers();
      navigate("/chat");
    } else {
      setTimeout(() => {
        setAppState((p) => ({ ...p, showSplash: false }));
        navigate("/login");
      }, 2000);
    }

    socket.on("message", (message) => {
      dispatch(addMessage(message));
    });

    return () => socket.off("message");
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/login`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        phone: appState.phone,
        otp: appState.otp,
      });
  
      localStorage.setItem("token", response.data.token);
      setAppState((p) => ({ ...p, loginSuccess: true }));
      navigate("/success");
      fetchUsers();
    } catch (error) {
      if (error.response && error.response.data.message === "User not found") {
        alert("User not found. Please register first.");
        navigate("/register"); // Redirect to register page
      } else {
        console.error("Login failed:", error);
      }
    }
  };
  

  const handleSend = async (messageText) => {
    if (!messageText.trim() || !selectedUser) return;

    const room = [appState.phone, selectedUser._id].sort().join("-");
    const message = {
      text: messageText,
      sender: appState.phone,
      receiver: selectedUser._id,
      room,
    };

    try {
      await axios.post(`${API_URL}/api/messages`, message);
      socket.emit("chatMessage", message);
      dispatch(addMessage(message));
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

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
              <LoginForm
                phone={appState.phone}
                otp={appState.otp}
                setPhone={(val) => setAppState((p) => ({ ...p, phone: val }))}
                setOtp={(val) => setAppState((p) => ({ ...p, otp: val }))}
                handleLogin={handleLogin}
              />
            </div>
          }
        />

        <Route
          path="/success"
          element={<SuccessPage handleEnterChat={() => navigate("/chat")} />}
        />

        <Route
          path="/chat"
          element={
            <ChatInterface
              users={users}
              messages={messages}
              phone={appState.phone}
              handleSend={handleSend}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          }
        />
      </Routes>
    </AnimatePresence>
  );
}