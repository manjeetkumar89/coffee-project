
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

function LenisProvider({ children }) {
  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08,
      direction: 'vertical',
      gestureOrientation: 'vertical',
      smoothTouch: false,
    });
    window.lenis = lenis; // Expose globally for ScrollToTop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
      window.lenis = undefined;
    };
  }, []);
  return children;
}

createRoot(document.getElementById('root')).render(
  
    <LenisProvider>
      <App />
    </LenisProvider>
  
);
