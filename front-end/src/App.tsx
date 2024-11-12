import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NewTask from "./components/newTask";
import TodoList from "./home/todos";
import Nav from "./home/navBar";
import './mockSetup'; // Import the mock setup
import NotFound from "./components/notFound";
import SignUp from "./components/auth/signUp";
import { useLoggedInUser } from "./components/hooks/useAuth";
import Login from "./components/auth/login";

function App() {
  const [deviceType, setDeviceType] = useState<"mobile" | "desktop">("mobile");
  const userName = useLoggedInUser()

  const getDeviceType = () => {
    const width = window.innerWidth;

    if (width < 768) {
      setDeviceType('mobile');
    } else {
      setDeviceType('desktop');
    }
  };

  useEffect(() => {
    getDeviceType();

    const handleResize = () => {
      getDeviceType();
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);

  if (!userName) {
    return (
      <Router>
        <div className="w-full h-full flex flex-row">
          <div className="flex-grow">
            <Routes>
              <Route path="sign-up/" element={<SignUp />} />
              <Route path="login/" element={<Login />} />
              <Route path="*" element={<Navigate to="login/" />} />
            </Routes>
          </div>
        </div>
      </Router>
    )


  }

  return (
    <Router>
      <div className="w-full h-full flex flex-row">
        <Nav deviceType={deviceType} />
        <div className="flex-grow"> {/* Allow this div to grow and fill available space */}
          <NewTask />
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="sign-up/" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
