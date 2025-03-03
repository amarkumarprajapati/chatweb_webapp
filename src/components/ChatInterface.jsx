import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { addMessage } from "../redux/features/chatSlice";
import { API_URL_new } from "../Endpoints/baseurl";
import axios from "axios";

const ChatInterface = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const messages = useSelector((state) => state.chat.messages);
  const navigate = useNavigate();
  const socket = io(API_URL_new);
  const handleSend = async (messageText) => {
    if (!messageText.trim() || !selectedUser) return;

    const room = [appState.phone, selectedUser._id].sort().join("-");
    const message = {
      text: messageText,
      sender: appState.phone,
      receiver: selectedUser._id,
      room,
    };

    try {
      await axios.post(`${API_URL}/api/messages`, message);
      socket.emit("chatMessage", message);
      dispatch(addMessage(message));
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUsers();
      navigate("/chat");
    } else {
      setTimeout(() => {
        setAppState((p) => ({ ...p, showSplash: false }));
        navigate("/login");
      }, 2000);
    }

    socket.on("message", (message) => {
      dispatch(addMessage(message));
    });

    socket.on("newUser", (newUser) => {
      setUsers((prevUsers) => [...prevUsers, newUser]);
    });

    return () => {
      socket.off("message");
      socket.off("newUser");
    };
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL_new}/api/login`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    
    <div className="flex h-screen">
      {/* Sidebar: User List & Logout */}
      <div className="w-1/3 bg-gray-200 p-4 flex flex-col">
        <h2 className="text-lg font-bold mb-4">Users</h2>

        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className={`p-2 cursor-pointer ${
                selectedUser?._id === user._id
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              } rounded-lg shadow mb-2`}
              onClick={() => setSelectedUser(user)}
            >
              {user.phone}
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No users found. Please invite someone!
          </p>
        )}

        {/* Logout Button */}
        <button
          className="mt-auto bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Chat Window */}
      <div className="flex-1 bg-gray-100 flex flex-col">
        {selectedUser ? (
          <>
            <div className="p-4 bg-blue-600 text-white font-bold">
              Chat with {selectedUser.phone}
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {messages
                .filter(
                  (msg) =>
                    (msg.sender === phone &&
                      msg.receiver === selectedUser._id) ||
                    (msg.sender === selectedUser._id && msg.receiver === phone)
                )
                .map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${
                      msg.sender === phone ? "text-right" : ""
                    }`}
                  >
                    <span className="inline-block px-3 py-2 bg-blue-200 rounded-lg">
                      {msg.text}
                    </span>
                  </div>
                ))}
            </div>
            <div className="p-4 bg-gray-300 flex">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 rounded-l-lg border"
                id="messageInput"
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg"
                onClick={() => {
                  const input = document.getElementById("messageInput");
                  if (input.value.trim()) {
                    handleSend(input.value);
                    input.value = "";
                  }
                }}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
