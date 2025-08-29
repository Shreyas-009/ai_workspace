import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="p-4 bg-white border-b border-gray-100">
      <div className="relative">
        <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search messages and notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>
    </div>
  );
};

export default SearchBar;
