import React from 'react';
import { motion } from 'framer-motion';

const ChamberlainLogo = ({ color, accentColor, isHovered }) => (
  <svg width="180" height="40" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Coffee Cup Base */}
    <motion.path
      d="M8 28C8 25.7909 9.79086 24 12 24H16C18.2091 24 20 25.7909 20 28V32H8V28Z"
      fill={color}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
    {/* Coffee Cup Handle */}
    <motion.path
      d="M20 30C20 30 22 30 22 28C22 26 20 26 20 26"
      stroke={color}
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
    />
    {/* Steam Animation */}
    <motion.path
      d="M12 22C12 22 11 20 12 18C13 16 14 18 14 20"
      stroke={accentColor}
      strokeWidth="1.5"
      fill="none"
      initial={{ opacity: 0, y: 0 }}
      animate={{ 
        opacity: [0, 1, 0], 
        y: [0, -8, -16],
        x: [0, 2, -1]
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity, 
        ease: "easeOut" 
      }}
    />
    <motion.path
      d="M16 22C16 22 15 20 16 18C17 16 18 18 18 20"
      stroke={accentColor}
      strokeWidth="1.5"
      fill="none"
      initial={{ opacity: 0, y: 0 }}
      animate={{ 
        opacity: [0, 1, 0], 
        y: [0, -6, -12],
        x: [0, -1, 1]
      }}
      transition={{ 
        duration: 2, 
        delay: 0.3,
        repeat: Infinity, 
        ease: "easeOut" 
      }}
    />
    {/* Coffee Liquid */}
    <motion.rect
      x="10"
      y="26"
      width="8"
      height="4"
      fill={accentColor}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
    />
    {/* Chamberlain Text */}
    <motion.text
      x="32"
      y="18"
      fontSize="14"
      fontWeight="700"
      fill={color}
      fontFamily="system-ui, -apple-system, sans-serif"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      CHAMBERLAIN
    </motion.text>
    {/* Coffee Text */}
    <motion.text
      x="32"
      y="32"
      fontSize="10"
      fontWeight="500"
      fill={color}
      opacity="0.7"
      fontFamily="system-ui, -apple-system, sans-serif"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 0.7, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      COFFEE
    </motion.text>
    {/* Premium Accent Line */}
    <motion.line
      x1="32"
      y1="20"
      x2="150"
      y2="20"
      stroke={accentColor}
      strokeWidth="1"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1, delay: 1, ease: "easeOut" }}
    />
    {/* Floating Coffee Beans */}
    <motion.circle
      cx="160"
      cy="15"
      r="2"
      fill={accentColor}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0], 
        scale: [0, 1, 0],
        y: [0, -5, 0]
      }}
      transition={{ 
        duration: 3, 
        delay: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.circle
      cx="165"
      cy="12"
      r="1.5"
      fill={accentColor}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0], 
        scale: [0, 1, 0],
        y: [0, -3, 0]
      }}
      transition={{ 
        duration: 2.5, 
        delay: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  </svg>
);

export default ChamberlainLogo; 