// pages/UserDetails.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL_new } from "../../Endpoints/baseurl";

const API_URL = API_URL_new;

const UserDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/api/update-profile`,
        { firstName, lastName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/chat");
      }
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)`,
        backgroundSize: "cover",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#2575fc]"
      >
        <h2
          className="text-3xl font-bold mb-8 text-center"
          style={{ color: "#6a11cb" }}
        >
          Complete Your Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block font-medium mb-2"
              style={{ color: "#6a11cb" }}
            >
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-4 border border-[#2575fc] rounded-xl focus:ring-2 focus:ring-[#2575fc] focus:border-transparent transition-all duration-200 bg-[#e6f0ff]/50 hover:bg-[#e6f0ff]"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div>
            <label
              className="block font-medium mb-2"
              style={{ color: "#6a11cb" }}
            >
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-4 border border-[#2575fc] rounded-xl focus:ring-2 focus:ring-[#2575fc] focus:border-transparent transition-all duration-200 bg-[#e6f0ff]/50 hover:bg-[#e6f0ff]"
              placeholder="Enter your last name"
              required
            />
          </div>
          <motion.button
            type="submit"
            className="w-full text-white p-4 rounded-xl transition-all duration-300 font-medium shadow-md"
            style={{
              background: `linear-gradient(to right, #6a11cb, #2575fc)`,
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Save & Continue
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default UserDetails;