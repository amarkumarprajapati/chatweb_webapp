import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { addMessage } from "../redux/features/chatSlice";
import { API_URL_new } from "../Endpoints/baseurl";
import axios from "axios";

const ChatInterface = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageText, setMessageText] = useState("");
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = io(API_URL_new);

  // Fetch current user's phone from token or localStorage (assuming it's stored)
  const phone = localStorage.getItem("phone") || ""; // Adjust based on how you store it

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
      setUsers(response.data.filter((user) => user.phone !== phone)); // Exclude current user
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSend = async () => {
    if (!messageText.trim() || !selectedUser) return;

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
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("phone"); // Clear phone if stored
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar: User List */}
      <div className="w-1/3 bg-white shadow-lg flex flex-col border-r border-gray-200">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <h2 className="text-xl font-bold">Chat Users</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedUser?._id === user._id
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 font-semibold mr-3">
                  {user.phone.slice(0, 2)}
                </div>
                <span className="font-medium">{user.phone}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-4">
              No users available. Invite someone to chat!
            </p>
          )}
        </div>
        <button
          className="m-4 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md">
              Chatting with {selectedUser.phone}
            </div>
            <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
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
                      className={`max-w-xs p-3 rounded-lg shadow ${
                        msg.sender === phone
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-800"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
            </div>
            <div className="p-4 bg-white border-t border-gray-200 flex items-center">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-3 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-all duration-200"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-500">
            <p>Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;