import axios from 'axios';
import { Job, JobSearchParams, JobSearchResponse } from '../types/job';
import { demoJobs } from '../data/demoJobs';

const API_BASE_URL = 'https://jsearch.p.rapidapi.com';

const apiClient = axios.create({ baseURL: API_BASE_URL });

const liveHeaders = (apiKey: string) => ({
  'x-rapidapi-host': 'jsearch.p.rapidapi.com',
  'x-rapidapi-key': apiKey
});

const searchDemoJobs = (params: JobSearchParams): JobSearchResponse => {
  const query = params.query.trim().toLowerCase();
  const location = params.location.trim().toLowerCase();
  const results = demoJobs.filter((job) => {
    const months = job.job_required_experience?.required_experience_in_months ?? 0;
    const experienceMatches = !params.experience ||
      (params.experience === 'ENTRY_LEVEL' && months < 24) ||
      (params.experience === 'MID_LEVEL' && months >= 24 && months < 60) ||
      (params.experience === 'SENIOR_LEVEL' && months >= 60);
    return (!query || `${job.job_title} ${job.employer_name} ${job.job_description}`.toLowerCase().includes(query)) &&
      (!location || `${job.job_city} ${job.job_state} ${job.job_country}`.toLowerCase().includes(location)) &&
      (!params.jobType || job.job_employment_type === params.jobType) && experienceMatches;
  });
  const pageSize = 10;
  const page = Math.max(1, params.page);
  return {
    data: results.slice((page - 1) * pageSize, page * pageSize),
    status: 'success',
    total_jobs: results.length,
    total_pages: Math.max(1, Math.ceil(results.length / pageSize)),
    current_page: page
  };
};

export const searchJobs = async (params: JobSearchParams, apiKey: string): Promise<JobSearchResponse> => {
  if (!apiKey) return searchDemoJobs(params);

    // Build query parameters
    const queryParams: Record<string, string> = {
      query: params.query || 'jobs',
      page: params.page.toString()
    };
    
    // Add location if provided
    if (params.location) {
      queryParams.location = params.location;
    }
    
    // Add job type if provided
    if (params.jobType) {
      queryParams.employment_types = params.jobType;
    }

    // Add experience level if provided
    if (params.experience === 'ENTRY_LEVEL') {
      queryParams.job_requirements = 'under_3_years_experience';
    } else if (params.experience === 'SENIOR_LEVEL') {
      queryParams.job_requirements = 'more_than_3_years_experience';
    }

    const response = await apiClient.get('/search', { params: queryParams, headers: liveHeaders(apiKey) });
    if (response.data.status === 'ERROR') throw new Error('JSearch returned an error');
    const payload = response.data.data;
    const jobs: Job[] = Array.isArray(payload) ? payload : Array.isArray(payload?.jobs) ? payload.jobs : [];
    return {
      data: jobs,
      status: response.data.status,
      total_jobs: jobs.length,
      total_pages: params.page,
      current_page: params.page
    };
};

export const fetchJobDetails = async (jobId: string, apiKey: string): Promise<{ data: Job[] }> => {
  if (!apiKey) return { data: demoJobs.filter((job) => job.job_id === jobId) };

  const response = await apiClient.get('/job-details', {
    params: { job_id: jobId },
    headers: liveHeaders(apiKey)
  });
  const payload = response.data.data;
  return { data: Array.isArray(payload) ? payload : payload?.jobs || [] };
};
