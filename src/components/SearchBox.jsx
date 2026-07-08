import { Search } from "lucide-react";

const SearchBox = () => {
  return (
    <div className="relative w-full max-w-sm mr-28">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search transactions..."
        className="
          w-full
          pl-11
          pr-4
          py-3
          rounded-xl
          bg-gray-100
          border
          border-transparent
          outline-none
          transition-all
          duration-300
          focus:bg-white
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-100
          placeholder:text-gray-400
        "
      />
    </div>
  );
};

export default SearchBox;