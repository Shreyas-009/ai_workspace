import React from "react";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";

const MemoryPanel = ({ memoryItems, onTogglePin }) => {

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
    <div className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col max-h-96 lg:max-h-none">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Memory Panel</h2>
          {memoryItems.length > 0 && (
            <span className="bg-blue-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
              {memoryItems.length}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-600">Pinned messages & notes</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {memoryItems.length === 0 ? (
          <div className="text-center py-8">
            <IoBookmarkOutline className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-1">
              No items in memory yet. Pin messages to save them here.
            </p>
            <p className="text-xs text-gray-500">
              Click the bookmark icon on any message to pin it
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {memoryItems.map((item) => (
              <div
                key={`memory-${item.id}`}
                className="bg-blue-50 border border-blue-100 rounded-lg p-3"
              >
                {item.title && (
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h4>
                )}
                <p className="text-sm text-gray-700 mb-2 line-clamp-3 ">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getMessageTypeColor(
                        item.type || "workspace-note"
                      )}`}
                    >
                      {item.type || "workspace-note"}
                    </span>
                    {item.tags &&
                      item.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-full text-xs bg-white text-gray-600 border"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                  <button
                    onClick={() => onTogglePin(item)}
                    className="p-1 text-blue-500 hover:text-red-500 transition-colors"
                    title="Remove from memory"
                  >
                    <IoBookmark className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Pinned {formatTimestamp(item.pinnedAt || item.created_at)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryPanel;
