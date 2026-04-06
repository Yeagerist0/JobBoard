# 🎯 JobHunt - Modern Job Board Platform

<div align="center">

![JobHunt Banner](https://via.placeholder.com/1200x600/4361ee/ffffff?text=JobHunt+-+Find+Your+Dream+Job)

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**A modern job board application built with React, TypeScript, and Supabase, featuring real-time updates and powerful search capabilities.**

[View Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

## ✨ Features

- 🔍 **Advanced Job Search** - Filter by job type, experience level, and location
- 💼 **Job Listings Management** - Post, edit, and manage job listings with ease
- 👤 **User Profiles** - Complete profiles for both job seekers and employers
- 🔔 **Real-time Updates** - Instant notifications for new job postings and applications
- 💾 **Saved Jobs** - Bookmark interesting positions for later review
- 📱 **Responsive Design** - Perfect experience across all devices
- 🌙 **Dark Mode** - Easy on the eyes with automatic theme switching
- 🔒 **Secure Authentication** - Protected routes and data with Supabase Auth

## 📸 Screenshots

<div align="center">
  <img src="https://via.placeholder.com/800x450/4361ee/ffffff?text=Job+Search+Homepage" alt="Homepage" width="800px" />
  <p><em>Homepage with search functionality and featured jobs</em></p>
  
  <br />
  
  <div>
    <img src="https://via.placeholder.com/400x300/4361ee/ffffff?text=Job+Listing" alt="Job Listing" width="400px" />
    <img src="https://via.placeholder.com/400x300/4361ee/ffffff?text=Application+Form" alt="Application Form" width="400px" />
  </div>
  <p><em>Detailed job listings and easy application process</em></p>
  
  <br />
  
  <div>
    <img src="https://via.placeholder.com/400x300/4361ee/ffffff?text=Employer+Dashboard" alt="Employer Dashboard" width="400px" />
    <img src="https://via.placeholder.com/400x300/4361ee/ffffff?text=Candidate+Profile" alt="Candidate Profile" width="400px" />
  </div>
  <p><em>Powerful dashboards for employers and job seekers</em></p>
</div>

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account for database and authentication

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/yourusername/jobhunt.git
   ```

2. Navigate to the project directory
   ```sh
   cd jobhunt
   ```

3. Install dependencies
   ```sh
   npm install
   ```

4. Set up environment variables
   ```sh
   cp .env.example .env
   ```
   Add your Supabase credentials to the `.env` file

5. Start the development server
   ```sh
   npm run dev
   ```

## 💻 Core Functionality

### For Job Seekers

- **Profile Creation**: Build comprehensive profiles highlighting skills and experience
- **Job Search**: Advanced filters for precise job matching
- **Application Tracking**: Monitor application status in real-time
- **Job Alerts**: Customizable notifications for relevant positions
- **Resume Upload**: Support for multiple resume formats

### For Employers

- **Job Posting**: Easy-to-use interface for creating detailed job listings
- **Candidate Management**: Review and manage applications efficiently
- **Company Profiles**: Showcase your company culture and benefits
- **Analytics Dashboard**: Track listing performance and applicant metrics
- **Applicant Communication**: Built-in messaging system

## 🛠️ Technical Implementation

### Frontend Architecture

- **React Components**: Modular design for reusability and maintenance
- **TypeScript**: Strong typing for enhanced development experience
- **Tailwind CSS**: Utility-first styling for consistent design
- **React Query**: Efficient data fetching and caching
- **React Hook Form**: Form validation and handling

### Backend Services

- **Supabase Authentication**: Secure user management
- **Supabase Database**: Real-time data synchronization
- **Storage**: Efficient handling of resumes and company logos
- **Row Level Security**: Granular access control
- **Full-text Search**: Powerful job listing search capability

## 📊 Database Schema

```sql
Table jobs {
  id uuid [pk]
  title text
  company_id uuid [ref: > companies.id]
  description text
  requirements text[]
  salary_range jsonb
  location text
  job_type text
  experience_level text
  created_at timestamptz
}

Table companies {
  id uuid [pk]
  name text
  description text
  logo_url text
  website text
  created_at timestamptz
}

Table applications {
  id uuid [pk]
  job_id uuid [ref: > jobs.id]
  user_id uuid
  status text
  resume_url text
  created_at timestamptz
}
```

## 🔧 Configuration

### Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup

1. Create a new Supabase project
2. Enable authentication providers
3. Set up database tables and RLS policies
4. Configure storage buckets for resumes and logos

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- [React](https://reactjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/yourusername">Your Name</a></p>
  <p>
    <a href="https://twitter.com/yourusername">
      <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" />
    </a>
    <a href="https://linkedin.com/in/yourusername">
      <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
    </a>
  </p>
</div>
