import React from "react";
import { motion } from "framer-motion";

export const SplashScreen = () => (
  <motion.div
    className="min-h-screen flex items-center justify-center bg-blue-500"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl text-white font-bold">Chat App</h1>
    </motion.div>
  </motion.div>
);