import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { JobProvider } from './context/JobContext';
import Header from './components/Header';
import Home from './pages/Home';
import SavedJobs from './pages/SavedJobs';
import JobDetailsPage from './pages/JobDetailsPage';

function App() {
  return (
    <JobProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/saved" element={<SavedJobs />} />
              <Route path="/job/:jobId" element={<JobDetailsPage />} />
            </Routes>
          </main>
          <footer className="bg-white py-6 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} JobHunt. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </JobProvider>
  );
}

export default App;