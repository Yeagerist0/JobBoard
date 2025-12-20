import React from 'react';

const JobCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 border border-gray-100 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
          <div>
            <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-36"></div>
          </div>
        </div>
        <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
        
        <div className="flex items-center">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        
        <div className="h-6 bg-gray-200 rounded w-20"></div>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
      
      <div className="mt-4">
        <div className="h-5 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  );
};

const JobListSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {[...Array(5)].map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default JobListSkeleton;