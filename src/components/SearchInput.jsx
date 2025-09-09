import { useState } from "react";

export default function SearchInput({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search products..."
      className="w-full sm:w-1/2 rounded-lg border px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
}
