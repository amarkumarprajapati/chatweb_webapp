import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { addMessage } from "../../redux/features/chatSlice";
import { API_URL_new } from "../../Endpoints/baseurl";
import axios from "axios";
import { FaBars, FaTimes, FaPlus, FaSignOutAlt, FaPhone, FaEllipsisV, FaPaperPlane } from "react-icons/fa";

// Custom Alert Component
const Alert = ({ message, type, onClose }) => {
  const bgColor = type === "error" ? "bg-[#D99D81]" : "bg-[#FFE8B6]"; // Error: Peach, Success: Light Yellow
  const textColor = "text-[#5B913B]"; // Dark Green for text
  const borderColor = "border-[#77B254]"; // Light Green for border

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${bgColor} ${textColor} ${borderColor} border flex items-center justify-between w-80 animate-fade-in`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-[#5B913B] hover:text-[#77B254]">
        <FaTimes size={16} />
      </button>
    </div>
  );
};

const ChatInterface = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [alert, setAlert] = useState(null); // State for alert
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = io(API_URL_new);
  const phone = localStorage.getItem("phone") || "";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchUsers();

    socket.on("message", (message) => {
      dispatch(addMessage(message));
    });

    socket.on("newUser", (newUser) => {
      setUsers((prevUsers) => {
        if (!prevUsers.some((u) => u._id === newUser._id)) {
          return [...prevUsers, newUser];
        }
        return prevUsers;
      });
    });

    return () => {
      socket.off("message");
      socket.off("newUser");
    };
  }, [dispatch, navigate, socket]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL_new}/api/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(response.data.filter((user) => user.phone !== phone));
    } catch (error) {
      console.error("Error fetching users:", error);
      setAlert({ message: "Failed to fetch users. Please try again.", type: "error" });
    }
  };

  const handleSend = async () => {
    if (!messageText.trim() || !selectedUser) {
      setAlert({ message: "Please type a message and select a user.", type: "error" });
      return;
    }

    const room = [phone, selectedUser._id].sort().join("-");
    const message = {
      text: messageText,
      sender: phone,
      receiver: selectedUser._id,
      room,
    };

    try {
      await axios.post(`${API_URL_new}/api/messages`, message, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      socket.emit("chatMessage", message);
      dispatch(addMessage(message));
      setMessageText("");
      setAlert({ message: "Message sent successfully!", type: "success" });
    } catch (error) {
      console.error("Error sending message:", error);
      setAlert({ message: "Failed to send message. Try again.", type: "error" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("phone");
    navigate("/login");
  };

  const closeAlert = () => setAlert(null);

  return (
    <div className="flex h-screen bg-gray-100 font-sans relative">
      {/* Alert Display */}
      {alert && <Alert message={alert.message} type={alert.type} onClose={closeAlert} />}

      {/* Sidebar Toggle Button for Mobile */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 transition"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Left Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 w-80 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 bg-teal-600 text-white flex items-center justify-between">
          <h2 className="text-lg font-semibold">Chats</h2>
          <div className="flex space-x-3">
            <button className="p-2 hover:bg-teal-700 rounded-full transition">
              <FaPlus size={18} className="text-yellow-300" title="New Chat" />
            </button>
            <button onClick={handleLogout} className="p-2 hover:bg-teal-700 rounded-full transition">
              <FaSignOutAlt size={18} className="text-red-300" title="Logout" />
            </button>
          </div>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className={`p-4 flex items-center cursor-pointer border-b border-gray-200 hover:bg-teal-50 transition ${
                  selectedUser?._id === user._id ? "bg-teal-100" : ""
                }`}
                onClick={() => {
                  setSelectedUser(user);
                  setIsSidebarOpen(false);
                }}
              >
                <div className="w-12 h-12 rounded-full bg-teal-200 flex items-center justify-center text-teal-700 font-semibold mr-3">
                  {user.phone.slice(0, 2)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{user.phone}</p>
                  <p className="text-sm text-gray-500 truncate">Last message preview...</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-4">No chats yet</p>
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-teal-600 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-teal-200 flex items-center justify-center text-teal-700 font-semibold mr-3">
                  {selectedUser.phone.slice(0, 2)}
                </div>
                <h3 className="font-semibold">{selectedUser.phone}</h3>
              </div>
              <div className="flex space-x-3">
                <button className="p-2 hover:bg-teal-700 rounded-full transition">
                  <FaPhone size={18} className="text-green-300" title="Call" />
                </button>
                <button className="p-2 hover:bg-teal-700 rounded-full transition">
                  <FaEllipsisV size={18} className="text-gray-200" title="More" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-100 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat">
              {messages
                .filter(
                  (msg) =>
                    (msg.sender === phone && msg.receiver === selectedUser._id) ||
                    (msg.sender === selectedUser._id && msg.receiver === phone)
                )
                .map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-4 flex ${
                      msg.sender === phone ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg shadow-md ${
                        msg.sender === phone
                          ? "bg-teal-500 text-white"
                          : "bg-white text-gray-800"
                      }`}
                    >
                      {msg.text}
                      <span className="text-xs block mt-1 opacity-70">
                        {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-gray-200 flex items-center space-x-3">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type a message"
                className="flex-1 p-3 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-teal-500 outline-none text-gray-800"
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                className="bg-teal-500 text-white p-3 rounded-full hover:bg-teal-600 transition"
                onClick={handleSend}
              >
                <FaPaperPlane size={18} className="text-white" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-200 text-gray-500">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;