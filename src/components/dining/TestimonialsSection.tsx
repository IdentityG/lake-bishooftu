'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      'The floating dhow dinner was pure magic—ethereal sunsets, silk-calm water, and every bite a revelation of Ethiopian flavors re-imagined.',
    name: 'Selam Kebede',
    role: 'Food Critic, Addis Epicure',
    rating: 5,
    avatar: '/images/avatar-1.jpg',
    image: '/images/dining-1.jpg',
  },
  {
    quote:
      'Lake Bishoftu’s Chef’s Table transported us. Open fire, frankincense smoke, and a 10-course tale of culture on each plate. Unforgettable.',
    name: 'James Holloway',
    role: 'Travel Host, Luxe Journeys',
    rating: 5,
    avatar: '/images/avatar-2.jpg',
    image: '/images/dining-2.jpg',
  },
  {
    quote:
      'Breakfast on the pier felt like a dream—fresh roasted coffee aromas drifting over the water, birdsong, and pastries lighter than clouds.',
    name: 'Aisha Mahmoud',
    role: 'Honeymoon Guest',
    rating: 5,
    avatar: '/images/avatar-3.jpg',
    image: '/images/dining-3.jpg',
  },
  {
    quote:
      'Every dish told a story of Ethiopia’s terroir—the injera was ethereal, the doro wat sublime. Service as graceful as the lake itself.',
    name: 'Michael Chen',
    role: 'Michelin Inspector',
    rating: 5,
    avatar: '/images/avatar-4.jpg',
    image: '/images/dining-4.jpg',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-card', {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.testimonials-container', start: 'top 80%' },
      });
    });
    return () => ctx.revert();
  }, []);

  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);

  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

  const paginate = (newDirection: number) => {
    setCurrentIndex((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#F9FAFB] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/3 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M54 6v48H6V6h48z%22 stroke=%22%23D4A017%22 stroke-width=%221%22 fill=%22none%22 fill-rule=%22evenodd%22/%3E%3C/svg%3E')]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-5xl md:text-7xl font-bold text-[#111827] mb-4">
            Voices of Delight
          </h2>
          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
            Hear from guests who savored every moment—and every bite—at Lake Bishoftu.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="testimonials-container relative">
          <AnimatePresence initial={false} custom={{ direction: 1 }}>
            <motion.div
              key={currentIndex}
              className="testimonial-card relative w-full max-w-5xl mx-auto"
              custom={{ direction: 1 }}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ x: { type: 'spring', stiffness: 300, damping: 30 } }}
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 flex flex-col lg:flex-row gap-8 items-center">
                {/* Image Side */}
                <div className="w-full lg:w-2/5 flex-shrink-0">
                  <div className="relative overflow-hidden rounded-2xl aspect-square">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] via-[#D4A017] to-[#166534]" />
                    <img
                      src={testimonials[currentIndex].image}
                      alt="Dining scene"
                      className="w-full h-full object-cover mix-blend-overlay"
                    />
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex-1">
                  <Quote className="w-10 h-10 text-[#D4A017] mb-4" />
                  <blockquote className="font-playfair text-2xl lg:text-3xl leading-snug text-[#111827] mb-6">
                    {testimonials[currentIndex].quote}
                  </blockquote>

                  <div className="flex mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#D4A017] fill-current" />
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#D4A017]" />
                    <div>
                      <p className="font-bold text-[#111827]">{testimonials[currentIndex].name}</p>
                      <p className="text-sm text-[#6B7280]">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Arrows */}
          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-[#F9FAFB] transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-[#111827]" />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-[#F9FAFB] transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-[#111827]" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: idx === currentIndex ? '#D4A017' : '#E5E7EB',
                transform: idx === currentIndex ? 'scale(1.5)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-8 py-4 rounded-full font-medium shadow-xl hover:bg-[#152A6F] transition-colors"
          >
            <span>Create Your Own Story</span>
            <Star className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}