import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import io from "socket.io-client";
import axios from "axios";
import { API_URL } from "../Endpoints/baseurl";
import { addMessage } from "../redux/features/chatSlice";

const socket = io(API_URL);

const Chats2 = () => {
  const [input, setInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      fetchUsers();
    }

    socket.on("message", (message) => {
      dispatch(addMessage(message));
    });

    return () => socket.off("message");
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/login`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/login`, { phone, otp });
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      fetchUsers();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() && selectedUser) {
      const room = [phone, selectedUser._id].sort().join("-");
      const message = { text: input, sender: phone, receiver: selectedUser._id, room };
  
      try {
        await axios.post(`${API_URL}/api/messages`, message);
        socket.emit("chatMessage", message);
        dispatch(addMessage(message)); // Update Redux store
        setInput("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
  

  if (!isAuthenticated) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="bg-white p-8 rounded-xl shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="w-full p-3 mb-4 border rounded-lg"
            />
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP"
              className="w-full p-3 mb-4 border rounded-lg"
            />
            <motion.button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              Verify OTP
            </motion.button>
          </form>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* User List */}
      <motion.div
        className="w-1/4 bg-white shadow-lg p-4"
        initial={{ x: -300 }}
        animate={{ x: 0 }}
      >
        <h2 className="text-xl font-bold mb-4">Contacts</h2>
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`p-3 mb-2 rounded-lg cursor-pointer ${
              selectedUser?._id === user._id ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
          >
            {user.phone}
          </div>
        ))}
      </motion.div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <motion.div className="bg-white p-4 shadow-md">
              <h2 className="text-xl font-semibold">
                Chat with {selectedUser.phone}
              </h2>
            </motion.div>
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <AnimatePresence>
                {messages
                  .filter(
                    (msg) =>
                      msg.room === [phone, selectedUser._id].sort().join("-")
                  )
                  .map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${
                        message.sender === phone
                          ? "justify-end"
                          : "justify-start"
                      } mb-4`}
                      variants={{
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 },
                      }}
                      initial="initial"
                      animate="animate"
                    >
                      <div
                        className={`max-w-md p-4 rounded-2xl shadow-md ${
                          message.sender === phone
                            ? "bg-blue-500 text-white"
                            : "bg-white"
                        }`}
                      >
                        {message.text}
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
            <motion.form
              className="p-4 bg-white shadow-md"
              onSubmit={handleSend}
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
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  Send
                </motion.button>
              </div>
            </motion.form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats2;