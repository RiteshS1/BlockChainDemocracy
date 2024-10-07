// src/components/SearchBar.tsx
import React from 'react';

// Define the props type
interface SearchBarProps {
  query: string;                      // Type for the search query
  onSearch: (query: string) => void; // Function type for the search handler
}

const SearchBar = ({ query, onSearch }: SearchBarProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value); // Call onSearch with the input value
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="border rounded-lg p-2"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
