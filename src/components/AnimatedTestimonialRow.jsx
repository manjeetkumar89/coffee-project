import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import TestimonialCard from './TestimonialCard';

const AnimatedTestimonialRow = ({ testimonials, direction = 'left', darkMode, palette }) => {
  const [isPaused, setIsPaused] = useState(false);
  const x = useMotionValue(0);
  const controls = useAnimation();
  const CARD_WIDTH = 360; // px (card + gap)
  const TOTAL_WIDTH = CARD_WIDTH * testimonials.length * 2;
  // Duplicate testimonials for seamless loop
  const rowTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: direction === 'left' ? [-TOTAL_WIDTH / 2, 0] : [0, -TOTAL_WIDTH / 2],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 40,
            ease: 'linear',
          },
        },
      });
    } else {
      controls.stop();
    }
  }, [isPaused, controls, TOTAL_WIDTH, direction]);

  return (
    <div className="overflow-hidden relative">
      {/* Left smoky fade */}
      <div 
        className="absolute left-0 top-0 w-20 h-full z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to right, ${darkMode ? 'rgb(30, 21, 14)' : 'rgba(249, 246, 242, 1)'} 0%, ${darkMode ? 'rgba(24, 18, 14, 0.8)' : 'rgba(249, 246, 242, 0.8)'} 30%, ${darkMode ? 'rgba(24, 18, 14, 0)' : 'rgba(249, 246, 242, 0)'} 100%)`,
        }}
      />
      {/* Right smoky fade */}
      <div 
        className="absolute right-0 top-0 w-20 h-full z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to left, ${darkMode ? 'rgb(30, 21, 14)' : 'rgba(249, 246, 242, 1)'} 0%, ${darkMode ? 'rgba(24, 18, 14, 0.8)' : 'rgba(249, 246, 242, 0.8)'} 30%, ${darkMode ? 'rgba(24, 18, 14, 0)' : 'rgba(249, 246, 242, 0)'} 100%)`,
        }}
      />
      <motion.div
        className="flex gap-8 py-8"
        style={{ x, cursor: isPaused ? 'pointer' : 'grab', willChange: 'transform' }}
        animate={controls}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {rowTestimonials.map((t, i) => (
          <TestimonialCard
            key={t.key + '-' + i + '-' + direction}
            name={t.name}
            avatar={t.avatar}
            testimonial={t.testimonial}
            rating={t.rating}
            profile={t.profile}
            darkMode={darkMode}
            palette={palette}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default AnimatedTestimonialRow; 