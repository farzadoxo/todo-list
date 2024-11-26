import React, { useState } from 'react';
import { Home, LogOut, Plus, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import LogoutConfirm from './logoutConfirm';
import NewTaskModal from '../components/newTask.tsx';
import Avatar from './avatar.tsx';

interface NavProps {
  deviceType: "mobile" | "desktop";
  avatarImage: string;
}

interface NavBarProps {
  onLogoutClick: () => void;
  onNewTaskClick: () => void;
  avatarImage?: string;
  onAvatarClick?: () => void;

}

const MobileNavBar: React.FC<NavBarProps> = ({ onLogoutClick, onNewTaskClick, avatarImage, onAvatarClick }) => {
  return (
    <nav className="fixed bottom-0 z-20 left-0 right-0 bg-gray-800 p-4 shadow-lg dark:bg-gray-900">
      <ul className="flex justify-around text-white text-center">
        <li>
          <Link to={"/"} className="flex flex-col items-center text-white">
            <Home size={24} />
            <span className="text-xs">Home</span>
          </Link>
        </li>

        <li>
          <button onClick={onNewTaskClick} className="flex flex-col items-center bg-blue-700 p-2 rounded-full hover:bg-blue-600 dark:bg-blue-800 dark:hover:bg-blue-700">
            <Plus size={24} />
          </button>
        </li>

        <Avatar className="w-10 h-10" imageSrc={avatarImage && avatarImage} onClick={onAvatarClick} />

      </ul>
    </nav>
  );
};


const DesktopNav: React.FC<NavBarProps> = ({ onLogoutClick, onNewTaskClick, avatarImage, onAvatarClick }) => {
  return (
    <div className='sidebar w-48 bg-gray-400 p-4 shadow-lg dark:bg-gray-900'>
      <div className='header text-center mb-4'>
        <Avatar className="mx-auto w-20 h-20" imageSrc={avatarImage && avatarImage} onClick={onAvatarClick} />
        <h1 className='text-2xl font-bold text-black dark:text-white'>Todo App</h1>
      </div>
      <ul className='flex flex-col h-screen gap-5 font-bold bg-gray-400 p-4 dark:bg-gray-900'>
        <li>
          <button onClick={onNewTaskClick} className="flex flex-col items-center bg-blue-700 w-full p-2 rounded-full hover:bg-blue-600 dark:bg-blue-800 dark:hover:bg-blue-700">
            <Plus size={24} />
          </button>
        </li>
        <li>
          <Link to={"/"} className="menu-item flex flex-col items-center text-black dark:text-white">
            <Home size={24} />
            <span className="">Home</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};


const Nav: React.FC<NavProps> = ({ deviceType, avatarImage }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState<boolean>(false);

  const handleAvatarClick = () => {
    console.log("avatar clicked!")
  }

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleNewTaskClick = () => {
    setIsNewTaskModalOpen(true);
  };

  return (
    <>
      {deviceType === "desktop" ? (
        <DesktopNav onLogoutClick={handleLogoutClick} onNewTaskClick={handleNewTaskClick} avatarImage={avatarImage} onAvatarClick={handleAvatarClick} />
      ) : (
        <MobileNavBar onLogoutClick={handleLogoutClick} onNewTaskClick={handleNewTaskClick} avatarImage={avatarImage} onAvatarClick={handleAvatarClick} />
      )}

      {/* Render the Logout Confirm Modal and NewTaskModal*/}
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
