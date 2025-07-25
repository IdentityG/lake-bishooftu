'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Star, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const menuBook = {
  breakfast: [
    {
      title: 'Injera Royale Platter',
      description: 'Artisan injera with shiro, gomen, and ayib',
      price: '350 ETB',
      rating: 4.9,
    },
    {
      title: 'Lake Sunrise Omelette',
      description: 'Organic eggs, feta, herbs, tomato confit',
      price: '280 ETB',
      rating: 4.8,
    },
    {
      title: 'Teff Pancakes',
      description: 'With local honey, cardamom, and fresh berries',
      price: '220 ETB',
      rating: 4.7,
    },
    {
      title: 'Ethiopian Coffee Ritual',
      description: 'Freshly roasted beans, served with popcorn',
      price: '150 ETB',
      rating: 5.0,
    },
    {
      title: 'Chechebsa',
      description: 'Flatbread with berbere and niter kibbeh, topped with yogurt',
      price: '200 ETB',
      rating: 4.6,
    },
    {
      title: 'Kinche',
      description: 'Cracked wheat with butter and spices, served with ayib',
      price: '180 ETB',
      rating: 4.5,
    },
    {
      title: 'Fir Fir',
      description: 'Torn injera with spicy berbere sauce and onions',
      price: '230 ETB',
      rating: 4.7,
    },
  ],
  lunch: [
    {
      title: 'Signature Tibs',
      description: 'Prime beef, berbere, rosemary, injera',
      price: '450 ETB',
      rating: 5.0,
    },
    {
      title: 'Grilled Tilapia',
      description: 'Lake-caught, lemon butter, garden herbs',
      price: '520 ETB',
      rating: 4.9,
    },
    {
      title: 'Vegetarian Gojo',
      description: 'Seasonal veggies, lentil sambusas, shiro',
      price: '380 ETB',
      rating: 4.8,
    },
    {
      title: 'Dulet',
      description: 'Minced tripe, liver, chili, mitmita',
      price: '420 ETB',
      rating: 4.7,
    },
    {
      title: 'Beyaynetu',
      description: 'Assorted vegetarian stews with injera and salad',
      price: '400 ETB',
      rating: 4.8,
    },
    {
      title: 'Key Wat',
      description: 'Spicy beef stew with berbere, served with injera',
      price: '480 ETB',
      rating: 4.9,
    },
    {
      title: 'Kitfo',
      description: 'Minced raw beef with mitmita and spiced butter',
      price: '550 ETB',
      rating: 4.9,
    },
  ],
  dinner: [
    {
      title: 'Doro Wat',
      description: 'Slow-cooked chicken, berbere, injera, egg',
      price: '580 ETB',
      rating: 5.0,
    },
    {
      title: 'Kitfo Special',
      description: 'Hand-minced beef, niter kibbeh, ayib',
      price: '550 ETB',
      rating: 4.9,
    },
    {
      title: 'Lamb Beg Wot',
      description: 'Tender lamb, turmeric, ginger, rosemary',
      price: '620 ETB',
      rating: 5.0,
    },
    {
      title: 'Vegan Beyaynetu',
      description: 'Seven vegetarian stews, injera, salad',
      price: '480 ETB',
      rating: 4.8,
    },
    {
      title: 'Awaze Tibs',
      description: 'Beef cubes with spicy awaze sauce and peppers',
      price: '600 ETB',
      rating: 4.9,
    },
    {
      title: 'Shint Tibs',
      description: 'Rib-eye strips with onions, jalapeños, rosemary',
      price: '700 ETB',
      rating: 5.0,
    },
    {
      title: 'Misir Wot Platter',
      description: 'Spicy lentil stew with injera and sides',
      price: '450 ETB',
      rating: 4.8,
    },
  ],
};

