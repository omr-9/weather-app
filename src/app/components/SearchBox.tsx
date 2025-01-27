
import { cn } from "@/lib/cn";
import React from "react";
import { IoSearch } from "react-icons/io5";

type Props = {
  className?: string;
  value: string;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
};
const SearchBox = (props: Props) => {
  return (
    <form
      onSubmit={props.onSubmit}
      className="relative flex items-center justify-center h-10"
    >
      <input
        onChange={props.onChange}
        value={props.value}
        type="text"
        placeholder="Search..."
        className={cn(
          "px-4 py-2 w-[230px] dark:bg-transparent dark:border-gray-600 border-gray-300 h-10 focus:outline-none border rounded-l-md  focus:border-blue-500",
          props.className
        )}
      />

      <button className="px-4 py-2 h-full bg-blue-500 dark:bg-blue-900 text-white rounded-r-md  focus-outline-none hover:bg-blue-600">
        <IoSearch />
      </button>
    </form>
  );
};

export default SearchBox;