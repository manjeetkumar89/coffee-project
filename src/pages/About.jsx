import React from 'react';
import { motion } from 'framer-motion';
import { FaCoffee, FaStar, FaLeaf, FaHeart, FaUsers, FaGlobe, FaCheckCircle } from 'react-icons/fa';
import emma from '../assets/productImages/emma.avif'

const timeline = [
  {
    key: 'about',
    icon: <FaCoffee size={28} className="text-[#e7b86a]" />,
    title: 'A Passion for Coffee',
    text: 'Chamberlain Coffee was born from a love for coffee and a desire to make every cup a moment to savor. Founded by Emma Chamberlain, our journey began with a simple idea: coffee should be fun, ethical, and delicious for everyone.'
  },
  {
    key: 'why',
    icon: <FaHeart size={28} className="text-pink-400" />,
    title: 'Why Chamberlain Coffee?',
    text: 'We believe coffee is about connection. Our blends are crafted for every mood, every moment, and every member of our brew crew. We care about the planet, our farmers, and you.'
  },
  {
    key: 'quality',
    icon: <FaStar size={28} className="text-yellow-400" />,
    title: 'Serious About Quality',
    text: 'Quality isn’t just a word—it’s our promise. From ethically sourced beans to meticulous roasting, every step is handled with care. We taste, test, and tweak until every blend is perfect.'
  },
];

const values = [
  {
    icon: <FaGlobe size={24} className="text-green-500" />,
    label: 'Ethically Sourced',
    desc: 'We partner with farms that care for the earth and their workers.'
  },
  {
    icon: <FaCheckCircle size={24} className="text-[#e7b86a]" />,
    label: 'Quality Obsessed',
    desc: 'Every batch is roasted to perfection and taste-tested.'
  },
  {
    icon: <FaUsers size={24} className="text-pink-400" />,
    label: 'Community Driven',
    desc: 'We’re a crew of coffee lovers, dreamers, and doers.'
  },
];

const About = ({ darkMode, palette }) => {
  const bgGradient = darkMode
    ? 'linear-gradient(120deg, #18120e 0%, #231710 100%)'
    : 'linear-gradient(120deg, #f9f6f2 0%, #f5ede6 100%)';
  const headingColor = darkMode ? palette.mutedGold : palette.coffeeBrown;
  const textColor = darkMode ? palette.darkCream : palette.espresso;
  const cardBg = darkMode ? 'rgba(40,28,18,0.85)' : 'rgba(255,255,255,0.85)';
  const glassBg = darkMode ? 'rgba(40,28,18,0.65)' : 'rgba(255,255,255,0.65)';
  const founderBg = darkMode ? 'rgba(35,23,16,0.80)' : 'rgba(255,255,255,0.80)';

  return (
    <div
      className="min-h-screen w-full transition-colors duration-300"
      style={{ background: bgGradient }}
    >
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-center font-heading mb-6 tracking-tight" style={{ color: headingColor }}>
            The Chamberlain Story
          </h1>
          <p className="text-lg md:text-2xl text-center font-body max-w-2xl mx-auto mb-8" style={{ color: textColor, fontWeight: 500 }}>
            Sip, savor, and smile—discover the journey behind Chamberlain Coffee.
          </p>
        </motion.div>
        {/* Animated Blobs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25, scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute left-0 top-0 w-[40vw] h-[40vw] rounded-full bg-[#e7b86a] blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.18, scale: [1, 1.12, 1] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute right-0 bottom-0 w-[32vw] h-[32vw] rounded-full bg-pink-300 blur-3xl"
        />
      </section>

      {/* Timeline Section */}
      <section className="max-w-3xl mx-auto w-full flex flex-col gap-16 px-4 pb-20">
        <div className="relative border-l-3 border-[#e7b86a]/40 dark:border-[#bfa76a]/40 ml-6 pt-15">
          {timeline.map((point, idx) => (
            <motion.div
              key={point.key}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.7, delay: idx * 0.2 }}
              className="relative mb-16 pl-12"
            >
              <div className="absolute -left-5.5 top-2 bg-white dark:bg-[#231710] border-2 border-[#e7b86a] dark:border-[#bfa76a] w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                {point.icon}
               </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold font-heading mb-2" style={{ color: headingColor }}>{point.title}</h2>
                <p className="text-sm md:text-base font-body" style={{ color: textColor, fontWeight: 500, lineHeight: 1.7 }}>{point.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Values Section */}
      <section className="max-w-5xl mx-auto w-full flex flex-col items-center gap-10 px-4 pb-20">
        <h3 className="text-3xl md:text-4xl font-bold font-heading mb-6 text-center" style={{ color: headingColor }}>
          What Makes Us Special
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {values.map((val, idx) => (
            <motion.div
              key={val.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="rounded-2xl p-8 flex flex-col items-center gap-3 shadow-xl backdrop-blur-md"
              style={{ background: glassBg }}
            >
              {val.icon}
              <div className="text-lg font-bold font-heading mb-1" style={{ color: headingColor }}>{val.label}</div>
              <div className="text-sm text-center font-body" style={{ color: textColor }}>{val.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Founder Highlight */}
      <section className="max-w-3xl mx-auto w-full flex flex-col items-center gap-6 px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl shadow-xl px-8 py-10 flex flex-col items-center gap-4"
          style={{ background: founderBg }}
        >
          <img
            src={emma}
            alt="Emma Chamberlain"
            className="w-24 h-24 rounded-full object-cover border-4 border-[#e7b86a] mb-2 shadow-lg"
          />
          <div className="text-xl font-bold font-heading mb-1" style={{ color: headingColor }}>Emma Chamberlain</div>
          <div className="text-sm text-center font-body mb-2" style={{ color: textColor }}>
            “Coffee is more than a drink—it's a ritual, a community, and a source of joy. I started Chamberlain Coffee to share that joy with the world.”
          </div>
          <div className="italic text-xs font-body opacity-60" style={{ color: textColor }}>Founder, Chamberlain Coffee</div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="w-full flex flex-col items-center justify-center pb-24 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.7 }}
          className="rounded-full px-8 py-5 shadow-2xl font-heading text-xl md:text-2xl font-bold text-center cursor-pointer hover:scale-105 transition-transform"
          style={{ background: headingColor, color: darkMode ? palette.darkEspresso : 'white', letterSpacing: '-0.01em' }}
        >
          Join the Brew Crew
        </motion.div>
      </section>
    </div>
  );
};

export default About;
