import type { Job } from '../types/job';

export const demoJobs: Job[] = [
  {
    job_id: 'demo-software-developer',
    employer_name: 'Northstar Labs (demo)',
    employer_logo: null,
    employer_website: null,
    job_title: 'Software Developer',
    job_description: '<p>Build accessible web tools and collaborate with a small engineering team.</p>',
    job_country: 'United States',
    job_city: 'Remote',
    job_state: '',
    job_employment_type: 'FULLTIME',
    job_apply_link: 'https://example.com/',
    job_posted_at_datetime_utc: '',
    job_is_remote: true,
    job_required_skills: ['TypeScript', 'React'],
    job_required_experience: { required_experience_in_months: 24 }
  },
  {
    job_id: 'demo-security-intern',
    employer_name: 'Harbor Security (demo)',
    employer_logo: null,
    employer_website: null,
    job_title: 'Security Engineering Intern',
    job_description: '<p>Help test defensive tooling and document findings.</p>',
    job_country: 'India',
    job_city: 'Bengaluru',
    job_state: 'Karnataka',
    job_employment_type: 'INTERN',
    job_apply_link: 'https://example.com/',
    job_posted_at_datetime_utc: '',
    job_is_remote: false,
    job_required_skills: ['Python', 'Security'],
    job_required_experience: { no_experience_required: true }
  },
  {
    job_id: 'demo-platform-lead',
    employer_name: 'Cedar Systems (demo)',
    employer_logo: null,
    employer_website: null,
    job_title: 'Senior Platform Engineer',
    job_description: '<p>Improve reliability and developer experience for distributed services.</p>',
    job_country: 'United Kingdom',
    job_city: 'London',
    job_state: '',
    job_employment_type: 'FULLTIME',
    job_apply_link: 'https://example.com/',
    job_posted_at_datetime_utc: '',
    job_is_remote: false,
    job_required_skills: ['Go', 'Kubernetes'],
    job_required_experience: { required_experience_in_months: 60 }
  }
];
