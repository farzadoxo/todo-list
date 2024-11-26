import React, { useEffect, useState } from 'react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

const DarkModeToggle: React.FC = () => {
  const [theme, setTheme] = useState<"dark" | "light">(localStorage.getItem("color-theme") as "dark" | "light");
  //TODO: theme preference should presists across logins

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
    <div className='flex flex-col space-y-8 border border-gray-300 dark:border-gray-900 bg-gray-300 shadow-lg dark:shadow-md dark:shadow-sky-900 dark:bg-gray-900 rounded-lg p-3 m-16'>

      <h2 className="text-xl font-bold text-gray-800 dark:text-white">User settings</h2>
      <div className="flex items-center space-x-2 ">
        <Label htmlFor="dark-mode">Dark Mode</Label>
        <Switch id="dark-mode" className='data-[state=unchecked]:bg-gray-500 data-[state=checked]:bg-blue-800' checked={theme === "dark"} onClick={toggleDarkMode} />
      </div>
    </div>
  );
};

export default DarkModeToggle;
