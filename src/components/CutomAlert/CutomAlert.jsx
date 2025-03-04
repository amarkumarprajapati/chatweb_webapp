import React from "react";
import { motion } from "framer-motion";
import { FaTimes, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

const CustomAlert = ({ message, type, onClose, title, subtitle }) => {
  const bgColor = type === "error" ? "bg-red-600" : "bg-white";
  const textColor = type === "error" ? "text-white" : "text-red-600";
  const iconColor = type === "error" ? "text-white" : "text-red-600";
  const borderColor = type === "error" ? "border-red-800" : "border-red-400";
  const icon = type === "error" ? <FaExclamationCircle /> : <FaCheckCircle />;
  const alertVariants = {
    hidden: { opacity: 0, y: "-50%", scale: 0.9 },
    visible: {
      opacity: 1,
      y: "-50%",
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 backdrop-blur-lg z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        z-50 p-8 rounded-2xl shadow-xl ${bgColor} ${textColor} ${borderColor} 
        border-2 flex flex-col items-center justify-center max-w-md w-full`}
        variants={alertVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className={`mb-4 ${iconColor}`}>
          {icon}
          <span className="sr-only">
            {type === "error" ? "Error" : "Success"}
          </span>
        </div>

        {title && (
          <h2 className="text-2xl font-bold mb-2 text-center">{title}</h2>
        )}

        <span className="text-lg font-medium text-center">{message}</span>

        {subtitle && (
          <span className="mt-2 text-sm opacity-80 text-center">
            {subtitle}
          </span>
        )}

        <button
          onClick={onClose}
          className={`mt-6 ${textColor} hover:opacity-70 transition-opacity 
          p-2 rounded-full border ${borderColor}`}
        >
          <FaTimes size={20} />
          <span className="sr-only">Close</span>
        </button>
      </motion.div>
    </>
  );
};

export default CustomAlert;
