'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Camera, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const images = [
  { id: 1, src: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1920&q=80', alt: 'Lake sunrise', category: 'nature' },
  { id: 2, src: '/images/5.webp', alt: 'Pool deck', category: 'amenities' },
  { id: 3, src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1920&q=80', alt: 'Traditional coffee', category: 'culture' },
  { id: 4, src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80', alt: 'Dining terrace', category: 'dining' },
  { id: 5, src: '/images/1.avif', alt: 'Room interior', category: 'rooms' },
  { id: 6, src: '/images/2.avif', alt: 'Volcano view', category: 'nature' },
  { id: 7, src: '/images/3.jpg', alt: 'Spa sanctuary', category: 'amenities' },
  { id: 8, src: '/images/4.webp', alt: 'Night lights', category: 'ambiance' },
  { id: 9, src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80', alt: 'Resort exterior', category: 'architecture' },
  { id: 10, src: '/images/r7.jpg', alt: 'Lakeside activities', category: 'activities' },
];

const categories = ['all', 'nature', 'amenities', 'culture', 'dining', 'rooms'];

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  const filteredImages = activeCategory === 'all' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Advanced title animation with morphing effect
      gsap.fromTo(titleRef.current, 
        { 
          scale: 0.5, 
          rotation: -5, 
          opacity: 0,
          filter: 'blur(20px)'
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: 'elastic.out(1, 0.8)',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
          }
        }
      );

      // Staggered grid animation with 3D transforms
      gsap.fromTo('.gallery-item',
        {
          y: 100,
          rotationX: 45,
          rotationY: 15,
          scale: 0.8,
          opacity: 0,
          filter: 'blur(10px)'
        },
        {
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          stagger: {
            amount: 0.8,
            grid: 'auto',
            from: 'center'
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gallery-item',
            start: 'top 90%',
          }
        }
      );

      // Floating animation for gallery items
      gsap.to('.gallery-item', {
        y: '+=10',
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          amount: 1,
          from: 'random'
        }
      });

      // Parallax background elements
      gsap.to('.floating-element', {
        y: '-=50',
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1,
        stagger: 0.5
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Re-animate when category changes
  useEffect(() => {
    gsap.fromTo('.gallery-item',
      { scale: 0.8, opacity: 0, rotationY: 90 },
      { 
        scale: 1, 
        opacity: 1, 
        rotationY: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      }
    );
  }, [activeCategory]);

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-br from-[#F9FAFB] via-white to-[#F9FAFB] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="floating-element absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#D4A017]/20 to-[#1E3A8A]/20 rounded-full blur-xl"></div>
      <div className="floating-element absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-l from-[#166534]/20 to-[#D4A017]/20 rounded-full blur-xl"></div>
      <div className="floating-element absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-[#1E3A8A]/10 to-transparent rounded-full blur-2xl"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4A017]/10 to-[#1E3A8A]/10 px-6 py-2 rounded-full mb-6"
          >
            <Camera className="w-5 h-5 text-[#D4A017]" />
            <span className="font-roboto text-sm font-medium text-[#1E3A8A]">Visual Journey</span>
          </motion.div>
          
          <h2 ref={titleRef} className="font-playfair text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#1E3A8A] via-[#D4A017] to-[#166534] bg-clip-text text-transparent mb-6">
            Captured Moments
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="font-roboto text-xl text-[#6B7280] max-w-3xl mx-auto leading-relaxed"
          >
            Where Ethiopian heritage meets modern luxury, every frame tells a story of elegance and natural beauty.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-roboto font-medium transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-[#1E3A8A] to-[#D4A017] text-white shadow-lg'
                  : 'bg-white/80 text-[#6B7280] hover:bg-[#D4A017]/10 hover:text-[#1E3A8A] shadow-md'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Dynamic Masonry Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredImages.map((img, idx) => (
            <motion.div
              key={img.id}
              className={`gallery-item relative group cursor-pointer ${
                idx % 7 === 0 ? 'md:col-span-2 md:row-span-2' : 
                idx % 5 === 0 ? 'lg:col-span-2' : ''
              }`}
              onMouseEnter={() => setHoveredImage(img.id)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={() => setSelected(img.id)}
              whileHover={{ 
                scale: 1.02,
                rotateY: 5,
                rotateX: 5,
                transition: { duration: 0.3 }
              }}
            >
              <div className="relative overflow-hidden rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500">
                <div className={`aspect-square ${
                  idx % 7 === 0 ? 'md:aspect-[2/2]' : 
                  idx % 5 === 0 ? 'lg:aspect-[2/1]' : ''
                }`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                </div>
                
                {/* Overlay with advanced animations */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-[#D4A017]/90 text-white text-xs font-medium rounded-full">
                        {img.category}
                      </span>
                    </div>
                    <h3 className="font-playfair text-white text-lg font-semibold">
                      {img.alt}
                    </h3>
                  </div>
                  
                  <div className="absolute top-4 right-4 transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-200">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Hover glow effect */}
                {hoveredImage === img.id && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#D4A017] via-[#1E3A8A] to-[#166534] rounded-3xl blur opacity-30 animate-pulse"></div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Lightbox */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.5, rotateY: 90, opacity: 0 }}
                animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                exit={{ scale: 0.5, rotateY: -90, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="relative w-full max-w-5xl max-h-[90vh] mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={images.find((i) => i.id === selected)?.src || ''}
                    alt={images.find((i) => i.id === selected)?.alt || ''}
                    fill
                    className="object-contain"
                  />
                </div>
                
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-[#D4A017] to-[#1E3A8A] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                  onClick={() => setSelected(null)}
                >
                  <X className="w-6 h-6" />
                </motion.button>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
                >
                  <h3 className="font-playfair text-white text-2xl font-bold mb-2">
                    {images.find((i) => i.id === selected)?.alt}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-[#D4A017]/90 text-white text-sm font-medium rounded-full">
                    {images.find((i) => i.id === selected)?.category}
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}