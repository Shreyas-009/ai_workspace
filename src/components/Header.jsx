import React from "react";
import { IoBookmarkSharp } from "react-icons/io5";

const Header = ({ memoryCount }) => {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            AI Workspace
          </h1>
          <p className="mt-1 text-sm text-gray-600 hidden sm:block">
            Memory-first collaboration
          </p>
        </div>
        <div className="flex items-center">
          <div className="relative">
            <IoBookmarkSharp className="h-6 w-6 text-blue-500" />
            {memoryCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {memoryCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
