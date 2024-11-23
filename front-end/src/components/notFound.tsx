import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center min-h-screen ">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 dark:text-red-400">404</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Oops! The page you are looking for does not exist.</p>
        <p className="mt-2 text-gray-500 dark:text-gray-400">It might have been removed, or the URL might be incorrect.</p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
