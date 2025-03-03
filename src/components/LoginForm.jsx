import React from "react";
import { motion } from "framer-motion";

export const LoginForm = ({ phone, otp, setPhone, setOtp, handleLogin }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-8 rounded-xl shadow-lg w-96"
  >
    <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="+1 234 567 890"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">OTP</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter OTP"
        />
      </div>
      <motion.button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Verify & Continue
      </motion.button>
    </form>
  </motion.div>
);