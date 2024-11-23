import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import React, { useState } from 'react';
import { Home, LogOut, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import LogoutConfirm from './logoutConfirm';
import NewTaskModal from '../components/newTask.tsx'

interface NavProps {
  deviceType: "mobile" | "desktop";
}

interface MobileNavBarProps {
  onLogoutClick: () => void;
  onNewTaskClick: () => void;
}

const colors = {
  background: '#1f2937',
  text: 'black',
  hover: '#4b5563',
  active: '#6b7280'
};



const MobileNavBar: React.FC<MobileNavBarProps> = ({ onLogoutClick, onNewTaskClick }) => {


  return (
    <nav className="fixed bottom-0 z-20 left-0 right-0 bg-gray-800 p-4 shadow-lg">
      <ul className="flex justify-around text-white text-center">
        <li>
          <Link to={"/home/"} className="flex flex-col items-center ">
            <Home size={24} />
            <span className="text-xs text-white text-center">Home</span>
          </Link>
        </li>

        <li>
          <button onClick={onNewTaskClick} className="flex flex-col items-center bg-blue-700 p-2 rounded-full">
            <Plus size={24} />
          </button>
        </li>

        <li>
          <button onClick={onLogoutClick} className="flex flex-col items-center">
            <LogOut size={24} />
            <span className="text-xs">Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

const DesktopNav: React.FC<{ onLogoutClick: () => void }> = ({ onLogoutClick }) => {
  const menuItemStyles = {
    button: {
      color: colors.text,
      padding: '10px 20px',
      transition: 'background-color 0.2s',
      '&:hover': {
        backgroundColor: colors.hover,
      },
      '&.active': {
        backgroundColor: colors.active,
        color: '#ffffff',
      },
    },
  };

  return (
    <>
      <Sidebar
        rootStyles={{
          height: "100vh",
          backgroundColor: colors.background,
          color: colors.text,
        }}
      >
        <div style={{ padding: '16px', textAlign: 'center', borderBottom: `1px solid ${colors.hover}` }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Todo App</h1>
        </div>
        <Menu menuItemStyles={menuItemStyles} className='font-bold'>
          <MenuItem>
            <Link to={"/new-task/"} className="flex flex-col items-center bg-blue-700 rounded-full p-2">
              {<Plus size={24} />}
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to={"/"} className="flex flex-col items-center ">
              {<Home size={24} />}
              <span className="text-white text-center">Home</span>
            </Link>
          </MenuItem>

          {/* Triggering the logout confirmation modal */}
          <MenuItem onClick={onLogoutClick} className='flex flex-col items-center'>
            <LogOut size={24} />
            <span className="text-white">Logout</span>
          </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
}

const Nav: React.FC<NavProps> = ({ deviceType }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState<boolean>(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleNewTaskClick = () => {
    setIsNewTaskModalOpen(true);
  };

  return (
    <>
      {deviceType === "desktop" ? (
        <DesktopNav onLogoutClick={handleLogoutClick} />
      ) : (
        <MobileNavBar onLogoutClick={handleLogoutClick} onNewTaskClick={handleNewTaskClick} />
      )}

      {/* Render the Logout Confirm Modal */}
      {isLogoutModalOpen && (
        <LogoutConfirm isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} />
      )}

      {isNewTaskModalOpen && (
        <NewTaskModal isOpen={isNewTaskModalOpen} onClose={() => setIsNewTaskModalOpen(false)} />
      )}
    </>
  );
}

export default Nav;
