'use client'
import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchBox = () => {
  return (
    <div>
      <form
        className="relative flex items-center justify-center h-10"
      >
        <input
          onChange={(e) => console.log(e.target.value)}
        //   value='value'
          type="text"
          placeholder="Search..."
          className="px-4 py-2 w-[230px] dark:bg-transparent dark:border-gray-600 border-gray-300 h-10 focus:outline-none border rounded-l-md  focus:border-blue-500"
        
        />

        <button className="px-4 py-2 h-full bg-blue-500 dark:bg-blue-900 text-white rounded-r-md  focus-outline-none hover:bg-blue-600">
          <IoSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
