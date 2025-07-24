import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './routes/Routes';
import { useState, useEffect, useRef } from 'react';
import Footer from './components/Footer';
import { DataProvider } from './context/DataContext';
import { useLocation } from 'react-router-dom';

// Palettes
const paletteLight = {
  coffeeBrown: '#6f4e37',
  espresso: '#3c2f2f',
  creamGlass: 'rgba(249,246,242,0.7)',
  creamBorder: '#f5ede6',
  mutedGold: '#e7b86a',
  darkEspresso: '#18120e',
  cream: '#FFF9F2',
  darkGold: '#bfa76a',
  darkCream: '#f5ede6',
  navBg: 'rgba(249,246,242,0.7)',
  navText: '#6f4e37',
  navAccent: '#e7b86a',
  navBorder: '#f5ede6',
  navShadow: '0 8px 32px 0 rgba(111, 78, 55, 0.10)',
  buttonBg: '#e7b86a',
  buttonText: '#3c2f2f',
  logoColor: '#6f4e37',
};
const paletteDark = {
  coffeeBrown: '#6f4e37',
  espresso: '#3c2f2f',
  creamGlass: 'rgba(36, 24, 16, 0.7)',
  creamBorder: '#231710',
  cardBg: 'rgba(40, 28, 18, 0.92)',
  mutedGold: '#bfa76a',
  darkEspresso: '#18120e',
  darkGold: '#bfa76a',
  darkCream: '#f5ede6',
  navBg: 'rgba(24,18,14,0.92)',
  navText: '#f5ede6',
  navAccent: '#bfa76a',
  navBorder: '#bfa76a',
  navShadow: '0 8px 32px 0 #bfa76a33',
  buttonBg: '#bfa76a',
  buttonText: '#18120e',
  logoColor: '#bfa76a',
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
      window.lenis.scrollTo(0, 0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  // Also scroll to top on initial mount
  useEffect(() => {
    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
      window.lenis.scrollTo(0, 0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);
  return null;
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('darkMode');
      return stored ? JSON.parse(stored) : false;
    }
    return false;
  });
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  const palette = darkMode ? paletteDark : paletteLight;

  //passing footer for handling hiding and showing of newsletter floating card as the footer is not the part of the home page
  const footerRef = useRef(null);

  return (
    <DataProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar darkMode={darkMode} palette={palette} />
        <AppRoutes darkMode={darkMode} setDarkMode={setDarkMode} palette={palette} footerRef={footerRef} />
        <Footer darkMode={darkMode} palette={palette} footerRef={footerRef} />
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
