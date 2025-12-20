import React, { useEffect, useRef, useCallback } from 'react';
import JobCard from './JobCard';
import { useJobContext } from '../context/JobContext';
import JobListSkeleton from './skeletons/JobListSkeleton';

interface JobListProps {
  showSavedOnly?: boolean;
}

const JobList: React.FC<JobListProps> = ({ showSavedOnly = false }) => {
  const { 
    jobs, 
    loading, 
    error, 
    totalJobs, 
    currentPage, 
    totalPages, 
    fetchMoreJobs,
    savedJobs
  } = useJobContext();
  
  const observer = useRef<IntersectionObserver | null>(null);
  const lastJobElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && currentPage < totalPages) {
          fetchMoreJobs();
        }
      });
      
      if (node) observer.current.observe(node);
    },
    [loading, currentPage, totalPages, fetchMoreJobs]
  );

  // Filter jobs to show only saved ones if needed
  const displayedJobs = showSavedOnly
    ? jobs.filter(job => savedJobs.includes(job.job_id))
    : jobs;

  // Show message if no jobs match the saved filter
  if (showSavedOnly && displayedJobs.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium text-gray-700 mb-2">No saved jobs yet</h3>
        <p className="text-gray-500">
          Bookmark jobs you're interested in to revisit them later
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9v4h2V9H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {!showSavedOnly && (
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {loading && displayedJobs.length === 0 
              ? 'Searching jobs...' 
              : `${totalJobs} Jobs Found`}
          </h2>
        </div>
      )}
      
      {/* Show skeleton loaders if initial loading */}
      {loading && displayedJobs.length === 0 ? (
        <JobListSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {displayedJobs.map((job, index) => {
            if (index === displayedJobs.length - 1) {
              return (
                <div ref={lastJobElementRef} key={job.job_id}>
                  <JobCard job={job} />
                </div>
              );
            } else {
              return <JobCard key={job.job_id} job={job} />;
            }
          })}
        </div>
      )}
      
      {/* Loading indicator for pagination */}
      {loading && displayedJobs.length > 0 && (
        <div className="text-center py-4">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2 text-gray-600">Loading more jobs...</p>
        </div>
      )}
      
      {/* No more jobs */}
      {!loading && currentPage >= totalPages && displayedJobs.length > 0 && (
        <div className="text-center py-4 text-gray-500">
          No more jobs to load
        </div>
      )}
    </div>
  );
};

export default JobList;