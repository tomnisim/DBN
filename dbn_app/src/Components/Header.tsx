import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import { CgProfile } from "react-icons/cg";
import { useUser } from './AdminContext';


type HeaderProps = {
  src: string;
  alt: string;
};

const Header: React.FC<HeaderProps> = ({ src, alt }) => {
  const { user, updateUser } = useUser();
  const isAdmin = user.isAdmin;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  const user_id: number = 1;

  return (
    <div>
      <div style={headerStyle}>
        <Link to="/home" style={linkStyle}>
          <img src={src} alt={alt} style={logoStyle} />
        </Link>
        <div style={headerActionsStyle}>
          {isAdmin ? (
            <div style={menuIconStyle} onClick={toggleSidebar}>
              &#9776; {/* Unicode character for hamburger icon */}
            </div>
          ) : (
            <Link to={`/Profile`} style={profileLinkStyle}>
              <CgProfile size={30} /> {/* Adjust size as needed */}
            </Link>
          )}
        </div>
      </div>
      <div
        ref={sidebarRef}
        style={{
          ...sidebarStyle,
          transform: isSidebarOpen ? 'translateX(0)' : 'translateX(100%)',
          opacity: isSidebarOpen ? 1 : 0,
        }}
      >
        <Navigation />
      </div>
    </div>
  );
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 1rem',
  height: '50px',
  backgroundColor: '#007bff',
  width: '100%',
  position: 'fixed',
  top: '0',
  left: '0',
  zIndex: 1000,
};

const linkStyle: React.CSSProperties = {
  color: 'red',
  textDecoration: 'none',
};

const logoStyle: React.CSSProperties = {
  height: '40px',
};

const menuIconStyle: React.CSSProperties = {
  fontSize: '30px',
  cursor: 'pointer',
  color: 'white',
  transition: 'color 0.3s',
};

const sidebarStyle: React.CSSProperties = {
  width: '250px',
  height: 'calc(100vh - 50px)', // Full height minus the header height
  backgroundColor: '#333',
  color: '#fff',
  position: 'fixed',
  top: '50px', // Start below the header
  right: '0',
  zIndex: 1001,
  padding: '1rem',
  boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.3)',
  overflowY: 'auto',
  transition: 'transform 0.3s ease, opacity 0.3s ease',
};

const headerActionsStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const profileLinkStyle: React.CSSProperties = {
  color: 'white',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
};

export default Header;
