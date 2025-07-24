import React, { useEffect, useRef, useState, Suspense, lazy } from "react";
import { motion } from "framer-motion";
// import Tilt from 'react-parallax-tilt';
import { FaGlobe, FaHeart, FaLeaf, FaShoppingBag, FaShoppingCart, FaYoutube , FaInstagram, FaCoffee} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { useData } from '../context/DataContext';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { AnimatePresence } from 'framer-motion';
import SubscribeThankYou from '../components/SubscribeThankYou';

const BestSellerCard = lazy(() => import('../components/BestSellerCard'));
const AnimatedTestimonialRow = lazy(() => import('../components/AnimatedTestimonialRow'));
const CoffeeExperienceShowcase = lazy(() => import('../components/CoffeeExperienceShowcase'));

// import { useAnimation, useMotionValue, useTransform } from 'framer-motion';

// Palette
const coffeeBrown = '#6f4e37';
const espresso = '#3c2f2f';
const cream = '#f9f6f2';
const creamBorder = '#f5ede6';
const mutedGold = '#e7b86a';
// Add dark mode palette
const darkEspresso = '#18120e';
const darkBrown = '#231710';
const darkGold = '#bfa76a';
const darkCream = '#f5ede6';
const darkText = '#f5ede6';

export default function Home({ darkMode, setDarkMode, palette, footerRef }) {
  const { products, users } = useData();
  const heroRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const icon1Ref = useRef(null);
  const icon2Ref = useRef(null);
  const bestSellersRef = useRef(null);
  //const valuesRef = useRef(null);
  const communityRef = useRef(null);
  const newsletterRef = useRef(null);
  const blob3Ref = useRef(null);
  const icon3Ref = useRef(null);
  const icon4Ref = useRef(null);
  const [showFloatingNewsletter, setShowFloatingNewsletter] = useState(true);
  const navigate = useNavigate();
  // Popup state for subscribe
  const [showThankYou, setShowThankYou] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Update localStorage when darkMode changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    // Parallax for blobs and icons
    gsap.to(blob1Ref.current, {
      y: -40, x: 30, scale: 1.08,
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "+=600", scrub: 1 },
      ease: "power1.out"
    });
    gsap.to(blob2Ref.current, {
      y: 30, x: -40, scale: 1.12,
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "+=600", scrub: 1 },
      ease: "power1.out"
    });
    gsap.to(icon1Ref.current, {
      y: -20, x: 20, rotation: 10, scale: 1.1,
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "+=600", scrub: 1 },
      ease: "power1.out"
    });
    gsap.to(icon2Ref.current, {
      y: 20, x: -20, rotation: -8, scale: 1.08,
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "+=600", scrub: 1 },
      ease: "power1.out"
    });
    gsap.to(blob3Ref.current, {
      y: 50, x: 60, scale: 1.06,
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "+=600", scrub: 1 },
      ease: "power1.out"
    });
    gsap.to(icon3Ref.current, {
      y: -30, x: -30, rotation: 6, scale: 1.09,
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "+=600", scrub: 1 },
      ease: "power1.out"
    });
    gsap.to(icon4Ref.current, {
      y: 35, x: 35, rotation: -12, scale: 1.07,
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "+=600", scrub: 1 },
      ease: "power1.out"
    });
    // Best Sellers cards
    gsap.fromTo(
      bestSellersRef.current.querySelectorAll(".gsap-card"),
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bestSellersRef.current,
          start: "top 80%",
        },
      }
    );
    // // Values fade in
    // gsap.fromTo(
    //   valuesRef.current,
    //   { opacity: 0, y: 60 },
    //   {
    //     opacity: 1,
    //     y: 0,
    //     duration: 1,
    //     ease: "power2.out",
    //     scrollTrigger: {
    //       trigger: valuesRef.current,
    //       start: "top 90%",
    //     },
    //   }
    // );
    // Community fade in
    gsap.fromTo(
      communityRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: communityRef.current,
          start: "top 90%",
        },
      }
    );
    // Newsletter fade in
    gsap.fromTo(
      newsletterRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: newsletterRef.current,
          start: "top 95%",
        },
      }
    );
  }, []);

  useEffect(() => {
    // Intersection Observer for footer visibility
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setShowFloatingNewsletter(!entry.isIntersecting);
      },
      { root: null, threshold: 0.1 }
    );
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  // Animation variants for staggered text
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.18,
      },
    },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', duration: 1 } },
  };

  
  // Palette selection
  const bg = darkMode ? `linear-gradient(to bottom, ${darkEspresso} 0%, ${darkBrown} 100%)` : `linear-gradient(to bottom, ${cream} 0%, ${creamBorder} 100%)`;
  const headingColor = darkMode ? darkGold : coffeeBrown;
  const subTextColor = darkMode ? darkText : espresso;
  const blob1Grad = darkMode ? darkGold : mutedGold;
  const blob2Grad = darkMode ? darkBrown : coffeeBrown;
  const blob3Grad = darkMode ? darkGold : mutedGold;
  const iconMain = darkMode ? darkGold : mutedGold;
  const iconAccent = darkMode ? darkCream : coffeeBrown;
  const buttonBg = darkMode ? darkGold : mutedGold;
  const buttonText = darkMode ? darkEspresso : espresso;

  // Dummy subscribe handler
  function handleSubscribe(e) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setShowThankYou(true);
    }, 1200);
  }
  function closeThankYou() {
    setShowThankYou(false);
  }

  return (
    <div className="min-h-screen pt-20" style={{ background: bg, color: subTextColor }}>
      <div className="max-w-[120rem] mx-auto w-full px-6">
        <section
          ref={heroRef}
          className="relative flex items-center justify-center overflow-hidden min-h-screen"
        >
          {/* Dark Mode Toggle Button */}
          <button
            onClick={() => setDarkMode((d) => !d)}
            className="absolute top-4 right-4 md:top-10 md:right-10 z-20 px-3 py-2 md:px-4 md:py-2 rounded-full font-semibold font-body shadow-lg transition-all text-sm md:text-base cursor-pointer"
            style={{
              background: darkMode ? darkCream : espresso,
              color: darkMode ? darkEspresso : darkCream,
              border: `1.5px solid ${darkMode ? darkGold : mutedGold}`,
              boxShadow: '0 2px 12px 0 rgba(0,0,0,0.10)',
            }}
            aria-label="Toggle dark mode"
          >
            <span>{darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
          </button>
          {/* SVG Blobs */}
          <svg ref={blob1Ref} className="absolute left-0 top-0 z-0 w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] lg:w-[40vw] lg:h-[40vw]" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="blob1grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor={blob1Grad} stopOpacity="0.25" />
                <stop offset="100%" stopColor={darkMode ? darkEspresso : cream} stopOpacity="0.7" />
              </radialGradient>
            </defs>
            <path d="M300,60 Q420,100 500,200 Q580,300 500,400 Q420,500 300,540 Q180,500 100,400 Q20,300 100,200 Q180,100 300,60Z" fill="url(#blob1grad)" />
          </svg>
          <svg ref={blob2Ref} className="absolute right-0 bottom-0 z-0 w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] lg:w-[32vw] lg:h-[32vw]" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="blob2grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor={blob2Grad} stopOpacity="0.18" />
                <stop offset="100%" stopColor={darkMode ? darkEspresso : creamBorder} stopOpacity="0.7" />
              </radialGradient>
            </defs>
            <path d="M300,80 Q400,120 520,220 Q600,320 520,420 Q400,520 300,520 Q200,520 80,420 Q0,320 80,220 Q200,120 300,80Z" fill="url(#blob2grad)" />
          </svg>
          <svg ref={blob3Ref} className="absolute left-1/2 bottom-0 z-0 w-[50vw] h-[50vw] md:w-[32vw] md:h-[32vw]" style={{transform:'translateX(-50%)'}} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="blob3grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor={blob3Grad} stopOpacity="0.12" />
                <stop offset="100%" stopColor={darkMode ? darkEspresso : creamBorder} stopOpacity="0.5" />
              </radialGradient>
            </defs>
            <path d="M200,60 Q320,100 360,200 Q400,300 300,360 Q200,400 100,360 Q0,300 40,200 Q80,100 200,60Z" fill="url(#blob3grad)" />
          </svg>
          {/* Animated SVG Icons */}
          <svg ref={icon1Ref} className="absolute left-1/4 top-1/3 z-10 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="32" rx="24" ry="12" fill={iconMain} opacity="0.7" />
            <ellipse cx="32" cy="28" rx="8" ry="4" fill={iconAccent} opacity="0.7" />
          </svg>
          <svg ref={icon2Ref} className="absolute right-1/4 bottom-1/4 z-10 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="16" y="32" width="32" height="16" rx="8" fill={iconMain} opacity="0.6" />
            <rect x="24" y="36" width="16" height="8" rx="4" fill={iconAccent} opacity="0.7" />
          </svg>
          {/* More Animated SVG Icons */}
          <svg ref={icon3Ref} className="absolute left-4 md:left-10 bottom-1/4 z-10 w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="16" fill={iconMain} opacity="0.5" />
            <rect x="28" y="20" width="8" height="24" rx="4" fill={iconAccent} opacity="0.7" />
          </svg>
          <svg ref={icon4Ref} className="absolute right-4 md:right-10 top-1/4 z-10 w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="40" rx="12" ry="6" fill={iconMain} opacity="0.4" />
            <ellipse cx="32" cy="28" rx="6" ry="3" fill={iconAccent} opacity="0.7" />
          </svg>
          {/* Premium Decorative SVGs */}
          <motion.svg 
            className="absolute top-20 left-10 w-16 h-16 md:w-20 md:h-20 opacity-30"
            viewBox="0 0 64 64" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            <path 
              d="M32 8 L40 24 L56 24 L44 36 L48 52 L32 44 L16 52 L20 36 L8 24 L24 24 Z" 
              fill={mutedGold}
              opacity="0.6"
            />
          </motion.svg>
          
          <motion.svg 
            className="absolute bottom-20 right-10 w-12 h-12 md:w-16 md:h-16 opacity-40"
            viewBox="0 0 64 64" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            animate={{ 
              rotate: [360, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <circle cx="32" cy="32" r="16" fill={coffeeBrown} opacity="0.4" />
            <circle cx="32" cy="32" r="8" fill={mutedGold} opacity="0.6" />
          </motion.svg>
          
          <motion.svg 
            className="absolute top-1/3 right-20 w-8 h-8 md:w-12 md:h-12 opacity-50"
            viewBox="0 0 64 64" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            animate={{ 
              x: [0, 5, 0],
              y: [0, -5, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <path 
              d="M16 16 L48 16 L48 48 L16 48 Z M24 24 L40 24 L40 40 L24 40 Z" 
              fill={mutedGold}
              opacity="0.5"
            />
          </motion.svg>

          {/* Hero Content */}
          <motion.div
            className="relative z-30 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-8 sm:py-12 md:py-24"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, type: 'spring' }}
          >
            <motion.h1
              className="font-bold leading-tight tracking-tight mb-6 sm:mb-8 font-heading relative"
              style={{
                fontWeight: 400,
                fontSize: 'clamp(2rem, 7vw, 5.5rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: headingColor,
                textShadow: darkMode ? '0 2px 24px #000a' : '0 2px 24px #fff8',
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, type: 'spring' }}
            >
              <motion.span 
                initial={{ scale: 0.8 }} 
                animate={{ scale: 1 }} 
                transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
                className="relative inline-block"
              >
                Every sip tells a story.
                {/* Floating coffee beans around text */}
                <motion.div
                  className="absolute -top-4 -right-4 w-3 h-3 rounded-full"
                  style={{ background: mutedGold }}
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, 180, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-6 w-2 h-2 rounded-full"
                  style={{ background: coffeeBrown }}
                  animate={{ 
                    y: [0, 6, 0],
                    x: [0, 4, 0],
                    rotate: [0, -180, -360]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
                <motion.div
                  className="absolute top-1/2 -right-8 w-2.5 h-2.5 rounded-full"
                  style={{ background: mutedGold }}
                  animate={{ 
                    y: [0, -4, 0],
                    x: [0, -3, 0],
                    scale: [1, 0.8, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </motion.span>
            </motion.h1>
    
            <motion.p
              className="font-light mb-3 sm:mb-5 max-w-3xl font-body relative"
              style={{
                fontSize: 'clamp(0.8rem, 2.5vw, 1.5rem)',
                color: subTextColor,
                textShadow: darkMode ? '0 2px 12px #000a' : '0 2px 12px #fff8',
                marginBottom: '2rem',
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, type: 'spring' }}
            >
              <motion.span
                className="relative inline-block"
                animate={{ 
                  opacity: [0.7, 0.8, 0.7],
                  textShadow: [
                    darkMode ? '0 2px 12px #000a' : '0 2px 12px #fff8',
                    darkMode ? '0 3px 16px #000b' : '0 3px 16px #fff9',
                    darkMode ? '0 2px 12px #000a' : '0 2px 12px #fff8'
                  ]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                {/* Coffee, community, and comfort in every cup. Discover your new daily ritual—crafted for those who dare to do things differently. */}
                Chamberlain Coffee – Wake up with flavors that inspire.
              </motion.span>
            </motion.p>

            <motion.div
              className="font-light mb-2 font-body relative"
              style={{
                fontSize: 'clamp(0.5rem, 2vw, 1rem)',
                color: subTextColor,
                textShadow: darkMode ? '0 2px 16px #000a' : '0 2px 16px #fff8',
                marginBottom: '1rem',
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, type: 'spring' }}
            >
              <motion.span
                className="relative inline-block"
                animate={{ 
                  y: [0, -2, 0],
                  textShadow: [
                    darkMode ? '0 2px 16px #000a' : '0 2px 16px #fff8',
                    darkMode ? '0 4px 20px #000c' : '0 4px 20px #fff9',
                    darkMode ? '0 2px 16px #000a' : '0 2px 16px #fff8'
                  ]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                - Emma Chamberlain
              </motion.span>
              
              {/* Decorative elements */}
              <motion.div
                className="absolute -left-8 top-1/2 w-1 h-1 rounded-full"
                style={{ background: mutedGold }}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              <motion.div
                className="absolute -right-8 top-1/2 w-1 h-1 rounded-full"
                style={{ background: coffeeBrown }}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.06, y: -2, backgroundColor: buttonBg, color: buttonText, boxShadow: darkMode ? '0 8px 32px 0 #bfa76a44' : '0 8px 32px 0 rgba(231,184,106,0.18)' }}
              whileTap={{ scale: 0.98, y: 1 }}
              className="flex items-center gap-2 sm:gap-3 font-bold px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full shadow-lg transition-all mt-2 font-body cursor-pointer"
              style={{
                background: buttonBg,
                color: buttonText,
                border: `1.5px solid ${darkMode ? darkCream : coffeeBrown}`,
                fontSize: 'clamp(0.8rem, 2vw, 1.2rem)',
                boxShadow: darkMode ? '0 4px 24px 0 #bfa76a33' : '0 4px 24px 0 rgba(231, 184, 106, 0.10)',
              }}
              onClick={() => navigate('/products')}
            >
              <FaShoppingBag className="text-base sm:text-lg md:text-xl" />
              <span>Shop Now</span>
            </motion.button>
          </motion.div>
        </section>

        {/* Best Sellers */}
        <section ref={bestSellersRef} className="px-6 md:px-24 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-5 font-heading" style={{ color: darkMode ? palette.mutedGold : palette.coffeeBrown }}>Best Sellers</h2>
          <p className="text-center max-w-2xl mx-auto mb-10 text-sm md:text-lg font-body font-light" style={{ color: darkMode ? palette.darkCream : palette.espresso }}>
            Discover the blends our community can’t stop sipping. Handpicked favorites, crafted for unforgettable moments—these best sellers are the heart and soul of every coffee ritual.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            <Suspense fallback={<Loading />}>
              {products.filter(product => product.bestseller).map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <BestSellerCard
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    image={product.image}
                    rating={product.rating}
                    reviews={product.reviews}
                    darkMode={darkMode}
                    palette={palette}
                    bestseller={product.bestseller}
                  />
                </Link>
              ))}
            </Suspense>
          </div>
        </section>

        <Suspense fallback={<Loading />}>
          <CoffeeExperienceShowcase darkMode={darkMode} palette={palette} />
        </Suspense>

         {/* Modern Multi-Row Infinite Testimonial Scroller */}
         <section className="py-20 px-2 md:px-0 relative" style={{ zIndex: 2 }}>
           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-heading" style={{ color: darkMode ? palette.mutedGold : palette.coffeeBrown }}>What Our Customers Say</h2>
           <div className="relative">
             <div className="absolute inset-0 pointer-events-none" aria-hidden style={{
               background: darkMode
                 ? 'radial-gradient(circle at 50% 0%, rgba(191,167,106,0.08) 0%, transparent 80%)'
                 : 'radial-gradient(circle at 50% 0%, rgba(231,184,106,0.10) 0%, transparent 80%)',
               zIndex: 0,
             }} />
             {/* Gather all testimonials with user info */}
             {(() => {
               const allTestimonials = users.flatMap(user =>
                 user.testimonials.map((testimonial, idx) => ({
                   key: user.id + '-' + idx,
                   name: user.name,
                   avatar: user.avatar,
                   testimonial,
                   rating: user.rating,
                   profile: user.profile,
                 }))
               );
               return (
                 <Suspense fallback={<Loading />}>
                   <AnimatedTestimonialRow testimonials={allTestimonials} direction="left" darkMode={darkMode} palette={palette} />
                   <AnimatedTestimonialRow testimonials={allTestimonials} direction="right" darkMode={darkMode} palette={palette} />
                 </Suspense>
               );
             })()}
           </div>
         </section>

        {/* Community / Lifestyle */}
        <section ref={communityRef} className="px-6 md:px-24 py-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading" style={{ color: darkMode ? palette.mutedGold : palette.coffeeBrown }}>#BrewCrew Community</h2>
            <p className="text-lg mb-6 font-body" style={{ color: darkMode ? palette.darkCream : palette.espresso }}>
              Join our vibrant community! Tag <a href="https://www.instagram.com/chamberlaincoffee/" className="font-bold" style={{ color: darkMode ? palette.mutedGold : palette.coffeeBrown }}>@chamberlaincoffee</a> for a chance to be featured.
            </p>
            <div className="flex gap-4">
              <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=200&q=80" alt="Community 1" className="w-20 h-20 rounded-xl object-cover shadow" />
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80" alt="Community 2" className="w-20 h-20 rounded-xl object-cover shadow" />
              <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80" alt="Community 3" className="w-20 h-20 rounded-xl object-cover shadow" />
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="rounded-3xl p-8 shadow-xl w-full max-w-xs flex flex-col items-center"
              style={{ background: darkMode ? palette.cardBg : 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', border: `1.5px solid ${palette.creamBorder}` }}>
              <h3 className="text-xl font-bold mb-2 font-heading" style={{ color: darkMode ? palette.mutedGold : palette.coffeeBrown }}>Join the Brew Crew ☕</h3>
              <p className="mb-4 text-center font-body" style={{ color: darkMode ? palette.darkCream : palette.espresso }}>Get weekly coffee drops, behind-the-scenes fun, and exclusive deals. No spam, just sips.</p>
              <form className="flex flex-col gap-3 w-full" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="px-4 py-2 rounded-md border w-full"
                  style={{ borderColor: palette.creamBorder, background: darkMode ? palette.darkBrown : palette.cream, color: darkMode ? palette.darkCream : palette.espresso }}
                  disabled={submitting}
                />
                <button
                  type="submit"
                  className="py-2 px-6 rounded-md font-semibold font-body cursor-pointer"
                  style={{ background: palette.buttonBg, color: palette.buttonText, border: `1.5px solid ${palette.mutedGold}` }}
                  disabled={submitting}
                >
                  {submitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Newsletter Signup (floating glassy card) */}
        {showFloatingNewsletter && (
          <section ref={newsletterRef} className="fixed bottom-8 right-8 z-20 hidden md:block">
            <div className="rounded-2xl shadow-2xl px-8 py-6 flex flex-col items-center border"
              style={{ background: darkMode ? palette.creamGlass : 'rgba(255,255,255,0.8)', backdropFilter: 'blur(15px)', borderColor: palette.creamBorder }}>
              <h4 className="font-bold text-lg mb-2" style={{ color: darkMode ? palette.mutedGold : palette.coffeeBrown }}>Stay in the Loop</h4>
              <form className="flex gap-2" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Email address"
                  className="px-4 py-2 rounded-md border"
                  style={{ borderColor: palette.creamBorder, background: darkMode ? palette.darkBrown : palette.cream, color: darkMode ? palette.darkCream : palette.espresso }}
                  disabled={submitting}
                />
                <button
                  type="submit"
                  className="py-2 px-4 rounded-md font-semibold cursor-pointer"
                  style={{ background: palette.buttonBg, color: palette.buttonText, border: `1.5px solid ${palette.mutedGold}` }}
                  disabled={submitting}
                >
                  {submitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </div>
          </section>
        )}
      </div>
      <SubscribeThankYou open={showThankYou} onClose={closeThankYou} darkMode={darkMode} palette={palette} />
    </div>
  );
}
