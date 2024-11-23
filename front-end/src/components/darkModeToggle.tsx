import React, { useEffect, useState } from 'react';

const DarkModeToggle: React.FC = () => {
  const [theme, setTheme] = useState<"dark" | "light">(localStorage.getItem("color-theme") as "dark" | "light");

  // Load dark mode preference from local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('color-theme') as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      localStorage.setItem('color-theme', newTheme); // Update local storage here
      return newTheme;
    });
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center p-2 bg-gray-200 dark:bg-gray-700 rounded-md transition-colors duration-300"
    >
      <span className="mr-2">{theme === "light" ? '🌙' : '☀️'}</span>
      <span>{theme === "light" ? 'Dark Mode' : 'Light Mode'}</span>
    </button>
  );
};

export default DarkModeToggle;
