import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useJobContext } from '../context/JobContext';

const SearchBar: React.FC = () => {
  const { searchParams, updateSearchParams } = useJobContext();
  const [searchQuery, setSearchQuery] = useState(searchParams.query);
  const [searchLocation, setSearchLocation] = useState(searchParams.location);
  
  // Update local state when context changes
  useEffect(() => {
    setSearchQuery(searchParams.query);
    setSearchLocation(searchParams.location);
  }, [searchParams.query, searchParams.location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams({ 
      query: searchQuery,
      location: searchLocation
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Job title, keywords, or company"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300 flex-shrink-0"
        >
          Search Jobs
        </button>
      </form>
    </div>
  );
};

export default SearchBar;