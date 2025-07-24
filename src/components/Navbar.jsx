import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCoffee, FaHome, FaInfoCircle, FaBoxOpen, FaSignInAlt, FaUserCircle, FaShoppingCart, FaTimes } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import ChamberlainLogo from './ChamberlainLogo';
import Cart from './Cart';

const navLinks = [
  { name: 'Home', icon: <FaHome />, to: '/' },
  { name: 'About', icon: <FaInfoCircle />, to: '/about' },
  { name: 'Product', icon: <FaBoxOpen />, to: '/products' },
];

const Navbar = ({ darkMode, palette }) => {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef();
  const location = useLocation();
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [cartOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  // Check login status on mount and on location change
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('coffeeUser'));
    const session = localStorage.getItem('coffeeSession');
    if (stored && session === stored.email) {
      setUser(stored);
    } else {
      setUser(null);
    }
  }, [location]);

  // Close popup on outside click
  useEffect(() => {
    if (!profileOpen) return;
    function handleClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [profileOpen]);

  // Close cart sidebar on outside click or Esc
  useEffect(() => {
    if (!cartOpen) return;
    function handleClick(e) {
      if (document.getElementById('cartSidebar') && !document.getElementById('cartSidebar').contains(e.target)) {
        setCartOpen(false);
      }
    }
    function handleEsc(e) {
      if (e.key === 'Escape') setCartOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [cartOpen]);

  // Update cart count on mount and when location changes (for navigation-based updates)
  useEffect(() => {
    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('coffeeCart')) || [];
      const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
      setCartCount(count);
    }
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, [location, cartOpen]);

  

  // Palette from props
  const {
    coffeeBrown,
    espresso,
    creamGlass,
    creamBorder,
    mutedGold,
    darkEspresso,
    darkGold,
    darkCream,
    navBg,
    navText,
    navAccent,
    navBorder,
    navShadow,
    buttonBg,
    buttonText,
    logoColor,
  } = palette;

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            className="fixed top-0 left-0 w-full h-0.5 z-50 origin-left"
            style={{
              background: `linear-gradient(90deg, ${navAccent} 0%, ${coffeeBrown} 50%, ${mutedGold} 100%)`,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
      
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: loading ? -80 : 0, opacity: loading ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, delay: loading ? 0.2 : 0 }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${scrolled ? 'shadow-4xl' : ''}`}
        style={{
          background: scrolled 
            ? `linear-gradient(135deg, ${navBg} 0%, ${navBg}dd 100%)`
            : navBg,
          color: navText,
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          borderBottom: scrolled ? `0.2px solid ${navBorder}` : `0.2px solid ${navBorder}40`,
          boxShadow: scrolled 
            ? `0 8px 32px 0 ${navAccent}15, 0 4px 16px 0 ${coffeeBrown}10`
            : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center relative group select-none">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <ChamberlainLogo 
                color={logoColor} 
                accentColor={navAccent}
              />
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{
                  background: `radial-gradient(circle, ${navAccent}20 0%, transparent 70%)`,
                  filter: 'blur(8px)',
                }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            {/* Premium underline effect */}
            <motion.span 
              className="absolute -bottom-1 left-0 h-0.5 rounded-full"
              style={{ background: `linear-gradient(90deg, ${navAccent} 0%, ${coffeeBrown} 100%)` }}
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </NavLink>
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: loading ? 0.4 + index * 0.1 : 0 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-3 font-medium text-sm transition-all duration-300 relative rounded-lg
                      ${isActive 
                        ? 'text-white' 
                        : 'hover:text-white'
                      }`
                    }
                    style={{
                      color: location.pathname === link.to ? navAccent : navText,
                    }}
                  >
                    <motion.span 
                      className="text-base"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.icon}
                    </motion.span>
                    <motion.span
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.name}
                    </motion.span>
                    
                    {/* Hover background effect */}
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, ${navAccent}15 0%, ${coffeeBrown}10 100%)`,
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                    
                    {/* Simple underline animation */}
                    <motion.div
                      className="absolute -bottom-1 left-0 h-0.5 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${navAccent} 0%, ${coffeeBrown} 100%)`,
                      }}
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      animate={{ 
                        width: location.pathname === link.to ? '100%' : 0 
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      layoutId={`underline-${link.name}`}
                    />
                    
                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: `radial-gradient(circle, ${navAccent}20 0%, transparent 70%)`,
                        filter: 'blur(8px)',
                      }}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </NavLink>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Login Button or User Icon */}
          {user ? (
            <div className="relative flex items-center" ref={profileRef}>
              <FaUserCircle
                className="text-3xl cursor-pointer"
                style={{ color: navAccent }}
                onClick={() => setProfileOpen((v) => !v)}
              />
              {/* Cart Icon */}
              <button
                className="ml-4 flex items-center group focus:outline-none"
                style={{ position: 'relative' }}
                onClick={() => setCartOpen(true)}
                aria-label="Open cart"
              >
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  <FaShoppingCart
                    className="text-2xl cursor-pointer transition-transform group-hover:scale-110"
                    style={{ color: navAccent }}
                    title="Cart"
                  />
                  {cartCount >= 0 && (
                    <span
                      className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow"
                      style={{ minWidth: 18, minHeight: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
                    >
                      {cartCount}
                    </span>
                  )}
                </span>
              </button>
              {/* Popup menu */}
              {profileOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-10 z-50 min-w-[180px] px-4 py-3 rounded-xl shadow-2xl text-sm font-body bg-white dark:bg-[#231710] border border-gray-200 dark:border-gray-700 flex flex-col items-center animate-fadeIn" style={{ color: navText }}>
                  <div className="mb-2 font-semibold break-all text-center">{user.email}</div>
                  <button
                    className="mt-2 px-4 py-1 rounded-md bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 font-semibold text-xs hover:bg-yellow-200 dark:hover:bg-yellow-800 transition"
                    onClick={() => {
                      localStorage.removeItem('coffeeSession');
                      setUser(null);
                      setProfileOpen(false);
                    }}
                  >Logout</button>
                  <button
                    className="mt-2 px-4 py-1 rounded-md bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 font-semibold text-xs hover:bg-red-200 dark:hover:bg-red-800 transition"
                    onClick={() => {
                      localStorage.removeItem('coffeeUser');
                      localStorage.removeItem('coffeeSession');
                      setUser(null);
                      setProfileOpen(false);
                    }}
                  >Delete Account</button>
                </div>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: loading ? 0.6 : 0 }}
            >
              <NavLink to="/auth">
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: `0 4px 16px 0 ${navAccent}30`
                }}
                whileTap={{ scale: 0.98 }}
                className="relative flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${buttonBg} 0%, ${coffeeBrown} 100%)`,
                  color: buttonText,
                  border: `1px solid ${navBorder}`,
                  boxShadow: `0 2px 8px 0 ${navAccent}15`,
                }}
              >
                <FaSignInAlt className="text-base" />
                  Login
                </motion.button>
              </NavLink>
            </motion.div>
          )}

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: loading ? 0.7 : 0 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1 p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <motion.span
              animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 8 : 0 }}
              className="w-6 h-0.5 rounded-full"
              style={{ background: navText }}
            />
            <motion.span
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
              className="w-6 h-0.5 rounded-full"
              style={{ background: navText }}
            />
            <motion.span
              animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -8 : 0 }}
              className="w-6 h-0.5 rounded-full"
              style={{ background: navText }}
            />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t"
              style={{ borderColor: navBorder }}
            >
              <div className="px-6 py-4 space-y-1">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative"
                  >
                    <NavLink
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 font-medium text-sm transition-all duration-300 relative rounded-lg
                        ${isActive 
                          ? 'text-white' 
                          : 'hover:text-white'
                        }`
                      }
                      style={{
                        color: location.pathname === link.to ? navAccent : navText,
                      }}
                    >
                      <motion.span 
                        className="text-base"
                        whileHover={{ rotate: 3, scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.icon}
                      </motion.span>
                      <motion.span
                        whileHover={{ x: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.name}
                      </motion.span>
                      
                      {/* Hover background effect for mobile */}
                      <motion.div
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: `linear-gradient(135deg, ${navAccent}10 0%, ${coffeeBrown}05 100%)`,
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                      
                      {/* Simple underline for mobile */}
                      <motion.div
                        className="absolute -bottom-1 left-4 right-4 h-0.5 rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${navAccent} 0%, ${coffeeBrown} 100%)`,
                        }}
                        initial={{ scaleX: 0 }}
                        animate={{ 
                          scaleX: location.pathname === link.to ? 1 : 0 
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        layoutId={`mobile-underline-${link.name}`}
                      />
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            key="cartSidebarBg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            style={{ pointerEvents: cartOpen ? 'auto' : 'none' }}
          >
            <motion.div
              id="cartSidebar"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-[#231710] shadow-2xl z-50"
              style={{ boxShadow: `-8px 0 32px 0 ${navAccent}15` }}
            >
              
                <button onClick={() => setCartOpen(false)} className="absolute top-4 right-4 z-50 text-2xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none" aria-label="Close cart">
                  <FaTimes />
                </button>
              
              <Cart palette={palette} darkMode={darkMode} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 