export default function MenuDesign() {
  const [currentPage, setCurrentPage] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.book-container', {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.book-container',
          start: 'top 70%',
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const pageVariants = {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
  };

  return (
    <section className="relative min-h-screen bg-[#F9FAFB] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Lake Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, #1E3A8A 0%, transparent 50%), radial-gradient(circle at 80% 80%, #D4A017 0%, transparent 50%), radial-gradient(circle at 40% 20%, #166534 0%, transparent 50%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-5xl md:text-7xl font-bold text-[#111827] mb-4">
            Our Menu Book
          </h2>
          <p className="text-xl text-[#6B7280]">Flavors of Ethiopia, opened like never before</p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-full p-1 shadow-xl">
            {(['breakfast', 'lunch', 'dinner'] as const).map((meal) => (
              <button
                key={meal}
                onClick={() => setCurrentPage(meal)}
                className={`relative px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  currentPage === meal ? 'text-white' : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                {currentPage === meal && (
                  <motion.div
                    layoutId="pageIndicator"
                    className="absolute inset-0 bg-[#1E3A8A] rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 capitalize">{meal}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Book Container */}
        <div className="book-container perspective-1000">
          <div className="flex justify-center">
            <div className="relative w-full max-w-6xl">
              {/* Book Spine */}
              <div className="absolute left-1/2 top-0 bottom-0 w-8 bg-gradient-to-r from-[#D4A017] to-[#b38c12] transform -translate-x-1/2 shadow-2xl rounded-full z-10 md:block hidden" />

              {/* Pages Wrapper */}
              <div className="flex flex-col md:flex-row h-full">
                {/* Left Page */}
                <motion.div
                  ref={leftRef}
                  className="w-full md:w-1/2 pr-4 flex-1"
                  initial={{ rotateY: 15 }}
                  animate={{ rotateY: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="bg-white rounded-l-3xl shadow-2xl p-6 sm:p-8 min-h-[600px] relative">
                    <div className="absolute inset-0 rounded-l-3xl bg-gradient-to-r from-[#D4A017]/10 to-transparent" />
                    <div className="relative z-10">
                      <BookOpen className="w-6 h-6 text-[#1E3A8A] mb-4" />
                      <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#111827] mb-6 capitalize">
                        {currentPage}
                      </h3>
                      <AnimatePresence mode="wait">
                        {menuBook[currentPage].filter((_, idx) => idx % 2 === 0).map((item, idx) => (
                          <motion.div
                            key={`${currentPage}-${item.title}-${idx}`}
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            onMouseEnter={() => setHoveredIndex(idx * 2)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="mb-4 sm:mb-6 group"
                          >
                            <div className="flex justify-between items-start mb-1 sm:mb-2">
                              <h4 className="font-playfair text-lg sm:text-xl font-bold text-[#111827] group-hover:text-[#1E3A8A] transition-colors">
                                {item.title}
                              </h4>
                              <span className="font-bold text-[#D4A017]">{item.price}</span>
                            </div>
                            <p className="text-sm sm:text-base text-[#6B7280] mb-1 sm:mb-2">{item.description}</p>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 sm:w-4 h-3 sm:h-4 text-[#D4A017] fill-current" />
                              <span className="text-xs sm:text-sm text-[#6B7280]">{item.rating}</span>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>

                {/* Right Page */}
                <motion.div
                  ref={rightRef}
                  className="w-full md:w-1/2 pl-4 flex-1"
                  initial={{ rotateY: -15 }}
                  animate={{ rotateY: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="bg-white rounded-r-3xl shadow-2xl p-6 sm:p-8 min-h-[600px] relative">
                    <div className="absolute inset-0 rounded-r-3xl bg-gradient-to-l from-[#D4A017]/10 to-transparent" />
                    <div className="relative z-10">
                      <div className="text-right mb-4">
                        <Clock className="w-6 h-6 text-[#1E3A8A] inline-block mb-4" />
                      </div>
                      <AnimatePresence mode="wait">
                        {menuBook[currentPage].filter((_, idx) => idx % 2 === 1).map((item, idx) => (
                          <motion.div
                            key={`${currentPage}-${item.title}-${idx + 1}`}
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            onMouseEnter={() => setHoveredIndex(idx * 2 + 1)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="mb-4 sm:mb-6 group"
                          >
                            <div className="flex justify-between items-start mb-1 sm:mb-2">
                              <h4 className="font-playfair text-lg sm:text-xl font-bold text-[#111827] group-hover:text-[#1E3A8A] transition-colors">
                                {item.title}
                              </h4>
                              <span className="font-bold text-[#D4A017]">{item.price}</span>
                            </div>
                            <p className="text-sm sm:text-base text-[#6B7280] mb-1 sm:mb-2">{item.description}</p>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 sm:w-4 h-3 sm:h-4 text-[#D4A017] fill-current" />
                              <span className="text-xs sm:text-sm text-[#6B7280]">{item.rating}</span>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Corner */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute -bottom-10 -right-10 w-32 h-32"
        >
          <div className="w-full h-full bg-[#D4A017] rounded-full opacity-10 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}