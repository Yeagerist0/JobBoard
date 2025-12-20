import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, Building, MapPin, Calendar, ExternalLink, Briefcase } from 'lucide-react';
import { fetchJobDetails } from '../services/api';
import { formatDistanceToNow } from '../utils/dateUtils';
import { useJobContext } from '../context/JobContext';
import JobDetailsSkeleton from './skeletons/JobDetailsSkeleton';

const JobDetails: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toggleSaveJob, isJobSaved } = useJobContext();
  
  useEffect(() => {
    const getJobDetails = async () => {
      if (!jobId) return;
      
      setLoading(true);
      try {
        const response = await fetchJobDetails(jobId);
        setJobDetails(response.data[0]);
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Failed to load job details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    getJobDetails();
  }, [jobId]);
  
  if (loading) {
    return <JobDetailsSkeleton />;
  }
  
  if (error || !jobDetails) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="text-center py-10">
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            {error || 'Job not found'}
          </h3>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }
  
  const job = jobDetails;
  const saved = isJobSaved(job.job_id);
  const postedDate = job.job_posted_at_datetime_utc
    ? formatDistanceToNow(new Date(job.job_posted_at_datetime_utc))
    : 'Recently';
  
  // Default logo if none is provided
  const logoUrl = job.employer_logo || "https://via.placeholder.com/100?text=Logo";
  
  // Process job description to properly render HTML
  const createMarkup = (html: string) => {
    return { __html: html };
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-blue-50 p-6 border-b border-blue-100">
        <button 
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to jobs
        </button>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-white rounded-md p-2 shadow-sm flex items-center justify-center overflow-hidden">
              <img 
                src={logoUrl} 
                alt={`${job.employer_name} logo`} 
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/100?text=Logo";
                }}
              />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{job.job_title}</h1>
              <div className="flex items-center mt-1">
                <Building className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-gray-700 font-medium">{job.employer_name}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0 space-x-2">
            <button
              onClick={() => toggleSaveJob(job.job_id)}
              className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                saved 
                  ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Bookmark className={`mr-2 h-4 w-4 ${saved ? 'fill-blue-500 text-blue-500' : ''}`} />
              {saved ? 'Saved' : 'Save Job'}
            </button>
            
            <a 
              href={job.job_apply_link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Apply Now
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span>
              {[job.job_city, job.job_state, job.job_country]
                .filter(Boolean)
                .join(', ') || 'Location not specified'}
            </span>
            {job.job_is_remote && (
              <span className="ml-2 text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                Remote
              </span>
            )}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Briefcase className="h-4 w-4 mr-1" />
            <span>{job.job_employment_type || 'Not specified'}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Posted {postedDate}</span>
          </div>
        </div>
      </div>
      
      {/* Job Content */}
      <div className="p-6">
        {/* Salary Information */}
        {job.job_salary && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Salary Information</h3>
            <div className="text-gray-700">
              {job.job_salary.min_salary && job.job_salary.max_salary ? (
                <p>
                  {job.job_salary.currency || '$'}{job.job_salary.min_salary.toLocaleString()} - 
                  {job.job_salary.currency || '$'}{job.job_salary.max_salary.toLocaleString()}
                  {job.job_salary.period ? ` per ${job.job_salary.period.toLowerCase()}` : ''}
                </p>
              ) : (
                <p>Salary information is not fully available</p>
              )}
            </div>
          </div>
        )}
        
        {/* Job Description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Description</h2>
          <div 
            className="prose prose-blue max-w-none text-gray-700" 
            dangerouslySetInnerHTML={createMarkup(job.job_description || 'No description provided')}
          />
        </div>
        
        {/* Required Skills */}
        {job.job_required_skills && job.job_required_skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.job_required_skills.map((skill: string, index: number) => (
                <span 
                  key={index}
                  className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Required Experience */}
        {job.job_required_experience && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Required Experience</h3>
            <div className="text-gray-700">
              {job.job_required_experience.no_experience_required ? (
                <p>No experience required</p>
              ) : job.job_required_experience.required_experience_in_months ? (
                <p>{Math.round(job.job_required_experience.required_experience_in_months / 12)} years experience required</p>
              ) : job.job_required_experience.minimum_experience_required ? (
                <p>
                  {job.job_required_experience.minimum_experience_required.years || 0} years 
                  {job.job_required_experience.minimum_experience_required.months ? 
                    ` and ${job.job_required_experience.minimum_experience_required.months} months` : ''} 
                  experience required
                </p>
              ) : (
                <p>Experience requirements not specified</p>
              )}
            </div>
          </div>
        )}
        
        {/* Apply Button */}
        <div className="mt-8 text-center">
          <a 
            href={job.job_apply_link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
          >
            Apply for this position
            <ExternalLink className="ml-2 h-5 w-5" />
          </a>
          <p className="text-sm text-gray-500 mt-2">
            You'll be redirected to the employer's website to complete your application
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;