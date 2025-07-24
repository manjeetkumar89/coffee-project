import React from 'react';
import { motion } from 'framer-motion';
import fallBackImage from '../assets/productImages/fallback.avif'

const BestSellerCard = ({ id, name, description, image, rating, reviews, darkMode, palette, bestseller }) => {
  const cardBg = darkMode
    ? 'rgba(40, 28, 18, 0.92)'
    : 'rgba(255,255,255,0.85)';
  const cardShadow = darkMode
    ? '0 2px 12px 0 #00065'
    : '0 2px 12px 0 rgba(111, 78, 55, 0.08)';
  const tagBg = darkMode ? 'rgba(191, 167, 106, 0.18)' : 'rgba(231, 184, 106, 0.18)';
  const tagText = palette.mutedGold;

  // Shine gradient and effect for each mode
  const shineGradient = darkMode
    ? `linear-gradient(120deg, rgba(191,167,106,0.04) 0%, ${palette.mutedGold}33 45%, ${palette.mutedGold}66 50%, ${palette.mutedGold}33 55%, rgba(191,167,106,0.04) 100%)`
    : `linear-gradient(120deg, rgba(255,255,255,0.10) 0%, #fff6 40%, ${palette.mutedGold}99 50%, #fff6 60%, rgba(255,255,255,0.10) 100%)`;
  const shineBlur = darkMode ? '2.5px' : '1.2px';
  const shineOpacity = darkMode ? 0.7 : 0.85;
  const shineDuration = '3.2s';

  // Helper to truncate description to 20 words
  function truncateDescription(desc, wordLimit = 20) {
    if (!desc) return '';
    const words = desc.split(' ');
    // Always add three dots if trimmed
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : desc + (words.length === wordLimit ? '...' : '');
  }

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="relative p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow gsap-card flex flex-col items-center gap-2"
      style={{
        background: cardBg,
        backdropFilter: 'blur(10px)',
        //border: `1.5px solid ${cardBorder}`,
        boxShadow: cardShadow,
      }}
    >
      {bestseller && (
        <motion.span
          whileHover={{ scale: 1.08, filter: 'brightness(1.08)' }}
          className="absolute left-4 top-4 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow overflow-hidden font-body"
          style={{
            background: tagBg,
            color: tagText,
            border: `1px solid ${palette.mutedGold}`,
            letterSpacing: '0.04em',
            position: 'absolute', // ensure absolute
            left: '1rem', // left-4
            top: '1rem', // top-4
            zIndex: 2,
            minWidth: '80px',
            textAlign: 'center',
          }}
        >
          Bestseller
          {/* Smoother, theme-aware Glazing Shine Effect */}
          <span
            style={{
              position: 'absolute',
              left: '-100%',
              top: 0,
              width: '250%',
              height: '100%',
              background: shineGradient,
              transform: 'skewX(-20deg)',
              pointerEvents: 'none',
              animation: `shine ${shineDuration} cubic-bezier(0.4,0,0.2,1) infinite`,
              borderRadius: 'inherit',
              filter: `blur(${shineBlur})`,
              opacity: shineOpacity,
            }}
          />
          <style>{`
            @keyframes shine {
              0% { left: -100%; opacity: 0.4; }
              10% { opacity: 0.85; }
              60% { left: 120%; opacity: 0.85; }
              100% { left: 120%; opacity: 0.4; }
            }
          `}</style>
        </motion.span>
      )}
      <img
        src={image || fallBackImage}
        alt={name || 'Coffee Bag'}
        className="w-full h-56 object-contain mb-4"
      />
      {/* Lower content wrapper */}
      <div className="flex flex-col items-center gap-1 w-full">
        <h3 className="text-xl font-semibold mb-2 font-heading" style={{ color: darkMode ? palette.mutedGold : palette.coffeeBrown }}>
          {name || 'Coffee Blend'}
        </h3>
        <p className="text-sm mb-4 text-center font-body w-[80%]" style={{ color: darkMode ? palette.darkCream : palette.espresso }}>
          {truncateDescription(description || 'Smooth, nutty, and bold — the perfect wake-up call.', 20)}
        </p>
        <button
          className="font-semibold hover:underline font-body cursor-pointer"
          style={{ color: palette.mutedGold }}
        >
          View Product
        </button>
      </div>
    </motion.div>
  );
};

export default BestSellerCard;