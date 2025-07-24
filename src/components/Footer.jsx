import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaShoppingCart, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import ChamberlainLogo from './ChamberlainLogo';

const Footer = ({ palette, darkMode, footerRef }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
    setEmail('');
  };

  return (
    <footer
      ref={footerRef}
      className="w-full px-0 md:px-0  pb-8 border-t"
      style={{
        background: darkMode ? palette.darkEspresso : palette.coffeeBrown,
        color: darkMode ? palette.darkCream : palette.cream,
        borderColor: palette.navBorder,
      }}
    >
      {/* SVG Wave Top Border */}
      <div style={{ position: 'relative', width: '100%', marginTop: '-50px', lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 60"
          width="100%"
          height="60"
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z"
            fill={darkMode ? palette.darkEspresso : palette.coffeeBrown}
          />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between pt-10 gap-12 px-6 md:px-12">
        {/* Left: Brand & Tagline */}
        <div className="flex-1 min-w-[220px] flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2 group select-none" style={{ color: palette.logoColor }}>
            <span className="w-40 h-10 block">
              <ChamberlainLogo color={palette.mutedGold} accentColor={palette.navAccent} />
            </span>
          </Link>
          <div className="mt-2 text-sm opacity-80 font-medium" style={{ color: darkMode ? palette.darkCream : palette.cream }}>
            Premium coffee, crafted for every moment.
          </div>
          <div className="hidden md:block border-b border-dashed mt-4 mb-2" style={{ borderColor: darkMode ? palette.navBorder + '55' : palette.mutedGold + '55' }} />
          <div className="text-xs opacity-80 mt-2" style={{ color: darkMode ? palette.darkCream : palette.cream }}>
            &copy; {new Date().getFullYear()} Chamberlain Coffee.<br className="md:hidden" /> Built with love for the Hackathon.
          </div>
        </div>

        {/* Center: Navigation */}
        <div className="flex-1 min-w-[180px] flex flex-col items-start md:items-center gap-4">
          <div className="text-base font-semibold mb-2" style={{ color: darkMode ? palette.navAccent : palette.mutedGold }}>Explore</div>
          <nav className="flex flex-col gap-2 text-sm">
            <Link to="/" className="transition-colors hover:text-gold" style={{ color: darkMode ? palette.darkCream : palette.cream }}>
              Home
            </Link>
            <Link to="/about" style={{ color: darkMode ? palette.darkCream : palette.cream }}>
              About
            </Link>
            <Link to="/product" style={{ color: darkMode ? palette.darkCream : palette.cream }}>
              Product
            </Link>
            <Link to="#cart" style={{ color: darkMode ? palette.darkCream : palette.cream }}>
              Cart
            </Link>
          </nav>
        </div>

        {/* Right: Newsletter & Social */}
        <div className="flex-1 min-w-[220px] flex flex-col items-end gap-4">
          <div className="text-base font-semibold mb-2 md:self-end self-start" style={{ color: darkMode ? palette.navAccent : palette.mutedGold }}>Stay Connected</div>
          <form onSubmit={handleSubmit} className="w-full flex flex-col md:items-end items-start gap-2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              className="px-4 py-2 rounded-lg text-sm w-full md:w-56 focus:outline-none focus:ring-2"
              style={{
                background: darkMode ? palette.darkCream + '10' : palette.mutedGold +"10",
                color: darkMode ? palette.darkCream : palette.cream,
                border: `1px solid ${darkMode ? palette.navBorder : palette.mutedGold + '99'}`,
              }}
              required
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: `linear-gradient(90deg, ${palette.navAccent} 0%, ${palette.mutedGold} 100%)`,
                color: palette.buttonText,
                border: `1px solid ${palette.navBorder}`,
                boxShadow: `0 2px 8px 0 ${palette.navAccent}15`,
                opacity: submitted ? 0.7 : 1,
                cursor: submitted ? 'not-allowed' : 'pointer',
              }}
              disabled={submitted}
            >
              {submitted ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
          <div className="flex gap-5 text-2xl mt-2">
            <a
              href="https://instagram.com/chamberlaincoffee"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              style={{ color: palette.mutedGold }}
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com/@chamberlaincoffee"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              style={{ color: palette.mutedGold }}
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href="https://twitter.com/chamberlaincof"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              style={{ color: palette.mutedGold }}
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://facebook.com/chamberlaincoffee"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              style={{ color: palette.mutedGold }}
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://linkedin.com/company/chamberlaincoffee"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              style={{ color: palette.mutedGold }}
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <Link
              to="#cart"
              className="hover:scale-110 transition-transform"
              style={{ color: palette.mutedGold }}
              aria-label="Cart"
            >
              <FaShoppingCart />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 