import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCoffeeCup = ({ darkMode, palette }) => {
  const cupColor = darkMode ? palette.mutedGold : palette.coffeeBrown;
  const steamColor = darkMode ? palette.darkCream : palette.espresso;
  const bg = darkMode ? 'rgba(40,28,18,0.65)' : 'rgba(255,255,255,0.65)';
  const textColor = darkMode ? palette.darkCream : palette.espresso;
  const accent = darkMode ? palette.mutedGold : palette.coffeeBrown;

  return (
    <section className="w-full flex flex-col items-center justify-center py-16 px-4">
      <div
        className="rounded-3xl shadow-xl flex flex-col items-center justify-center p-10 mb-4"
        style={{ background: bg, backdropFilter: 'blur(10px)' }}
      >
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cup */}
          <ellipse cx="45" cy="70" rx="24" ry="10" fill={cupColor} opacity="0.18" />
          <rect x="25" y="40" width="40" height="28" rx="14" fill={cupColor} />
          <ellipse cx="45" cy="40" rx="20" ry="8" fill={accent} />
          {/* Handle */}
          <path d="M65 54 Q75 58 65 68" stroke={cupColor} strokeWidth="4" fill="none" />
          {/* Steam (animated) */}
          <motion.path
            d="M38 36 Q40 28 45 36 Q50 44 52 36"
            stroke={steamColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0.5 }}
            animate={{ pathLength: [0, 1, 0.7, 1], opacity: [0.5, 1, 0.7, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M48 32 Q50 24 55 32 Q60 40 58 32"
            stroke={steamColor}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0.4 }}
            animate={{ pathLength: [0, 1, 0.8, 1], opacity: [0.4, 1, 0.6, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
          />
        </svg>
      </div>
      <motion.div
        className="text-xl md:text-2xl font-heading text-center font-semibold"
        style={{ color: textColor, letterSpacing: '-0.01em' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.7 }}
      >
        Brew moments. Savor life.
      </motion.div>
    </section>
  );
};

export default AnimatedCoffeeCup; 