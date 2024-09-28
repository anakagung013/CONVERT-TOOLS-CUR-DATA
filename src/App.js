// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CurrencyConverter from './components/CurrencyConverter';
import DataStorageConverter from './components/DataStorageConverter';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import About from './components/About';
import LoadingScreen from './components/LoadingScreen';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasikan loading screen selama 2 detik
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Bersihkan timer saat komponen unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter basename="/toolsconvert"> {/* Menambahkan basename di sini */}
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Navbar />
          <CustomCursor />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/currency-converter" element={<CurrencyConverter />} />
            <Route path="/data-storage-converter" element={<DataStorageConverter />} />
            <Route path='/about' element={<About />} />
          </Routes>
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
