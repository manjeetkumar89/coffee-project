import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { FaStar, FaTag, FaShoppingCart, FaLeaf, FaSeedling, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

// SVG Tag Badge Component
function TagBadge({ icon, label, color, darkMode }) {
  // Improved adaptive color logic
  const bg = darkMode ? color.darkBg : color.lightBg;
  const text = darkMode ? color.darkText : color.lightText;
  return (
    <span
      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mr-2 mb-2 shadow-sm`}
      style={{ background: bg, color: text }}
    >
      {icon} {label}
    </span>
  );
}


export default function ProductDetails({ darkMode, palette }) {
  const { id } = useParams();
  const { products, users } = useData();
  const product = products.find(p => String(p.id) === String(id));
  const [added, setAdded] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('coffeeCart')) || [];
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1,
      });
    }
    localStorage.setItem('coffeeCart', JSON.stringify(cart));
  }

  function isUserLoggedIn() {
    const stored = JSON.parse(localStorage.getItem('coffeeUser'));
    const session = localStorage.getItem('coffeeSession');
    return stored && session === stored.email;
  }

  // --- THEME COLORS from About's hero section ---
  const bgGradient = darkMode
    ? 'linear-gradient(120deg, #18120e 0%, #231710 100%)'
    : 'linear-gradient(120deg, #f9f6f2 0%, #f5ede6 100%)';
  const headingColor = darkMode ? palette.mutedGold : palette.coffeeBrown;
  const textColor = darkMode ? palette.darkCream : palette.espresso;
  const cardBg = darkMode ? 'rgba(40,28,18,0.85)' : 'rgba(255,255,255,0.85)';
  const glassBg = darkMode ? 'rgba(49, 36, 25, 0.65)' : 'rgba(255,255,255,0.65)';
  const borderColor = darkMode ? '#bfa76a55' : '#e7b86a55';
  const dividerColor = darkMode ? '#bfa76a33' : '#e7b86a33';

  // Example product tags (now with adaptive color)
  const productTags = [
    {
      icon: <FaLeaf className="text-green-600 dark:text-green-300" />,
      label: 'Organic',
      color: {
        lightBg: 'rgba(34,197,94,0.12)',
        darkBg: 'rgba(34,197,94,0.22)',
        lightText: '#166534',
        darkText: '#bbf7d0',
      },
    },
    {
      icon: <FaSeedling className="text-lime-600 dark:text-lime-300" />,
      label: 'Vegan',
      color: {
        lightBg: 'rgba(132,204,22,0.12)',
        darkBg: 'rgba(132,204,22,0.22)',
        lightText: '#365314',
        darkText: '#d9f99d',
      },
    },
    {
      icon: <FaCheckCircle className="text-blue-500 dark:text-blue-300" />,
      label: 'Fair Trade',
      color: {
        lightBg: 'rgba(59,130,246,0.12)',
        darkBg: 'rgba(59,130,246,0.22)',
        lightText: '#1e3a8a',
        darkText: '#93c5fd',
      },
    },
  ];

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: bgGradient }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: headingColor }}>Product Not Found</h2>
        <Link to="/products" className="text-blue-500 underline">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-8 px-2 md:px-0 flex flex-col items-center relative transition-colors duration-300" style={{ background: bgGradient }}>
      {/* Animated Gold Blob for visual effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.18, scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute left-0 top-0 w-[40vw] h-[40vw] rounded-full z-0"
        style={{ background: palette.mutedGold, filter: 'blur(80px)' }}
      />
      {/* Main Product Card - Two Halves */}
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden relative mt-10 mb-8 z-10" style={{ background: cardBg, border: `1.5px solid ${borderColor}` }}>
        <div className="flex flex-col md:flex-row items-stretch justify-center p-0 md:p-0 relative">
          {/* Left: Product Image Only */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex items-center justify-center w-full md:w-1/2 p-8 md:p-10 "
            style={{ borderColor: dividerColor }}
          >
            <div className="relative w-full flex justify-center">
              {/* Animated Offer Badge on Image */}
              {product.offer && (
                <motion.span
                  initial={{ scale: 0, y: -20, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="absolute top-0 left-0 z-20 px-4 py-1 rounded-full bg-gradient-to-r from-green-200 to-green-100 text-green-800 dark:from-green-900 dark:to-green-700 dark:text-green-200 text-xs font-bold shadow-lg border border-green-300 dark:border-green-800"
                  style={{ boxShadow: '0 2px 12px 0 rgba(34,197,94,0.15)' }}
                >
                  <FaTag className="inline-block mr-1" /> {product.offer}
                </motion.span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-[420px] h-[340px] md:h-[420px] object-contain rounded-3xl border-white"
              />
            </div>
          </motion.div>
          {/* Right: Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="flex-1 flex flex-col justify-between py-10 px-6 md:px-10"
          >
            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold mb-2 font-heading drop-shadow-sm" style={{ color: headingColor }}>{product.name}</h1>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-base md:text-lg font-semibold" style={{ color: textColor }}>{product.rating}</span>
                <FaStar className="text-yellow-400" />
                <span className="text-xs px-3 py-1 rounded-xl bg-gray-200 dark:bg-[#18120e] ml-2 font-bold tracking-wide text-white dark:text-yellow-200">{product.category.replace(/\b\w/g, l => l.toUpperCase())}</span>
                {product.bestseller && (
                  <span className="inline-block px-4 py-1 rounded-full bg-yellow-200 text-yellow-800 text-xs font-bold ml-2 shadow">Bestseller</span>
                )}
              </div>
              <hr className="my-3 border-t" style={{ borderColor: dividerColor }} />
              <p className="mb-4 text-sm md:text-base font-body leading-relaxed" style={{ color: textColor }}>
                {product.description}
              </p>
              {/* Tag Badges */}
              <div className="flex flex-wrap mb-2">
                {productTags.map((tag, idx) => (
                  <TagBadge key={idx} icon={tag.icon} label={tag.label} color={tag.color} darkMode={darkMode} />
                ))}
              </div>
              {/* Price & Offer Card */}
              <div className="w-full max-w-[220px] mt-4 rounded-xl shadow-md p-3 flex flex-col items-center gap-1" style={{ background: glassBg }}>
                <div className="flex flex-col items-center w-full">
                  {/* Original Price (if discounted) */}
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xs md:text-sm line-through text-gray-400 font-semibold block text-center mb-0.5">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {/* Current Price */}
                  <span className="text-2xl md:text-3xl font-extrabold tracking-tight block text-center mb-0.5" style={{ color: headingColor }}>
                    ${product.price.toFixed(2)}
                  </span>
                  {/* You Save Badge */}
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="inline-block px-2 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 text-[11px] font-bold mt-0.5 mb-0.5">
                      You Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
              {/* Add to Cart Button */}
              <div className="w-full mt-4">
                <button
                  className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-[#e7b86a] via-[#bfa76a] to-[#6f4e37] text-white font-extrabold text-base md:text-lg shadow-md hover:scale-105 hover:shadow-lg transition-all flex items-center justify-center gap-2 min-h-[42px]"
                  style={{ background: darkMode ? 'linear-gradient(90deg,#bfa76a,#6f4e37)' : undefined, color: darkMode ? palette.espresso : undefined }}
                  onClick={() => {
                    if (!isUserLoggedIn()) {
                      setLoginMessage('Please login first to add items to cart.');
                      setTimeout(() => setLoginMessage(''), 2000);
                      return;
                    }
                    addToCart(product);
                    setAdded(true);
                    setLoginMessage("");
                    setTimeout(() => setAdded(false), 1200);
                  }}
                >
                  <FaShoppingCart className="text-lg md:text-xl" /> {added ? 'Adding!' : 'Add to Cart'}
                </button>
                {loginMessage && (
                  <div className="mt-2 text-sm text-red-600 text-center font-semibold">{loginMessage}</div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Reviews Section - now below the card */}
      <div className="w-full max-w-5xl mx-auto mt-2 rounded-2xl p-6 shadow-inner border z-10" style={{ background: glassBg, borderColor: borderColor }}>
        <h2 className="text-xl md:text-2xl font-bold mb-4 font-heading" style={{ color: headingColor }}>Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <ul className="space-y-4">
            {product.reviews.map((review, idx) => {
              const user = users && users.find(u => u.id === review.userId);
              return (
                <li key={idx} className="flex gap-4 items-start p-3 rounded-xl border shadow-sm" style={{ background: cardBg, borderColor: borderColor }}>
                  <img
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}`}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-yellow-300 dark:border-yellow-700 shadow"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-base" style={{ color: textColor }}>{review.name}</span>
                      <span className="text-xs text-gray-400">({review.profile})</span>
                      <FaStar className="text-yellow-400 ml-2" />
                      <span className="font-semibold text-xs" style={{ color: textColor }}>{review.rating}</span>
                    </div>
                    <p className="text-sm" style={{ color: textColor }}>{review.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm italic" style={{ color: textColor }}>No reviews yet for this product.</p>
        )}
      </div>
    </div>
  );
} 