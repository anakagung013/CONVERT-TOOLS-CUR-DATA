import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Home } from '@styled-icons/boxicons-regular/Home';
import { Exchange } from '@styled-icons/remix-fill/Exchange';
import { Data } from '@styled-icons/boxicons-regular/Data';
import { People } from '@styled-icons/fluentui-system-filled/People';
import { Menu } from '@styled-icons/boxicons-regular/Menu';

const NavbarContainer = styled.nav`
  position: sticky;
  top: 0;
  width: 95.8%;
  background-color: #007bff;
  padding: 10px 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 769px) {
    padding: 10px 40px; /* More padding on desktop */
  }
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  flex-grow: 1;

  @media (max-width: 768px) {
    display: none; /* Hide links on mobile */
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const Icon = styled.span`
  margin-right: 8px;
  vertical-align: middle;
`;

const MenuIcon = styled(Menu)`
  color: white;
  cursor: pointer;
  width: 30px;
  height: 30px;

  @media (min-width: 769px) {
    display: none; /* Hide menu icon on larger screens */
  }
`;

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  background-color: #007bff;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 999;

  &.open {
    transform: translateX(0);
  }

  @media (max-width: 768px) {
    width: 200px; /* Adjust width for smaller screens */
  }
`;

const SidebarLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  display: block;
  margin: 15px 0;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const MobileNavbar = styled.div`
  display: none; /* Initially hide mobile navbar */

  @media (max-width: 768px) {
    display: flex; /* Show on mobile */
    justify-content: space-between;
    align-items: center;
    width: 96%;
    padding: 10px;
    background-color: #007bff;
  }
`;

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <MobileNavbar>
          <MenuIcon onClick={toggleSidebar} />
        </MobileNavbar>
      ) : (
        <NavbarContainer>
          <NavLinks>
            <NavLink to="/">
              <Icon><Home size="20" /></Icon> Home
            </NavLink>
            <NavLink to="/currency-converter">
              <Icon><Exchange size="20" /></Icon> Currency Converter
            </NavLink>
            <NavLink to="/data-storage-converter">
              <Icon><Data size="20" /></Icon> Data Storage Converter
            </NavLink>
            <NavLink to="/about">
              <Icon><People size="20" /></Icon> About Us
            </NavLink>
          </NavLinks>
        </NavbarContainer>
      )}

      <SidebarContainer className={isSidebarOpen ? 'open' : ''}>
        <h2 style={{ color: 'white' }}>Menu</h2>
        <SidebarLink to="/" onClick={toggleSidebar}>
          <Icon><Home size="20" /></Icon> Home
        </SidebarLink>
        <SidebarLink to="/currency-converter" onClick={toggleSidebar}>
          <Icon><Exchange size="20" /></Icon> Currency Converter
        </SidebarLink>
        <SidebarLink to="/data-storage-converter" onClick={toggleSidebar}>
          <Icon><Data size="20" /></Icon> Data Storage Converter
        </SidebarLink>
        <SidebarLink to="/about" onClick={toggleSidebar}>
          <Icon><People size="20" /></Icon> About Us
        </SidebarLink>
      </SidebarContainer>
    </>
  );
};

export default Navbar;
