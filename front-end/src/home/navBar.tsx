import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import React from 'react';
import { Home, Info, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavProps {
  deviceType: "mobile" | "desktop";
}

const colors = {
  background: '#1f2937', // Darker background
  text: 'black', // Softer text color
  hover: '#4b5563', // Hover color
  active: '#6b7280' // Active item color
};

const navLinks = [
  { title: 'Home', url: '/', icon: <Home size={24} /> },
  { title: 'About', url: '/about', icon: <Info size={24} /> },
  { title: 'Services', url: '/services', icon: <Phone size={24} /> },
  { title: 'Contact', url: '/contact', icon: <Phone size={24} /> }
];

const MobileNavbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 shadow-lg">
      <ul className="flex justify-around">
        {navLinks.map((link) => (
          <li key={link.title} className="text-white text-center">
            <Link to={link.url} className="flex flex-col items-center">
              {link.icon}
              <span className="text-xs">{link.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const VerticalNavBar: React.FC = () => {
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
    <Sidebar
      rootStyles={{
        height: "100vh",
        backgroundColor: colors.background,
        color: colors.text,
      }}
    >
      <div style={{ padding: '16px', textAlign: 'center', borderBottom: `1px solid ${colors.hover}` }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>My App</h1>
      </div>
      <Menu menuItemStyles={menuItemStyles}>
        {navLinks.map(link => (
          <MenuItem key={link.title} icon={link.icon} component={<Link to={link.url} />}>
            {link.title}

          </MenuItem>
        ))}
      </Menu>
    </Sidebar>
  );
}

const Nav: React.FC<NavProps> = ({ deviceType }) => {
  if (deviceType === "desktop") {
    return <VerticalNavBar />;
  } else if (deviceType === "mobile") {
    return <MobileNavbar />;
  }
}

export default Nav;