import React from 'react';
import { useJobContext } from '../context/JobContext';

const FilterSection: React.FC = () => {
  const { searchParams, updateSearchParams } = useJobContext();

  // Job type options
  const jobTypes = [
    { value: '', label: 'All Types' },
    { value: 'FULLTIME', label: 'Full-time' },
    { value: 'PARTTIME', label: 'Part-time' },
    { value: 'CONTRACTOR', label: 'Contract' },
    { value: 'INTERN', label: 'Internship' }
  ];

  // Experience level options
  const experienceLevels = [
    { value: '', label: 'All Levels' },
    { value: 'ENTRY_LEVEL', label: 'Entry Level' },
    { value: 'MID_LEVEL', label: 'Mid Level' },
    { value: 'SENIOR_LEVEL', label: 'Senior Level' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Filters</h3>
      
      <div className="space-y-4">
        {/* Job Type Filter */}
        <div>
          <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
            Job Type
          </label>
          <select
            id="jobType"
            value={searchParams.jobType}
            onChange={(e) => updateSearchParams({ jobType: e.target.value })}
            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {jobTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Experience Level Filter */}
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
            Experience Level
          </label>
          <select
            id="experience"
            value={searchParams.experience}
            onChange={(e) => updateSearchParams({ experience: e.target.value })}
            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {experienceLevels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;