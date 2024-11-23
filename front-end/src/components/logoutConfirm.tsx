import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoutConfirmProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutConfirm: React.FC<LogoutConfirmProps> = ({ isOpen, onClose }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userName"); // Clear user session
    navigate('/login'); // Redirect to login page
    location.reload(); // Reload the page
  };


  // return null if isOpen is false
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded shadow-lg p-6 z-10">
        <h2 className="text-lg font-bold">Logout Confirmation</h2>
        <p>Are you sure you want to log out?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirm;
