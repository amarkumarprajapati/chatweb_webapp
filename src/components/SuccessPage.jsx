import React from "react";
import { motion } from "framer-motion";

const SuccessPage = ({handleEnterChat}) => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-green-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white p-12 rounded-2xl shadow-xl"
        >
          <h1 className="text-3xl font-bold text-green-600 mb-4">Success!</h1>
          <p className="text-gray-600 mb-8">
            You're now ready to start chatting securely
          </p>
          <motion.button
            onClick={handleEnterChat}
            className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enter Chat
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SuccessPage;
