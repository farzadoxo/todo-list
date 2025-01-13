import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TodoList from "./home/todos";
import Nav from "./components/navBar";
import './mockSetup';
import NotFound from "./components/notFound";
import SignUp from "./components/auth/signUp";
import Login from "./components/auth/login";
import DarkModeToggle from "./components/darkModeToggle";
import TakePicture from "./components/takePicture";
import SelectImage from "./components/selectImage";

function App() {
  const [deviceType, setDeviceType] = useState<"mobile" | "desktop">("mobile");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("userEmail"));
  const [theme, setTheme] = useState<"dark" | "light">(localStorage.getItem("color-theme") as "dark" | "light");
  const [userProfilePicture, setUserProfilePicture] = useState<string>("")

  // Type guard for theme
  const isValidTheme = (theme: string): theme is "dark" | "light" => {
    return theme === "dark" || theme === "light";
  };

  // Effect to apply the theme class on initial load and whenever it changes
  useEffect(() => {
    const savedTheme = localStorage.getItem('color-theme') as "dark" | "light" | null;
    if (savedTheme && isValidTheme(savedTheme)) {
      setTheme(savedTheme);
    }

    const root = document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    localStorage.setItem('color-theme', theme);
  }, [theme]);

  // Effect to update login state based on local storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("userName"));
      const changedTheme = localStorage.getItem("color-theme");
      if (changedTheme && isValidTheme(changedTheme)) {
        setTheme(changedTheme);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Function to determine device type based on window width
  const getDeviceType = () => {
    const width = window.innerWidth;
    setDeviceType(width < 768 ? 'mobile' : 'desktop');
  };

  // Effect to fetch user profile pic
  // TODO: save this on the localStorage and retrive it from backend if it doesnt exist on localStorage
  useEffect(() => {

    setUserProfilePicture("https://github.com/shadcn.png")

  }, [])

  // Effect to handle window resizing
  useEffect(() => {
    getDeviceType();
    window.addEventListener('resize', getDeviceType);

    return () => window.removeEventListener('resize', getDeviceType); // Cleanup
  }, []);

  return (
    <Router>
      <div className="w-full h-full flex flex-row">
        {isLoggedIn && <Nav deviceType={deviceType} avatarImage={userProfilePicture} />}
        <div className="flex-grow">
          <Routes>
            {!isLoggedIn ? (
              <>
                <Route path="sign-up/" element={<SignUp />} />
                <Route path="login/" element={<Login />} />
                <Route path="*" element={<Navigate to="login/" />} />
              </>
            ) : (
              <>
                <Route path="/" element={<TodoList />} />
                <Route path="preference/" element={<DarkModeToggle />} />
                <Route path="selectImage/" element={<SelectImage />} />
                <Route path="takePhoto/" element={<TakePicture />} key={"takePhoto"} />
                <Route path="*" element={<NotFound />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
