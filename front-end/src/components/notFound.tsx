import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-lg text-gray-600">Oops! The page you are looking for does not exist.</p>
        <p className="mt-2 text-gray-500">It might have been removed, or the URL might be incorrect.</p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200"
        >
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
