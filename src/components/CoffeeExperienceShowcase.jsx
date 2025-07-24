import React from 'react';
import { motion } from 'framer-motion';
import { FaMugHot, FaUsers, FaLeaf, FaStar } from 'react-icons/fa';

const highlights = [
  { icon: <FaMugHot />, label: 'Bold Flavors' },
  { icon: <FaLeaf />, label: 'Sustainable Rituals' },
  { icon: <FaUsers />, label: 'Brew Crew Community' },
  { icon: <FaStar />, label: 'Loved by Many' },
];

const CoffeeExperienceShowcase = ({ darkMode, palette }) => {
  const cardBg = darkMode ? 'rgba(40,28,18,0.85)' : 'rgba(255,255,255,0.85)';
  const glassBg = darkMode ? 'rgba(40,28,18,0.65)' : 'rgba(255,255,255,0.65)';
  const headingColor = darkMode ? palette.mutedGold : palette.coffeeBrown;
  const textColor = darkMode ? palette.darkCream : palette.espresso;
  const accent = darkMode ? palette.mutedGold : palette.coffeeBrown;

  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center py-16 px-4 gap-10 md:gap-16">
      {/* Left: Animated Coffee Scene */}
      <motion.div
        className="flex-1 flex items-center justify-center mb-8 md:mb-0"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.8 }}
        style={{ minWidth: 260 }}
      >
        <div className="rounded-3xl shadow-xl p-8" style={{ background: glassBg, backdropFilter: 'blur(10px)' }}>
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Table shadow */}
            <ellipse cx="90" cy="160" rx="60" ry="14" fill={accent} opacity="0.10" />
            {/* Cup */}
            <ellipse cx="90" cy="120" rx="38" ry="18" fill={accent} opacity="0.18" />
            <rect x="52" y="70" width="76" height="54" rx="27" fill={accent} />
            <ellipse cx="90" cy="70" rx="38" ry="15" fill={cardBg} />
            {/* Handle */}
            <path d="M128 100 Q150 110 128 130" stroke={accent} strokeWidth="6" fill="none" />
            {/* Steam (animated) */}
            <motion.path
              d="M80 65 Q85 45 90 65 Q95 85 100 65"
              stroke={textColor}
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0.5 }}
              animate={{ pathLength: [0, 1, 0.7, 1], opacity: [0.5, 1, 0.7, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.path
              d="M100 55 Q110 35 115 60 Q120 85 125 60"
              stroke={textColor}
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0.4 }}
              animate={{ pathLength: [0, 1, 0.8, 1], opacity: [0.4, 1, 0.6, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
            />
            {/* Beans */}
            <motion.ellipse
              cx="65" cy="110" rx="7" ry="4" fill={palette.mutedGold}
              initial={{ y: 0 }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              opacity="0.7"
            />
            <motion.ellipse
              cx="115" cy="130" rx="6" ry="3.5" fill={palette.coffeeBrown}
              initial={{ y: 0 }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
              opacity="0.7"
            />
          </svg>
        </div>
      </motion.div>
      {/* Right: Expressive Text & Highlights */}
      <motion.div
        className="flex-1 flex flex-col items-center md:items-start"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-center md:text-left" style={{ color: headingColor }}>
          The Chamberlain Coffee Experience
        </h2>
        <p className="text-lg font-body mb-4 text-center md:text-left" style={{ color: textColor, maxWidth: 480 }}>
          More than just a cup—Chamberlain Coffee is a daily ritual, a cozy moment, and a community. Our blends are crafted to spark joy, fuel creativity, and bring people together. Whether you’re starting your day or winding down, every sip is an invitation to savor life’s little pleasures.
        </p>
        <p className="text-base font-body mb-6 text-center md:text-left" style={{ color: textColor, opacity: 0.85, maxWidth: 480 }}>
          Join the Brew Crew and discover bold flavors, sustainable practices, and a welcoming community that celebrates every coffee lover’s journey.
        </p>
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {highlights.map(h => (
            <div key={h.label} className="flex items-center gap-2 px-4 py-2 rounded-xl shadow font-semibold font-body text-sm" style={{ background: glassBg, color: headingColor, backdropFilter: 'blur(6px)' }}>
              <span className="text-lg">{h.icon}</span>
              {h.label}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CoffeeExperienceShowcase; 