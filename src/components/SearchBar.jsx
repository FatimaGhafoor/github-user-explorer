import { useState } from "react";
import "./SearchBar.css";

export const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!input.trim()) {
      alert("Enter your search");
      return;
    }

    onSearch(input.trim());
    setInput("");
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        placeholder="Enter Github Username"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-btn">
        Search
      </button>
    </form>
  );
};
