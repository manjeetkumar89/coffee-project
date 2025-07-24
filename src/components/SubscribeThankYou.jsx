import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function SubscribeThankYou({ open, onClose, darkMode, palette }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, type: 'spring' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, type: 'spring' }}
            className="rounded-3xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center text-center relative"
            style={{ background: darkMode ? palette.cardBg || '#231710' : 'rgba(255,255,255,0.97)', border: `2px solid ${palette.mutedGold}` }}
            onClick={e => e.stopPropagation()}
          >
            <span className="text-4xl mb-4">☕✨</span>
            <h2 className="text-2xl font-bold mb-2 font-heading" style={{ color: darkMode ? palette.mutedGold : palette.coffeeBrown }}>Thank You for Subscribing!</h2>
            <p className="mb-4 font-body" style={{ color: darkMode ? palette.darkCream : palette.espresso }}>
              You’re officially part of the Brew Crew!<br />
              Get ready for exclusive sips, secret deals, and a little more joy in your inbox.<br />
              <span className="font-semibold">Stay caffeinated, stay inspired! 🚀</span>
            </p>
            <button
              className="mt-2 px-6 py-2 rounded-full font-semibold font-body shadow transition-all"
              style={{ background: palette.buttonBg, color: palette.buttonText, border: `1.5px solid ${palette.mutedGold}` }}
              onClick={onClose}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 