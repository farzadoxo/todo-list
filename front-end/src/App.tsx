import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TodoList from "./home/todos";
import Nav from "./components/navBar";
import './mockSetup';
import NotFound from "./components/notFound";
import SignUp from "./components/auth/signUp";
import Login from "./components/auth/login";

function App() {
  const [deviceType, setDeviceType] = useState<"mobile" | "desktop">("mobile");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("userName"));

  // Effect to update login state based on local storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("userName"));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Function to determine device type based on window width
  const getDeviceType = () => {
    const width = window.innerWidth;
    setDeviceType(width < 768 ? 'mobile' : 'desktop');
  };

  // Effect to handle window resizing
  useEffect(() => {
    getDeviceType();
    window.addEventListener('resize', getDeviceType);

    return () => window.removeEventListener('resize', getDeviceType); // Cleanup
  }, []);

  return (
    <Router>
      <div className="w-full h-full flex flex-row">
        {isLoggedIn && <Nav deviceType={deviceType} />}
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
