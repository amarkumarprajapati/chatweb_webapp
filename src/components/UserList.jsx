import React from "react";
import { motion } from "framer-motion";

export const UserList = ({ users, selectedUser, setSelectedUser }) => (
  <motion.div
    className="w-1/4 bg-white shadow-lg p-4 overflow-y-auto"
    initial={{ x: -300 }}
    animate={{ x: 0 }}
  >
    <h2 className="text-xl font-bold mb-4 text-gray-700">Contacts</h2>
    {users.map((user) => (
      <motion.div
        key={user._id}
        onClick={() => setSelectedUser(user)}
        className={`p-3 mb-2 rounded-lg cursor-pointer transition-colors ${
          selectedUser?._id === user._id
            ? "bg-blue-100"
            : "hover:bg-gray-50"
        }`}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center">
          <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-3">
            {user.phone[0]}
          </div>
          <span className="text-gray-600">{user.phone}</span>
        </div>
      </motion.div>
    ))}
  </motion.div>
);