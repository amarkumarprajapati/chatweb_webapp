import { AnimatePresence, motion } from "framer-motion";
import { MessageList } from "./MessageList";
import { MessageInput } from "./essageInput";
import React from "react";

const ChatWindow = () => {
  const [appState, setAppState] = useState({
    phone: "",
    otp: "",
    showSplash: true,
    loginSuccess: false,
  });
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const messages = useSelector((state) => state.chat.messages);
  return (
    <div>
      <motion.div
        className="bg-white p-4 shadow-md flex items-center"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
      >
        <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white mr-3">
          {selectedUser.phone[0]}
        </div>
        <h2 className="text-xl font-semibold text-gray-700">
          {selectedUser.phone}
        </h2>
      </motion.div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <MessageList
          messages={messages}
          phone={phone}
          selectedUser={selectedUser}
        />
      </div>

      <MessageInput handleSend={handleSend} />
    </div>
  );
};

export default ChatWindow;
