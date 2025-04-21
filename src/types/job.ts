export interface Job {
    employer_name: string;
    employer_logo: string | null;
    employer_website: string | null;
    job_id: string;
    job_title: string;
    job_description: string;
    job_country: string;
    job_employment_type: string;
    job_city: string;
    job_state: string;
    job_apply_link: string;
    job_posted_at_datetime_utc: string;
    job_is_remote: boolean;
    job_required_skills?: string[];
    job_required_experience?: {
      no_experience_required?: boolean;
      required_experience_in_months?: number;
      minimum_experience_required?: {
        years?: number;
        months?: number;
      };
    };
    job_salary?: {
      min_salary?: number;
      max_salary?: number;
      currency?: string;
      period?: string;
    };
  }
  
  export interface JobSearchParams {
    query: string;
    location: string;
    jobType: string;
    experience: string;
    page: number;
  }
  
  export interface JobSearchResponse {
    data: Job[];
    status: string;
    total_jobs: number;
    total_pages: number;
    current_page: number;
  }