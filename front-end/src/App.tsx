import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import necessary components from react-router-dom
import NewTask from "./components/newTask";
import TodoList from "./home/todos";
import Nav from "./home/navBar";
import './mockSetup'; // Import the mock setup
import NotFound from "./components/notFound"; // Create a NotFound component for 404 pages

function App() {
  const [deviceType, setDeviceType] = useState<"mobile" | "desktop">("mobile");

  const getDeviceType = () => {
    const width = window.innerWidth;

    if (width < 768) {
      setDeviceType('mobile');
    } else {
      setDeviceType('desktop');
    }
  };

  useEffect(() => {
    getDeviceType(); // Initial check

    const handleResize = () => {
      getDeviceType(); // Update device type on resize
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);

  return (
    <Router>
      <div className="w-full h-full flex flex-row">
        <Nav deviceType={deviceType} />
        <div className="flex-grow"> {/* Allow this div to grow and fill available space */}
          <Routes>
            <Route path="/" element={<TodoList />} /> {/* Default route */}
            <Route path="/new-task" element={<NewTask />} /> {/* New Task route */}
            <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
