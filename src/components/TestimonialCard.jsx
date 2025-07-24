import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const TestimonialCard = ({ name, avatar, testimonial, rating, profile, darkMode, palette }) => {
  const cardBg = darkMode
    ? 'rgba(40, 28, 18, 0.92)'
    : 'rgba(255,255,255,0.85)';
  const cardBorder = darkMode ? palette.navBorder : palette.creamBorder;
  const cardShadow = darkMode
    ? '0 2px 12px 0 #00065'
    : '0 2px 12px 0 rgba(111, 78, 55, 0.08)';

  // Fluid gradient hover effect
  const cardRef = useRef();
  const [gradient, setGradient] = useState(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGradient({ x, y });
  };
  const handleMouseLeave = () => setGradient(null);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ scale: 1.04, boxShadow: '0 4px 24px 0 rgba(231,184,106,0.18)' }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', duration: 0.8 }}
      className="relative p-7 rounded-3xl shadow-xl flex flex-col items-center gap-3 backdrop-blur-lg overflow-hidden"
      style={{
        background: cardBg,
        border: `1.5px solid ${cardBorder}`,
        boxShadow: cardShadow,
        minWidth: 270,
        maxWidth: 340,
        cursor: 'pointer',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Fluid gradient overlay */}
      {gradient && (
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: `radial-gradient(350px circle at ${gradient.x}px ${gradient.y}px, ${darkMode ? palette.mutedGold + '55' : palette.coffeeBrown + '40'} 0%, ${darkMode ? palette.mutedGold + '00' : palette.coffeeBrown + '00'} 80%)`,
            mixBlendMode: darkMode ? 'lighten' : 'multiply',
            transition: 'background 0.2s',
          }}
        />
      )}
      {/* User profile at top */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full object-cover border"
          style={{ borderColor: palette.mutedGold }}
        />
        <div className="flex flex-col">
          <h4 className="font-bold text-sm font-heading" style={{ color: darkMode ? palette.mutedGold : palette.coffeeBrown }}>{name}</h4>
          <span className="text-xs opacity-70 font-body" style={{ color: darkMode ? palette.darkCream : palette.espresso }}>{profile}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 mb-1">
        {[...Array(Math.round(rating))].map((_, i) => (
          <FaStar key={i} className="text-sm" style={{ color: palette.mutedGold }} />
        ))}
        <span className="text-xs font-semibold ml-1" style={{ color: darkMode ? palette.darkCream : palette.espresso }}>{rating.toFixed(1)}</span>
      </div>
      <p className="italic text-center text-base font-body" style={{ color: darkMode ? palette.darkCream : palette.espresso }}>
        "{testimonial}"
      </p>
    </motion.div>
  );
};

export default TestimonialCard; 