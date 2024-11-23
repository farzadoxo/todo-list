import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomConfirmModal } from "../components/customModals"

interface LogoutConfirmProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutConfirm: React.FC<LogoutConfirmProps> = ({ isOpen, onClose }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear user session
    navigate('/login'); // Redirect to login page
    location.reload(); // Reload the page
  };

  // return null if isOpen is false
  if (!isOpen) {
    return null;
  }

  return (
    <CustomConfirmModal
      open={isOpen}
      onClose={onClose}
      title="Logout?"
      content={<p>Are you sure you want to Logout of you'r account?</p>}
      confirmLabel="Logout"
      onConfirm={handleLogout}
    />
  );
};

export default LogoutConfirm;
