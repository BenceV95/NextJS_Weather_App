"use client";

import React, { useState } from "react";

interface SearchProps {
    onSearch: (location: string) => void;
    loading: boolean;
}

const Search: React.FC<SearchProps> = ({ onSearch, loading }) => {
    const [location, setLocation] = useState("");

    const handleSearch = () => {
        const input = location.trim();
        if (input) {
            onSearch(input);
        }
    };

    return (
        <div className="flex items-center gap-2 p-4">
            <input
                type="text"
                placeholder="Enter location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
            />
            <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:cursor-pointer transition"
                disabled={loading}
            >
                {loading ? "Searching..." : "Search"}
            </button>
        </div>
    );
};

export default Search;
