import React from 'react';
import SearchBar from '../components/SearchBar';
import FilterSection from '../components/FilterSection';
import JobList from '../components/JobList';

const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Find Your <span className="text-blue-600">Dream Job</span> Today
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Browse thousands of job listings to find the perfect match for your skills and career goals
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