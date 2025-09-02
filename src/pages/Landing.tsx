import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to My App</h1>
      <p className="mb-6">Track your budgets, goals, and transactions easily!</p>
      <div className="flex gap-4">
        <Link to="/signup" className="px-4 py-2 bg-blue-500 text-white rounded">Sign Up</Link>
        <Link to="/login" className="px-4 py-2 border border-blue-500 rounded">Login</Link>
      </div>
    </div>
  );
};

export default LandingPage;
