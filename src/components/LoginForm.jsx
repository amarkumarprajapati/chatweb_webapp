import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL_new } from "../Endpoints/baseurl";

const API_URL = API_URL_new;

const LoginForm = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

 // In LoginForm.jsx
const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${API_URL}/api/login`, { phone, otp });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("phone", phone); // Store phone for ChatInterface
    if (response.data.requiresProfile) {
      navigate("/complete-profile");
    } else {
      navigate("/chat"); // Directly to chat after login
    }
  } catch (error) {
    if (error.response && error.response.data.message === "User not found") {
      alert("User not found. Please register first.");
      navigate("/register");
    } else {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  }
};

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
        backgroundSize: "cover",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100"
      >
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 hover:bg-white"
                placeholder="+1 234 567 890"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                📞
              </span>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">OTP</label>
            <div className="relative">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 hover:bg-white"
                placeholder="Enter OTP"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔒
              </span>
            </div>
          </div>
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium shadow-md"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Verify & Continue
          </motion.button>
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Register
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginForm;