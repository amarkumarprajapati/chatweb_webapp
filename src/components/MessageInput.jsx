import React from "react";
import { motion } from "framer-motion";

export const MessageInput = ({ handleSend }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleSend(input);
      setInput("");
    }
  };

  return (
    <motion.form
      className="p-4 bg-white shadow-md"
      onSubmit={handleSubmit}
      initial={{ y: 50 }}
      animate={{ y: 0 }}
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <motion.button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send
        </motion.button>
      </div>
    </motion.form>
  );
};