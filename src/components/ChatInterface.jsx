// components/ChatInterface.jsx
import { useState } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserList } from "./UserList";
import { ChatWindow } from "./ChatWindow";

export const ChatInterface = ({ users, messages, phone, handleSend }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex h-screen bg-gray-100">
      <UserList users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      
      <div className="flex-1 flex flex-col">
        <AnimatePresence>
          {selectedUser ? (
            <ChatWindow
              selectedUser={selectedUser}
              messages={messages}
              phone={phone}
              handleSend={handleSend}
            />
          ) : (
            <motion.div
              className="flex-1 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-gray-500">Select a contact to start chatting</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};