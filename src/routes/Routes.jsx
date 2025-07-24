import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '../components/Loading';

const Home = lazy(() => import('../pages/Home'));
const Products = lazy(() => import('../pages/Products'));
const About = lazy(() => import('../pages/About'));
const ProductDetails = lazy(() => import('../pages/ProductDetails'));
const Auth = lazy(() => import('../pages/Auth'));
const Cart = lazy(() => import('../components/Cart'));

const AppRoutes = ({ darkMode, setDarkMode, palette, footerRef }) => (
  <Suspense fallback={<Loading />}>
    <Routes>
      <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} palette={palette} footerRef={footerRef} />} />
      <Route path="/about" element={<About darkMode={darkMode} palette={palette} />} />
      <Route path="/products" element={<Products darkMode={darkMode} palette={palette} />} />
      <Route path="/products/:id" element={<ProductDetails darkMode={darkMode} palette={palette} />} />
      <Route path="/auth" element={<Auth darkMode={darkMode} palette={palette} />} />
      <Route path="/cart" element={<Cart palette={palette} darkMode={darkMode} />} />
    </Routes>
  </Suspense>
);

export default AppRoutes; 