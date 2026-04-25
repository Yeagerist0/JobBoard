import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from '../utils/dateUtils';
import { Bookmark, Clock, MapPin, Building } from 'lucide-react';
import { Job } from '../types/job';
import { useJobContext } from '../context/JobContext';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { toggleSaveJob, isJobSaved } = useJobContext();
  const saved = isJobSaved(job.job_id);
  
  // Format job posted date
  const postedDate = job.job_posted_at_datetime_utc
    ? formatDistanceToNow(new Date(job.job_posted_at_datetime_utc))
    : 'Recently';
  
  // Default logo if none is provided
  const logoUrl = job.employer_logo || "https://via.placeholder.com/100?text=Logo";
  
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
              <img 
                src={logoUrl} 
                alt={`${job.employer_name} logo`} 
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/100?text=Logo";
                }}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                {job.job_title}
              </h3>
              <div className="flex items-center mt-1">
                <Building className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-600">{job.employer_name}</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSaveJob(job.job_id);
            }}
            className="text-gray-400 hover:text-blue-600 focus:outline-none transition-colors"
            aria-label={saved ? "Unsave this job" : "Save this job"}
          >
            <Bookmark 
              className={`h-5 w-5 ${saved ? 'fill-blue-600 text-blue-600' : 'text-gray-400'}`} 
            />
          </button>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{job.job_city || job.job_country || 'Location not specified'}</span>
            {job.job_is_remote && (
              <span className="ml-2 text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                Remote
              </span>
            )}
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>Posted {postedDate}</span>
          </div>
          
          <div className="text-sm">
            <span 
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium 
              ${job.job_employment_type?.toLowerCase().includes('full') 
                ? 'bg-green-100 text-green-800' 
                : job.job_employment_type?.toLowerCase().includes('part') 
                  ? 'bg-blue-100 text-blue-800' 
                  : job.job_employment_type?.toLowerCase().includes('contract') 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-gray-100 text-gray-800'}`}
            >
              {job.job_employment_type || 'Not specified'}
            </span>
          </div>
        </div>
        
        <p className="mt-4 text-sm text-gray-600 line-clamp-3">
          {job.job_description?.length > 200 
            ? `${job.job_description.substring(0, 200)}...` 
            : job.job_description || 'No description provided'}
        </p>
        
        <Link 
          to={`/job/${job.job_id}`}
          className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;