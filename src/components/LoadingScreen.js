// src/components/LoadingScreen.js
import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../animations/loading.json'; // Change the path to your Lottie JSON file

const LoadingScreen = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent background
      zIndex: 9999,
    }}>
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  );
};

export default LoadingScreen;
