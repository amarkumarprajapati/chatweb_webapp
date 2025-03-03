import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Add AnimatePresence
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL_new } from "../Endpoints/baseurl";
import CustomAlert from "../components/CutomAlert/CutomAlert";


const API_URL = API_URL_new;

const LoginForm = () => {
  const [phone, setPhone] = useState("");

  const [otp, setOtp] = useState("");
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/login`, { phone, otp });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("phone", phone);
      if (response.data.requiresProfile) {
        navigate("/complete-profile");
      } else {
        navigate("/chat");
      }
    } catch (error) {
      if (error.response && error.response.data.message === "User not found") {
        setAlert({
          message: "User not found. Please register first.",
          type: "error",
        });
        setTimeout(() => navigate("/register"), 2000);
      } else {
        console.error("Login failed:", error);
        setAlert({ message: "Login failed. Please try again.", type: "error" });
      }
    }
  };

  const closeAlert = () => setAlert(null);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(135deg, #5B913B 0%, #77B254 100%)`,
        backgroundSize: "cover",
      }}
    >
      <AnimatePresence>
        {alert && (
          <CustomAlert
            message={alert.message}
            type={alert.type}
            onClose={closeAlert}
            key="alert" 
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#77B254]"
      >

        <h2
          className="text-3xl font-bold mb-8 text-center"
          style={{ color: "#5B913B" }}
        >
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              className="block font-medium mb-2"
              style={{ color: "#5B913B" }}
            >
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-4 pl-12 border border-[#77B254] rounded-xl focus:ring-2 focus:ring-[#77B254] focus:border-transparent transition-all duration-200 bg-[#FFE8B6]/50 hover:bg-[#FFE8B6]"
                placeholder="+1 234 567 890"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5B913B]">
                📞
              </span>
            </div>
          </div>
          <div>
            <label
              className="block font-medium mb-2"
              style={{ color: "#5B913B" }}
            >
              OTP
            </label>
            <div className="relative">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-4 pl-12 border border-[#77B254] rounded-xl focus:ring-2 focus:ring-[#77B254] focus:border-transparent transition-all duration-200 bg-[#FFE8B6]/50 hover:bg-[#FFE8B6]"
                placeholder="Enter OTP"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5B913B]">
                🔒
              </span>
            </div>
          </div>
          <motion.button
            type="submit"
            className="w-full text-white p-4 rounded-xl transition-all duration-300 font-medium shadow-md"
            style={{
              background: `linear-gradient(to right, #5B913B, #77B254)`,
            }}
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
            className="font-medium hover:underline"
            style={{ color: "#D99D81" }}
          >
            Register
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginForm;
