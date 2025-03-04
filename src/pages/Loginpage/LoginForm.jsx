import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL_new } from "../../Endpoints/baseurl";
import CustomAlert from "../../components/CutomAlert/CutomAlert"; 



const LoginForm = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL_new}/api/login`, { phone, otp });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("phone", phone);

      navigate(response.data.requiresProfile ? "/user-details" : "/chat");
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      
      if (errorMessage === "User not found") {
        setAlert({
          message: "User not found. Please register first.",
          type: "error",
        });
        setTimeout(() => navigate("/register"), 2000);
      } else {
        console.error("Login failed:", error);
        setAlert({ message: "Login failed. Please try again.", type: "error" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const closeAlert = () => setAlert(null);

  const CustomLoader = () => (
    <div className="flex justify-center items-center space-x-1">
      {[0, 0.2, 0.4].map((delay) => (
        <motion.div
          key={delay}
          className="w-3 h-1 bg-white rounded"
          animate={{ scaleX: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay 
          }}
        />
      ))}
    </div>
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
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
        className="bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#2575fc]"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-[#6a11cb]">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block font-medium mb-2 text-[#6a11cb]">
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6a11cb]">
                📞
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-4 pl-12 border border-[#2575fc] rounded-xl focus:ring-2 focus:ring-[#2575fc] focus:border-transparent transition-all duration-200 bg-[#e6f0ff]/50 hover:bg-[#e6f0ff]"
                placeholder="+1 234 567 890"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2 text-[#6a11cb]">
              OTP
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6a11cb]">
                🔒
              </span>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-4 pl-12 border border-[#2575fc] rounded-xl focus:ring-2 focus:ring-[#2575fc] focus:border-transparent transition-all duration-200 bg-[#e6f0ff]/50 hover:bg-[#e6f0ff]"
                placeholder="Enter OTP"
                required
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full text-white p-4 rounded-xl transition-all duration-300 font-medium shadow-md relative overflow-hidden disabled:opacity-70"
            style={{
              background: "linear-gradient(to right, #6a11cb, #2575fc)",
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CustomLoader />
                </motion.div>
              ) : (
                <motion.span
                  key="text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  Verify & Continue
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="font-medium hover:underline text-[#2575fc]"
          >
            Register
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginForm;