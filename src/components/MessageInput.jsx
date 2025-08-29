import React from "react";
import { IoPaperPlaneOutline } from "react-icons/io5";

const MessageInput = ({
  newMessage,
  setNewMessage,
  onSendMessage,
  onKeyPress,
}) => {
  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={onKeyPress}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <button
          onClick={onSendMessage}
          disabled={!newMessage.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-1 sm:gap-2 transition-colors"
        >
          <IoPaperPlaneOutline className="h-4 w-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
