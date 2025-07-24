'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const dining = [
  {
    name: 'Lakeview Terrace',
    tagline: 'Sunset Dining, Global Flavours',
    img: '/images/dining-lakeview.jpg',
    desc: 'Open-air terrace with panoramic lake views, serving contemporary Ethiopian and international cuisine.',
    hours: '7:00 AM – 11:00 PM',
    cta: 'Discover Menu',
  },
  {
    name: 'Kaffa Fire Grill',
    tagline: 'Flame-Kissed, Coffee-Infused',
    img: '/images/dining-kaffa.jpg',
    desc: 'A sensory grill experience celebrating Ethiopia’s rich coffee heritage and bold local spices.',
    hours: '6:30 PM – 10:30 PM',
    cta: 'Reserve Table',
  },
  {
    name: 'Bishoftu Bites',
    tagline: 'Casual, Artisanal, Fresh',
    img: '/images/dining-bites.jpg',
    desc: 'Light bites, handcrafted pastries, and specialty coffees for a relaxed lakeside afternoon.',
    hours: '8:00 AM – 6:00 PM',
    cta: 'View Offerings',
  },
];

const DiningOptions = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.dining-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.dining-card', start: 'top 85%' },
        }
      );
    }, sectionRef);

    // Parallax background
    gsap.to(parallaxRef.current, {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#F9FAFB] py-20 overflow-hidden">
      {/* Parallax Background */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/5 via-transparent to-[#D4A017]/5"
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-playfair text-4xl md:text-5xl text-[#1E3A8A]">
            Culinary Journeys
          </h2>
          <p className="mt-4 font-roboto text-lg text-[#6B7280] max-w-2xl mx-auto">
            From sunrise coffees to fire-grilled feasts, every plate tells the story of Ethiopia’s rich terroir and culture.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {dining.map((item, idx) => (
            <motion.article
              key={idx}
              className="dining-card group relative bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="relative h-64 w-full">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <p className="absolute bottom-4 left-4 font-roboto text-sm text-white/90">
                  {item.hours}
                </p>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-playfair text-2xl font-bold text-[#111827]">
                  {item.name}
                </h3>
                <p className="mt-1 font-roboto text-sm text-[#D4A017] font-medium">
                  {item.tagline}
                </p>
                <p className="mt-3 font-roboto text-sm text-[#6B7280] leading-relaxed">
                  {item.desc}
                </p>

                <div className="mt-auto pt-4">
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="inline-flex items-center gap-2 font-roboto font-medium text-[#1E3A8A] group-hover:text-[#D4A017] transition-colors"
                  >
                    {item.cta} <ArrowRight size={16} />
                  </motion.button>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#1E3A8A]/0 group-hover:bg-[#1E3A8A]/5 transition-colors duration-300 pointer-events-none rounded-3xl" />
            </motion.article>
          ))}
        </div>

        {/* Decorative Accent */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#D4A017]/10 blur-3xl"></div>
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[#1E3A8A]/10 blur-3xl"></div>
      </div>
    </section>
  );
};

export default DiningOptions;