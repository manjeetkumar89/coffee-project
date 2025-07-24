import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const EmptyCartSVG = ({ accent }) => (
  <motion.svg
    width="120" height="120" viewBox="0 0 120 120" fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ y: 0 }}
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    className="mx-auto mb-4"
  >
    <ellipse cx="60" cy="100" rx="38" ry="10" fill={accent + '22'} />
    <rect x="30" y="40" width="60" height="40" rx="12" fill={accent} opacity="0.15" />
    <rect x="38" y="48" width="44" height="24" rx="8" fill={accent} opacity="0.25" />
    <rect x="50" y="60" width="20" height="8" rx="4" fill={accent} opacity="0.4" />
    <circle cx="45" cy="80" r="4" fill={accent} />
    <circle cx="75" cy="80" r="4" fill={accent} />
    <rect x="54" y="36" width="12" height="8" rx="4" fill={accent} opacity="0.5" />
  </motion.svg>
);

const Cart = ({ palette, darkMode }) => {
  const [cart, setCart] = useState([]);


  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('coffeeCart')) || [];
    setCart(stored);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('coffeeCart', JSON.stringify(newCart));
  };

  const handleRemove = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    updateCart(newCart);
  };

  const handleQty = (id, delta) => {
    const newCart = cart.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    );
    updateCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Theme colors
  const glassBg = darkMode
    ? 'rgba(40,28,18,0.85)'
    : 'rgb(255, 255, 255)';
  const borderColor = palette?.navBorder || (darkMode ? '#bfa76a55' : '#e7b86a55');
  const accent = palette?.navAccent || (darkMode ? '#FFD700' : '#B6895B');
  const text = palette?.navText || (darkMode ? '#fff' : '#231710');
  const muted = palette?.mutedGold || (darkMode ? '#bfa76a' : '#888');
  const buttonBg = palette?.buttonBg || (darkMode ? '#bfa76a' : '#facc15');
  const buttonText = palette?.buttonText || (darkMode ? '#231710' : '#fff');

  return (
    <div className="flex flex-col h-full relative" style={{ minHeight: '100vh', background: glassBg, color: text }}>
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-white/60 dark:bg-[#231710cc] border-b" style={{ borderColor, background: glassBg, minHeight: 0 }}>
        <div className="flex items-center gap-2 w-full relative">
          <FaShoppingCart style={{ color: accent, fontSize: 22 }} />
          <span className="font-bold text-xl tracking-tight" style={{ color: accent }}>Your Cart</span>
          {cart.length > 0 && (
            <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: accent + '22', color: accent }}>{cart.length}</span>
          )}
        </div>
      </div>

      {/* Cart Content */}
      <div className=" flex-1 overflow-y-auto px-4 py-4" style={{ background: 'transparent' }}>
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <EmptyCartSVG accent={accent} />
            <div className="text-xl font-semibold mb-2" style={{ color: accent }}>Your cart is empty</div>
            <div className="text-base mb-4" style={{ color: muted }}>Looks like you haven't added anything yet.</div>
            <NavLink to="/products">
              <button className="px-6 py-2 rounded-full font-semibold text-base shadow-lg transition bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:from-yellow-500 hover:to-yellow-700" style={{ background: `linear-gradient(90deg, ${buttonBg} 0%, ${accent} 100%)`, color: buttonText }}>Browse Products</button>
            </NavLink>
          </div>
        ) : (
          <motion.div layout className="space-y-4">
            <AnimatePresence initial={false}>
              {cart.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="flex items-center gap-4 p-4 rounded-2xl shadow-lg bg-white/80 dark:bg-[#2d21170c] border border-gray-200 dark:border-gray-700 transition hover:scale-[1.02] hover:shadow-2xl"
                  style={{ borderColor }}
                >
                  <img
                    src={item.image || require('../assets/productImages/fallback.avif')}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl border border-gray-50 dark:border-gray-700 shadow"
                    style={{ background: '#fff' }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-lg truncate mb-1" style={{ color: text }}>{item.name}</div>
                    <div className="text-sm mb-2" style={{ color: muted }}>${item.price.toFixed(2)}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => handleQty(item.id, -1)} className="p-1 rounded bg-gray-100 dark:bg-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-300 transition" style={{ color: text }}><FaMinus /></button>
                      <span className="px-2 font-medium">{item.qty}</span>
                      <button onClick={() => handleQty(item.id, 1)} className="p-1 rounded bg-gray-100 dark:bg-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-300 transition" style={{ color: text }}><FaPlus /></button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end min-w-[70px]">
                    <div className="font-bold text-lg mb-2" style={{ color: accent }}>${(item.price * item.qty).toFixed(2)}</div>
                    <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-red-700 transition"><FaTrashAlt /></button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      {cart.length > 0 && (
        <div className="sticky bottom-0 z-20 bg-white/80 dark:bg-[#231710cc] backdrop-blur-xl border-t px-6 py-3 flex flex-col gap-1" style={{ borderColor, background: glassBg }}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-bold" style={{ color: text }}>Subtotal</span>
            <span className="text-2xl font-extrabold" style={{ color: accent }}>${total.toFixed(2)}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: `0 0 16px 2px ${accent}55` }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl font-semibold text-sm transition bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg flex items-center justify-center gap-2 relative overflow-hidden"
            style={{ background: `linear-gradient(90deg, ${buttonBg} 0%, ${accent} 100%)`, color: buttonText, boxShadow: `0 0 0 0 ${accent}` }}
          >
            <span className="absolute inset-0 rounded-xl pointer-events-none" style={{ boxShadow: `0 0 16px 2px ${accent}55`, opacity: 0.3 }} />
            <FaShoppingCart className="mr-2" /> Checkout
          </motion.button>
          {/* <NavLink to="/products" className="text-center text-sm mt-1 underline" style={{ color: accent }}>Continue Shopping</NavLink> */}
        </div>
      )}
    </div>
  );
};

export default Cart; 