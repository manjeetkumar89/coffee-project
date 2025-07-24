import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Auth({ darkMode, palette }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (mode === 'register') {
        localStorage.setItem('coffeeUser', JSON.stringify({ email, password }));
        setMessage('Registration successful! You can now log in.');
        setMode('login');
        setEmail('');
        setPassword('');
      } else {
        const stored = JSON.parse(localStorage.getItem('coffeeUser'));
        if (stored && stored.email === email && stored.password === password) {
          localStorage.setItem('coffeeSession', email);
          setMessage('Login successful! Redirecting...');
          setTimeout(() => navigate('/'), 1200);
        } else {
          setMessage('Invalid credentials. Please try again.');
        }
      }
      setLoading(false);
    }, 800);
  };

  // About-style hero background
  const bg = darkMode
    ? 'linear-gradient(120deg, #18120e 0%, #231710 100%)'
    : 'linear-gradient(120deg, #f9f6f2 0%, #f5ede6 100%)';

  // Card styles
  const cardBg = darkMode
    ? 'linear-gradient(135deg, rgba(40,28,18,0.92) 60%, rgba(55,38,25,0.96) 100%)'
    : 'linear-gradient(135deg, rgba(255,255,255,0.92) 60%, rgba(249,246,242,0.98) 100%)';
  const cardBorder = darkMode
    ? '2.5px solid rgba(191,167,106,0.55)'
    : '2.5px solid #e7b86a';
  const cardShadow = darkMode
    ? '0 8px 32px 0 rgba(191,167,106,0.10), 0 1.5px 8px 0 #0008 inset'
    : '0 8px 32px 0 rgba(111,78,55,0.10)';
  const cardBackdrop = darkMode ? 'blur(18px)' : 'blur(12px)';
  const cardRadius = '1.75rem';
  const accentBar = darkMode ? palette.mutedGold : palette.mutedGold;
  const accentBarShadow = darkMode ? '0 0 16px 2px #e7b86a88' : '0 0 8px 1px #e7b86a55';
  const borderGradient = darkMode
    ? 'linear-gradient(90deg, #bfa76a 0%, #6f4e37 100%)'
    : 'linear-gradient(90deg, #e7b86a 0%, #f5ede6 100%)';

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ background: bg }}>
      {/* Animated Blurred Blobs (About-style) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: darkMode ? 0.22 : 0.25, scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
        className={`absolute left-0 top-0 w-[40vw] h-[40vw] rounded-full blur-3xl z-0 ${darkMode ? 'bg-[#bfa76a]' : 'bg-[#e7b86a]'}`}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: darkMode ? 0.18 : 0.18, scale: [1, 1.12, 1] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
        className={`absolute right-0 bottom-0 w-[32vw] h-[32vw] rounded-full blur-3xl z-0 ${darkMode ? 'bg-[#6f4e37]' : 'bg-pink-300'}`}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: darkMode ? 0.13 : 0.12, scale: [1, 1.09, 1] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse' }}
        className={`absolute left-1/2 top-1/2 w-[28vw] h-[28vw] rounded-full blur-3xl z-0 ${darkMode ? 'bg-[#e7b86a]' : 'bg-[#f9f6f2]'}`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      <div className="w-full max-w-md z-10 flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.98 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="w-full flex flex-col items-center relative p-8"
            style={{
              border: cardBorder,
              borderRadius: cardRadius,
              background: cardBg,
              boxShadow: cardShadow,
              backdropFilter: cardBackdrop,
              WebkitBackdropFilter: cardBackdrop,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Accent bar/dot */}
            <div
              className="absolute left-1/2 -top-3 w-24 h-2 rounded-full"
              style={{
                background: borderGradient,
                boxShadow: accentBarShadow,
                transform: 'translateX(-50%)',
                zIndex: 2,
                border: darkMode ? '1.5px solid #bfa76a' : '1.5px solid #e7b86a',
              }}
            />
            <motion.h1
              className="text-2xl font-bold mb-4 font-heading text-center"
              style={{ color: darkMode ? palette.mutedGold : palette.coffeeBrown }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              {mode === 'login' ? 'Sign In' : 'Register'}
            </motion.h1>
            <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit} autoComplete="on">
              <motion.input
                type="email"
                placeholder="Email"
                className="px-4 py-3 rounded-xl border w-full font-body focus:ring-mutedGold dark:focus:ring-darkGold transition-all duration-200 text-base shadow-sm"
                style={{
                  borderColor: palette.creamBorder,
                  background: darkMode ? 'rgba(55,38,25,0.85)' : palette.cream,
                  color: darkMode ? palette.darkCream : palette.espresso,
                  boxShadow: darkMode ? '0 1.5px 8px 0 #0006 inset' : '0 1.5px 8px 0 #e7b86a11 inset',
                }}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="username"
                whileFocus={{ scale: 1.03, boxShadow: `0 0 0 2px ${palette.mutedGold}55` }}
              />
              <motion.input
                type="password"
                placeholder="Password"
                className="px-4 py-3 rounded-xl border w-full font-body focus:ring-2 focus:ring-offset-2 focus:ring-mutedGold dark:focus:ring-darkGold transition-all duration-200 text-base shadow-sm"
                style={{
                  borderColor: palette.creamBorder,
                  background: darkMode ? 'rgba(55,38,25,0.85)' : palette.cream,
                  color: darkMode ? palette.darkCream : palette.espresso,
                  boxShadow: darkMode ? '0 1.5px 8px 0 #0006 inset' : '0 1.5px 8px 0 #e7b86a11 inset',
                }}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                whileFocus={{ scale: 1.03, boxShadow: `0 0 0 2px ${palette.mutedGold}55` }}
              />
              <motion.button
                type="submit"
                className="py-3 px-6 rounded-xl font-semibold font-body cursor-pointer mt-2 shadow-md transition-all text-base"
                style={{
                  background: palette.buttonBg,
                  color: palette.buttonText,
                  border: `1.5px solid ${palette.mutedGold}`,
                  letterSpacing: '0.01em',
                  boxShadow: darkMode
                    ? '0 2px 16px 0 #bfa76a33, 0 1.5px 8px 0 #0008 inset'
                    : '0 4px 24px 0 #e7b86a22',
                }}
                disabled={loading}
                whileHover={{ scale: 1.03, boxShadow: `0 4px 24px 0 ${palette.mutedGold}33` }}
                whileTap={{ scale: 0.97 }}
                animate={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? (mode === 'login' ? 'Signing In...' : 'Registering...') : (mode === 'login' ? 'Sign In' : 'Register')}
              </motion.button>
            </form>
            <AnimatePresence>
              {message && (
                <motion.div
                  className="mt-4 text-center text-sm font-body"
                  style={{ color: message.includes('success') ? 'green' : 'red' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  key={message}
                >
                  {message}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="mt-6 text-center">
              <motion.button
                className="text-sm underline font-body text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition"
                onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setMessage(''); }}
                whileTap={{ scale: 0.96 }}
                whileHover={{ color: darkMode ? palette.mutedGold : palette.coffeeBrown }}
                aria-label={mode === 'login' ? 'Switch to register' : 'Switch to login'}
              >
                {mode === 'login' ? "Don't have an account? Register" : 'Already have an account? Login'}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 