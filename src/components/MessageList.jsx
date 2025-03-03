import { AnimatePresence, motion } from "framer-motion";
import React from "react";
export const MessageList = ({ messages, phone, selectedUser }) => (
  <AnimatePresence>
    {messages
      .filter(
        (msg) =>
          msg.room === [phone, selectedUser._id].sort().join("-")
      )
      .map((message) => (
        <MessageItem key={message._id} message={message} phone={phone} />
      ))}
  </AnimatePresence>
);

const MessageItem = ({ message, phone }) => (
  <motion.div
    className={`flex ${message.sender === phone ? "justify-end" : "justify-start"} mb-4`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
  >
    <div
      className={`max-w-md p-4 rounded-2xl shadow-md ${
        message.sender === phone
          ? "bg-blue-500 text-white"
          : "bg-white"
      }`}
    >
      <p className="text-sm">{message.text}</p>
      <p className={`text-xs mt-2 ${message.sender === phone ? 'text-blue-100' : 'text-gray-500'}`}>
        {new Date(message.createdAt).toLocaleTimeString()}
      </p>
    </div>
  </motion.div>
);