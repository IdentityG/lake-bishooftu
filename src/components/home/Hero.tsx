'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

interface Slide {
  id: number;
  bg: string;
  title: string;
  subtitle: string;
  color: string;
}

const slides: Slide[] = [
  {
    id: 1,
    bg: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
    title: 'Welcome to Lake Bishoftu Resort',
    subtitle: 'Where Ethiopian heritage meets timeless luxury',
    color: '#1E3A8A',
  },
  {
    id: 2,
    bg: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1920&q=80',
    title: 'Serene Lakeside Views',
    subtitle: 'Wake up to the gentle embrace of Lake Bishoftu',
    color: '#166534',
  },
  {
    id: 3,
    bg: 'https://images.unsplash.com/photo-1566073771259-6a8506099825?auto=format&fit=crop&w=1920&q=80',
    title: 'Luxury Redefined',
    subtitle: 'Indulge in world-class amenities and service',
    color: '#D4A017',
  },
  {
    id: 4,
    bg: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1920&q=80',
    title: 'Cultural Immersion',
    subtitle: 'Experience authentic Ethiopian hospitality',
    color: '#1E3A8A',
  },
  {
    id: 5,
    bg: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1920&q=80',
    title: 'Unforgettable Moments',
    subtitle: 'Create memories that last a lifetime',
    color: '#166534',
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const rectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
      });

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out',
      });

      rectRefs.current.forEach((rect, index) => {
        if (rect) {
          gsap.from(rect, {
            opacity: 0,
            scale: 0,
            duration: 0.6,
            delay: 0.2 * index,
            ease: 'back.out(1.7)',
          });
        }
      });

      gsap.to(bgRef.current, {
        scale: 1.05,
        duration: 10,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const changeSlide = (index: number) => {
      const currentSlide = slides[index];
      
      gsap.to(bgRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setActiveIndex(index);
          gsap.to(bgRef.current, {
            opacity: 1,
            duration: 0.5,
          });
        },
      });

      gsap.to([titleRef.current, subtitleRef.current], {
        color: currentSlide.color,
        duration: 0.8,
        ease: 'power2.inOut',
      });

      rectRefs.current.forEach((rect, i) => {
        if (rect) {
          gsap.to(rect, {
            scale: i === index ? 1.2 : 1,
            opacity: i === index ? 1 : 0.6,
            duration: 0.5,
            ease: 'power2.out',
          });
        }
      });
    };

    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        const nextIndex = (activeIndex + 1) % slides.length;
        changeSlide(nextIndex);
      }, 4000);
    };

    startInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeIndex]);

  const handleRectangleClick = (index: number) => {
    if (index === activeIndex) return;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    const changeSlide = (idx: number) => {
      const currentSlide = slides[idx];
      
      gsap.to(bgRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setActiveIndex(idx);
          gsap.to(bgRef.current, {
            opacity: 1,
            duration: 0.5,
          });
        },
      });

      gsap.to([titleRef.current, subtitleRef.current], {
        color: currentSlide.color,
        duration: 0.8,
        ease: 'power2.inOut',
      });

      rectRefs.current.forEach((rect, i) => {
        if (rect) {
          gsap.to(rect, {
            scale: i === idx ? 1.2 : 1,
            opacity: i === idx ? 1 : 0.6,
            duration: 0.5,
            ease: 'power2.out',
          });
        }
      });
    };

    changeSlide(index);
  };

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${slides[activeIndex].bg})`,
          filter: 'brightness(0.7)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%',
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center max-w-4xl"
        >
          <h1
            ref={titleRef}
            className="font-['Playfair_Display'] text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
            style={{ color: slides[activeIndex].color }}
          >
            {slides[activeIndex].title}
          </h1>
          <p
            ref={subtitleRef}
            className="font-['Roboto'] text-xl md:text-2xl text-gray-200 font-light"
          >
            {slides[activeIndex].subtitle}
          </p>
        </motion.div>
      </div>

      {/* Rectangle Navigation */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex gap-3 z-20">
        {slides.map((_, index) => (
          <div
            key={index}
            ref={(el: HTMLDivElement | null): void => { rectRefs.current[index] = el }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden cursor-pointer border-2 border-white/30 hover:border-white/60 transition-all duration-300"
            onClick={() => handleRectangleClick(index)}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${slides[index].bg})`,
                filter: 'brightness(0.8)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Social Media Links */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-20">
        <div className="w-px h-24 bg-white/30" />
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="text-white/80 hover:text-white"
        >
          <Link href="https://facebook.com">
            <FaFacebook size={24} />
          </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="text-white/80 hover:text-white"
        >
          <Link href="https://twitter.com">
            <FaTwitter size={24} />
          </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="text-white/80 hover:text-white"
        >
          <Link href="https://instagram.com">
            <FaInstagram size={24} />
          </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="text-white/80 hover:text-white"
        >
          <Link href="https://linkedin.com">
            <FaLinkedin size={24} />
          </Link>
        </motion.div>
        <div className="w-px h-24 bg-white/30" />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}