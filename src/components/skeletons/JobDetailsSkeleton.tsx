import React from 'react';

const JobDetailsSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Header skeleton */}
      <div className="bg-blue-50 p-6 border-b border-blue-100">
        <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
            
            <div>
              <div className="h-7 bg-gray-200 rounded w-64 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-48"></div>
            </div>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0 space-x-2">
            <div className="h-10 bg-gray-200 rounded w-28"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="h-4 bg-gray-200 rounded w-40"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-4 bg-gray-200 rounded w-36"></div>
        </div>
      </div>
      
      {/* Job Content skeleton */}
      <div className="p-6">
        {/* Description skeleton */}
        <div className="mb-6">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
        
        {/* Skills skeleton */}
        <div className="mb-6">
          <div className="h-6 bg-gray-200 rounded w-40 mb-3"></div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 bg-gray-200 rounded-full w-24"></div>
            ))}
          </div>
        </div>
        
        {/* Experience skeleton */}
        <div className="mb-6">
          <div className="h-6 bg-gray-200 rounded w-48 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </div>
        
        {/* Apply button skeleton */}
        <div className="mt-8 text-center">
          <div className="h-12 bg-gray-200 rounded w-48 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-72 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsSkeleton;