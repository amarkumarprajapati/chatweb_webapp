import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

import { API_URL } from "../Endpoints/baseurl";
import { addMessage } from "../redux/features/chatSlice";

const Chats2 = () => {
  const [input, setInput] = useState("");
  const [lastMessageId, setLastMessageId] = useState(0);
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();
  const currentSender = "User1";

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = { text: input, sender: currentSender };
      try {
        const response = await axios.post(`${API_URL}/messages`, newMessage);
        const serverMessage = response.data;
        dispatch(addMessage(serverMessage));
        setLastMessageId(serverMessage.id);
        setInput("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const fetchNewMessages = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/messages?since=${lastMessageId}`
      );
      const newMessages = response.data;
      if (newMessages.length > 0) {
        newMessages.forEach((message) => {
          dispatch(addMessage(message));
        });
        setLastMessageId(newMessages[newMessages.length - 1].id);
      }
      fetchNewMessages();
    } catch (error) {
      console.error("Error fetching messages:", error);
      setTimeout(() => {
        fetchNewMessages();
      }, 1000);
    }
  };

  useEffect(() => {
    fetchNewMessages();
  }, []);

  const messageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <motion.div
        className="bg-gray-200 p-4"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold">Modern Chat</h2>
      </motion.div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`flex ${
                message.sender === currentSender
                  ? "justify-end"
                  : "justify-start"
              } mb-2`}
              variants={messageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div
                className={`max-w-xs p-2 rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl rounded-br-2xl ${
                  message.sender === currentSender
                    ? "bg-blue-500 text-white rounded-tl-none"
                    : "bg-gray-200 rounded-tr-none"
                }`}
              >
                {message.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Chat Input */}
      <motion.form
        className="flex p-4"
        onSubmit={handleSend}
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <motion.button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Chats2;
