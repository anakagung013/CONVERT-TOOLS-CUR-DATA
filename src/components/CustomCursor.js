// CustomCursor.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Cursor = styled.div`
  position: fixed;
  width: 35px; /* Set the size of the cursor */
  height: 35px; /* Set the size of the cursor */
  border-radius: 50%;
  background-color: rgba(0, 123, 255, 0.8); /* Change color as needed */
  pointer-events: none; /* Prevent the cursor from blocking mouse events */
  transition: transform 0.1s ease;
  z-index: 9999; /* Keep it above other elements */
  display: ${(props) => (props.hide ? 'none' : 'block')}; /* Hide on mobile */
`;

const Popup = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 10000;
  opacity: ${(props) => (props.visible ? '1' : '0')};
  transition: opacity 0.5s ease;
`;

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    // Check if the device is mobile
    const checkMobileDevice = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };

    checkMobileDevice(); // Initial check

    window.addEventListener('resize', checkMobileDevice); // Update on resize
    return () => {
      window.removeEventListener('resize', checkMobileDevice);
    };
  }, []);

  useEffect(() => {
    const updateMousePosition = (e) => {
      if (!isMobile) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [isMobile]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");

    const handleChange = (e) => {
      if (e.matches && !isMobile) {
        // If switched to mobile mode
        setIsMobile(true);
      } else if (!e.matches && isMobile) {
        // If switched to desktop mode
        setPopupVisible(true);
        setTimeout(() => {
          setPopupVisible(false);
          setIsMobile(false); // Revert back to mobile mode
        }, 5000); // 5 seconds
      }
    };

    mediaQuery.addEventListener('change', handleChange); // Listen for mode change
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [isMobile]);

  return (
    <>
      <Cursor hide={isMobile} style={{ left: mousePosition.x, top: mousePosition.y }} />
      <Popup visible={popupVisible}>Anda sedang dalam mode desktop</Popup>
    </>
  );
};

export default CustomCursor;
