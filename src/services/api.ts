import axios from 'axios';
import { JobSearchParams, JobSearchResponse } from '../types/job';

const API_BASE_URL = 'https://jsearch.p.rapidapi.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'x-rapidapi-host': 'jsearch.p.rapidapi.com',
    'x-rapidapi-key': 'ab1d516817msh74698569341cc3dp121e38jsn5a17cf500d04'
  }
});

export const searchJobs = async (params: JobSearchParams): Promise<JobSearchResponse> => {
  try {
    // Build query parameters
    let endpoint = '/search';
    let queryParams: Record<string, string> = {
      query: params.query,
      page: params.page.toString()
    };
    
    // Add location if provided
    if (params.location) {
      queryParams.location = params.location;
    }
    
    // Add job type if provided
    if (params.jobType) {
      queryParams.employment_type = params.jobType;
    }

    // Add experience level if provided
    if (params.experience) {
      queryParams.experience = params.experience;
    }

    const response = await apiClient.get(endpoint, { params: queryParams });
    return response.data;
  } catch (error) {
    console.error('Error searching jobs:', error);
    throw error;
  }
};

export const fetchJobDetails = async (jobId: string) => {
  try {
    const response = await apiClient.get('/job-details', {
      params: { job_id: jobId }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching job details:', error);
    throw error;
  }
};