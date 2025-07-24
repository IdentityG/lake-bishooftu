'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { MapPin, Users, Award, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutUsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.fade-in-up',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.fade-in-up', start: 'top 85%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <MapPin className="w-8 h-8 text-[#D4A017]" />,
      title: 'Prime Lakeside',
      desc: 'Nestled on the shores of Lake Bishoftu, surrounded by breathtaking volcanic landscapes.',
    },
    {
      icon: <Users className="w-8 h-8 text-[#D4A017]" />,
      title: 'Ethiopian Hospitality',
      desc: 'Authentic cultural warmth and personalized service at every turn.',
    },
    {
      icon: <Award className="w-8 h-8 text-[#D4A017]" />,
      title: 'Award-Winning',
      desc: 'Recognized as Ethiopia’s leading luxury resort by World Travel Awards.',
    },
    {
      icon: <Leaf className="w-8 h-8 text-[#D4A017]" />,
      title: 'Eco-Conscious',
      desc: 'Committed to sustainability and preserving the natural beauty of Bishoftu.',
    },
  ];

  return (
    <section ref={sectionRef} className="bg-[#F9FAFB] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column – Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-6"
        >
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#1E3A8A] leading-tight">
            Discover the Soul of Lake Bishoftu
          </h2>
          <p className="font-['Roboto'] text-base md:text-lg text-[#6B7280] leading-relaxed">
            Where Ethiopia’s ancient beauty meets contemporary luxury. Our
            resort is more than a destination—it is a living tribute to
            Bishoftu’s shimmering waters, volcanic horizons, and the timeless
            spirit of Ethiopian hospitality.
          </p>
          <p className="font-['Roboto'] text-base md:text-lg text-[#6B7280] leading-relaxed">
            From sunrise reflections on the lake to cultural evenings under
            starlit skies, every moment is thoughtfully crafted to connect
            you with nature, culture, and unforgettable memories.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 py-3 mt-4 font-['Roboto'] font-medium text-white bg-[#D4A017] rounded-full shadow-lg hover:bg-[#D4A017]/90 transition-colors duration-300"
          >
            Explore Our Story
          </motion.button>
        </motion.div>

        {/* Right Column – Features */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="grid sm:grid-cols-2 gap-6"
        >
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              className="fade-in-up bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
              whileHover={{ y: -6 }}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#111827] mb-2">
                {item.title}
              </h3>
              <p className="font-['Roboto'] text-sm text-[#6B7280] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating Decorative SVG */}
      <motion.svg
        width="120"
        height="120"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-4 right-4 opacity-10 pointer-events-none"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      >
        <path
          d="M100 0C44.77 0 0 44.77 0 100s44.77 100 100 100 100-44.77 100-100S155.23 0 100 0zm0 180c-44.18 0-80-35.82-80-80S55.82 20 100 20s80 35.82 80 80-35.82 80-80 80z"
          fill="#1E3A8A"
        />
      </motion.svg>
    </section>
  );
};

export default AboutUsSection;