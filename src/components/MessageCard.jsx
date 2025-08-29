import React from "react";
import { IoBookmarkOutline, IoBookmarkSharp } from "react-icons/io5";

const MessageCard = ({ message, isInMemory, onTogglePin }) => {
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMessageTypeColor = (type) => {
    if (type === "workspace-note") return "bg-blue-100 text-blue-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border p-3 sm:p-4 ${
        isInMemory ? "ring-2 ring-blue-200 bg-blue-50/50" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          {message.title && (
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
              {message.title}
            </h3>
          )}
          <p className="text-sm sm:text-base text-gray-700 mb-3">
            {message.description}
          </p>
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap mb-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getMessageTypeColor(
                message.type || "workspace-note"
              )}`}
            >
              {message.type || "workspace-note"}
            </span>
            {message.tags &&
              message.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-full text-xs bg-gray-50 text-gray-600 border"
                >
                  {tag}
                </span>
              ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs sm:text-sm text-gray-500">
              <span className="font-medium truncate">{message.author}</span>
              <span className="hidden sm:inline mx-1">•</span>
              <span className="hidden sm:inline">
                {formatTimestamp(message.created_at)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <button
            onClick={() => onTogglePin(message)}
            className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
              isInMemory ? "text-blue-500" : "text-gray-400"
            }`}
            title={isInMemory ? "Remove from memory" : "Pin to memory"}
          >
            {isInMemory ? (
              <IoBookmarkSharp className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <IoBookmarkOutline className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
