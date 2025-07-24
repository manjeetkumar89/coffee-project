import React, { useRef, Suspense, lazy } from 'react';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';
import { FaLeaf, FaSnowflake, FaCoffee } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

const BestSellerCard = lazy(() => import('../components/BestSellerCard'));

const categoryInfo = {
  'coffee beans': {
    heading: 'Coffee Beans',
    description: 'Discover our premium selection of coffee beans, roasted to perfection for every coffee lover. From bold espresso to smooth vanilla, find your perfect blend.',
  },
  'cold brew': {
    heading: 'Cold Brew',
    description: 'Refresh yourself with our cold brew collection. Crafted for smoothness and bold flavor, perfect for hot days or a cool pick-me-up.',
  },
  'matcha': {
    heading: 'Matcha',
    description: 'Experience the vibrant taste of our matcha range. Sourced from the finest Japanese tea leaves, our matcha is perfect for lattes, iced drinks, and more.',
  },
};

const Products = ({ darkMode, palette }) => {
  const { products } = useData();
  const sliderRefs = useRef({});

  // Group products by category
  const categories = ['coffee beans', 'cold brew', 'matcha'];

  // Handle mouse wheel for horizontal scroll
  const handleWheel = (e, cat) => {
    const slider = sliderRefs.current[cat];
    if (slider) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        slider.scrollLeft += e.deltaY;
      }
    }
  };

  // Set background and text colors for dark and light mode
  const bg = darkMode
    ? 'linear-gradient(to bottom, #18120e 0%, #231710 100%)'
    : 'linear-gradient(to bottom, #FFF9F2 0%, #f5ede6 100%)';
  const headingColor = darkMode ? palette.mutedGold : palette.coffeeBrown;
  const subTextColor = darkMode ? palette.darkCream : palette.espresso;
  const cardBg = darkMode ? palette.cardBg : palette.creamGlass;
  const cardBorder = darkMode ? palette.creamBorder : palette.creamBorder;

  // Section info
  const sections = [
    {
      key: 'coffee beans',
      heading: 'Coffee Beans',
      description: 'Discover our premium selection of coffee beans, roasted to perfection for every coffee lover. From bold espresso to smooth vanilla, find your perfect blend.',
      icon: <FaCoffee size={36} className="text-[#6f4e37]" />,
      blob: (
        <svg className="absolute -top-8 -left-8 w-40 h-32 opacity-30 -z-10" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="100" cy="60" rx="100" ry="60" fill="#e7b86a" />
        </svg>
      ),
    },
    {
      key: 'cold brew',
      heading: 'Cold Brew',
      description: 'Refresh yourself with our cold brew collection. Crafted for smoothness and bold flavor, perfect for hot days or a cool pick-me-up.',
      icon: <FaSnowflake size={36} className="text-[#3c2f2f]" />,
      blob: (
        <svg className="absolute -top-8 -left-8 w-40 h-32 opacity-30 -z-10" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="100" cy="60" rx="100" ry="60" fill="#bfa76a" />
        </svg>
      ),
    },
    {
      key: 'matcha',
      heading: 'Matcha',
      description: 'Experience the vibrant taste of our matcha range. Sourced from the finest Japanese tea leaves, our matcha is perfect for lattes, iced drinks, and more.',
      icon: <FaLeaf size={36} className="text-green-600" />,
      blob: (
        <svg className="absolute -top-8 -left-8 w-40 h-32 opacity-30 -z-10" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="100" cy="60" rx="100" ry="60" fill="#7fc97f" />
        </svg>
      ),
    },
  ];

  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, type: 'spring' } },
  };
  const descVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2 } },
  };

  return (
    <div
      className="min-h-screen pt-24 px-4 md:px-16 transition-colors duration-300"
      style={{ background: bg }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <h1
          className="text-4xl font-bold text-center mb-12 font-heading"
          style={{ color: headingColor }}
        >
          Our Products
        </h1>
        {sections.map((section, idx) => (
          <section key={section.key} className="pb-20 relative">
            {section.blob}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              className="relative z-10"
            >
              <div className="flex items-center gap-3 mb-2">
                {section.icon}
                <motion.h2
                  variants={headingVariants}
                  className="text-2xl md:text-3xl font-bold font-heading"
                  style={{ color: headingColor }}
                >
                  {section.heading}
                </motion.h2>
              </div>
              <motion.div variants={descVariants}>
                <p className="mb-4 text-base md:text-lg font-body" style={{ color: subTextColor }}>
                  {section.description}
                </p>
                <div className="h-1 w-24 rounded-full mb-6" style={{ background: idx === 0 ? '#e7b86a' : idx === 1 ? '#bfa76a' : '#7fc97f', opacity: 0.7 }} />
              </motion.div>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {products.filter(product => product.category === section.key).map(product => (
                <Link to={`/products/${product.id}`} key={product.id} style={{ textDecoration: 'none' }}>
                  <Suspense fallback={<Loading />}>
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
                  </Suspense>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Products; 