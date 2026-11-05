import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import FilterSection from '../components/FilterSection';
import JobList from '../components/JobList';
import { useJobContext } from '../context/JobContext';

const Home: React.FC = () => {
  const { apiKey, setApiKey } = useJobContext();
  const [keyInput, setKeyInput] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Find Your <span className="text-blue-600">Dream Job</span> Today
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore sample roles, or search live listings with your own API key.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-900 mb-3">
          {apiKey ? 'Live job search is on.' : 'Showing sample jobs. Add your own JSearch RapidAPI key for live results.'}
        </p>
        <form onSubmit={(event) => {
          event.preventDefault();
          setApiKey(keyInput);
          setKeyInput('');
        }} className="flex flex-col sm:flex-row gap-2">
          <label htmlFor="rapid-api-key" className="sr-only">Your JSearch RapidAPI key</label>
          <input
            id="rapid-api-key"
            type="password"
            autoComplete="off"
            placeholder="Your JSearch RapidAPI key"
            value={keyInput}
            onChange={(event) => setKeyInput(event.target.value)}
            className="flex-1 border border-blue-300 rounded-md px-3 py-2"
          />
          <button type="submit" className="bg-blue-600 text-white rounded-md px-4 py-2">Use live jobs</button>
          {apiKey && <button type="button" onClick={() => setApiKey('')} className="border border-blue-300 rounded-md px-4 py-2">Use sample jobs</button>}
        </form>
        <p className="text-xs text-blue-800 mt-2">
          Your key stays in this browser tab and is sent directly to RapidAPI. Browser requests expose it to you and browser extensions.
        </p>
      </div>
      
      <SearchBar />
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/4">
          <FilterSection />
        </div>
        
        <div className="lg:w-3/4">
          <JobList />
        </div>
      </div>
    </div>
  );
};

export default Home;
