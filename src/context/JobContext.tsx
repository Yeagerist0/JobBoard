import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Job, JobSearchParams } from '../types/job';
import { searchJobs } from '../services/api';

interface JobContextType {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  searchParams: JobSearchParams;
  totalJobs: number;
  currentPage: number;
  totalPages: number;
  updateSearchParams: (params: Partial<JobSearchParams>) => void;
  fetchMoreJobs: () => void;
  savedJobs: string[];
  toggleSaveJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;
}

const defaultSearchParams: JobSearchParams = {
  query: 'Software Developer',
  location: '',
  jobType: '',
  experience: '',
  page: 1
};

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<JobSearchParams>(() => {
    // Load saved search params from localStorage if available
    const savedParams = localStorage.getItem('jobSearchParams');
    return savedParams ? JSON.parse(savedParams) : defaultSearchParams;
  });
  const [totalJobs, setTotalJobs] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [savedJobs, setSavedJobs] = useState<string[]>(() => {
    const saved = localStorage.getItem('savedJobs');
    return saved ? JSON.parse(saved) : [];
  });

  // Save params to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('jobSearchParams', JSON.stringify(searchParams));
  }, [searchParams]);

  // Save bookmarked jobs to localStorage
  useEffect(() => {
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  const fetchJobs = async (resetJobs = true) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await searchJobs(searchParams);
      
      if (resetJobs) {
        setJobs(response.data);
      } else {
        setJobs(prevJobs => [...prevJobs, ...response.data]);
      }
      
      setTotalJobs(response.total_jobs);
      setCurrentPage(response.current_page);
      setTotalPages(response.total_pages);
    } catch (err) {
      setError('Failed to fetch jobs. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and when search params change
  useEffect(() => {
    fetchJobs();
  }, [searchParams.query, searchParams.location, searchParams.jobType, searchParams.experience]);

  const updateSearchParams = (params: Partial<JobSearchParams>) => {
    setSearchParams(prev => ({
      ...prev,
      ...params,
      // Reset page to 1 when search criteria changes
      page: params.query !== undefined || 
            params.location !== undefined || 
            params.jobType !== undefined || 
            params.experience !== undefined ? 1 : prev.page
    }));
  };

  const fetchMoreJobs = () => {
    if (currentPage < totalPages && !loading) {
      updateSearchParams({ page: searchParams.page + 1 });
      fetchJobs(false);
    }
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => {
      if (prev.includes(jobId)) {
        return prev.filter(id => id !== jobId);
      } else {
        return [...prev, jobId];
      }
    });
  };

  const isJobSaved = (jobId: string) => {
    return savedJobs.includes(jobId);
  };

  return (
    <JobContext.Provider value={{
      jobs,
      loading,
      error,
      searchParams,
      totalJobs,
      currentPage,
      totalPages,
      updateSearchParams,
      fetchMoreJobs,
      savedJobs,
      toggleSaveJob,
      isJobSaved
    }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = (): JobContextType => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobContext must be used within a JobProvider');
  }
  return context;
};