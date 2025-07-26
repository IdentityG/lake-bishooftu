'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Review {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
  image: string;
  stay: string;
}

const reviews: Review[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Travel Journalist',
    location: 'Singapore',
    rating: 5,
    text: 'Lake Bishoftu Resort redefined luxury for me. The sunrise over the lake from my suite was pure magic—like watching the earth awaken in shades of gold and sapphire.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80',
    stay: 'Lake View Suite • 4 nights'
  },
  {
    id: '2',
    name: 'Marcus Andersson',
    role: 'CEO, Tech Ventures',
    location: 'Stockholm',
    rating: 5,
    text: 'The seamless blend of Ethiopian heritage and modern comfort is extraordinary. Every detail, from the hand-woven textiles to the personalized service, felt authentically luxurious.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    stay: 'Royal Penthouse • 7 nights'
  },
  {
    id: '3',
    name: 'Aisha Ahmed',
    role: 'Architect & Designer',
    location: 'Dubai',
    rating: 5,
    text: 'Absolutely breathtaking. The architecture respects the landscape while celebrating Ethiopian craftsmanship. The infinity pool merging with the lake horizon is pure genius.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    stay: 'Garden Villa • 5 nights'
  },
  {
    id: '4',
    name: 'James O\'Brien',
    role: 'Photographer',
    location: 'Dublin',
    rating: 5,
    text: 'Captured the most stunning sunrise shots of my career here. The golden hour over Lake Bishoftu is something every photographer should experience at least once.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    stay: 'Lake View Suite • 6 nights'
  },
  {
    id: '5',
    name: 'Elena Rodriguez',
    role: 'Food Critic',
    location: 'Barcelona',
    rating: 5,
    text: 'The fusion of traditional Ethiopian cuisine with modern techniques was revelatory. Each meal felt like a cultural journey, beautifully presented and perfectly executed.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    stay: 'Garden Villa • 3 nights'
  }
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' }
      });

      // Background parallax
      gsap.to('.bg-float', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Quote marks floating
      gsap.to('.quote-float', {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    });

    return () => ctx.revert();
  }, []);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const currentReview = reviews[currentIndex];

  return (
    <section ref={sectionRef} className="relative py-32 bg-[var(--warm-white)] to-[var(--lake-blue)]/5 overflow-hidden">
      {/* Background decoration */}
      <div className="bg-float absolute top-0 right-0 w-96 h-96 bg-[var(--ethiopian-gold)]/10 rounded-full blur-3xl" />
      <div className="bg-float absolute bottom-0 left-0 w-96 h-96 bg-[var(--lake-blue)]/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="font-playfair text-5xl md:text-7xl text-[var(--dark-gray)] mb-6"
          >
            Guest Stories
          </h2>
          <p className="text-xl text-[var(--soft-gray)] max-w-3xl mx-auto leading-relaxed">
            Discover the moments that made our guests fall in love with Lake Bishoftu
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image Side */}
          <motion.div 
            key={currentReview.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={currentReview.image}
                alt={currentReview.name}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
            
            {/* Floating quote */}
            <Quote className="quote-float absolute -top-6 -left-6 w-16 h-16 text-[var(--ethiopian-gold)] bg-white rounded-full p-4 shadow-xl" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            key={`${currentReview.id}-content`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Rating */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-[var(--ethiopian-gold)] text-[var(--ethiopian-gold)]" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="mb-8">
              <p className="font-playfair text-2xl md:text-3xl text-[var(--dark-gray)] leading-relaxed">
                "{currentReview.text}"
              </p>
            </blockquote>

            {/* Author Info */}
            <div className="space-y-2">
              <p className="text-xl font-semibold text-[var(--dark-gray)]">{currentReview.name}</p>
              <p className="text-[var(--soft-gray)]">{currentReview.role}</p>
              <p className="text-sm text-[var(--soft-gray)]">{currentReview.location}</p>
              <p className="text-sm text-[var(--lake-blue)]">{currentReview.stay}</p>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevReview}
            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-[var(--lake-blue)]" />
          </motion.button>

          {/* Dots */}
          <div className="flex gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-[var(--ethiopian-gold)]' 
                    : 'bg-[var(--soft-gray)]/30'
                }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextReview}
            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-[var(--lake-blue)]" />
          </motion.button>
        </div>

        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '4.9/5', label: 'Average Rating' },
            { value: '2,847', label: 'Reviews' },
            { value: '98%', label: 'Recommend Us' },
            { value: '45+', label: 'Countries' }
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="font-playfair text-4xl text-[var(--ethiopian-gold)] mb-2">{stat.value}</p>
              <p className="text-sm text-[var(--soft-gray)] uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Floating Testimonials Grid */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          {reviews.slice(0, 3).map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="bg-white/50 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 hover:border-[var(--ethiopian-gold)]/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-[var(--dark-gray)]">{review.name}</p>
                  <p className="text-sm text-[var(--soft-gray)]">{review.location}</p>
                </div>
              </div>
              <p className="text-sm text-[var(--soft-gray)] leading-relaxed line-clamp-3">
                {review.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}