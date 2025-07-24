'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { Sailboat, Bike, Waves, Users, HandHeart, Anchor, ArrowRight, Star, Clock, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const activities = [
  {
    title: 'Sunrise Kayaking',
    icon: <Sailboat className="w-8 h-8" />,
    img: '/images/activities/kayak.jpg',
    desc: 'Paddle across glass-still water as golden light spills over the crater rim.',
    duration: '2 hours',
    difficulty: 'Easy',
    price: 'From $45',
    featured: true
  },
  {
    title: 'Trail Biking',
    icon: <Bike className="w-8 h-8" />,
    img: '/images/activities/biking.jpg',
    desc: 'Ride forest trails that wind through volcanic hills and coffee groves.',
    duration: '3 hours',
    difficulty: 'Moderate',
    price: 'From $35',
    featured: false
  },
  {
    title: 'Lake Swimming',
    icon: <Waves className="w-8 h-8" />,
    img: '/images/activities/swim.jpg',
    desc: 'Refresh in the mineral-rich, jade-green waters of Lake Bishoftu.',
    duration: 'All day',
    difficulty: 'Easy',
    price: 'Included',
    featured: false
  },
  {
    title: 'Traditional Coffee',
    icon: <HandHeart className="w-8 h-8" />,
    img: '/images/activities/coffee.jpg',
    desc: 'Join a local host for an aromatic coffee ceremony beneath acacia trees.',
    duration: '1.5 hours',
    difficulty: 'Easy',
    price: 'From $25',
    featured: true
  },
  {
    title: 'Fishing Excursion',
    icon: <Anchor className="w-8 h-8" />,
    img: '/images/activities/fishing.jpg',
    desc: 'Cast a line for tilapia while kingfishers skim above the water.',
    duration: '4 hours',
    difficulty: 'Easy',
    price: 'From $55',
    featured: false
  },
  {
    title: 'Group Yoga',
    icon: <Users className="w-8 h-8" />,
    img: '/images/activities/yoga.jpg',
    desc: 'Salute the sunrise on our lakeside deck with certified instructors.',
    duration: '1 hour',
    difficulty: 'All levels',
    price: 'From $20',
    featured: true
  },
];

const amenities = [
  { 
    name: 'Infinity Pool', 
    icon: '🏊', 
    desc: 'Lake-edge horizon pool with underwater music',
    highlight: 'Heated year-round'
  },
  { 
    name: 'Wellness Spa', 
    icon: '🧖‍♀️', 
    desc: 'Holistic Ethiopian rituals with volcanic stone therapy',
    highlight: 'Award-winning'
  },
  { 
    name: 'Kids Club', 
    icon: '👶', 
    desc: 'Supervised play & crafts with cultural activities',
    highlight: 'Ages 3-12'
  },
  { 
    name: 'Library Lounge', 
    icon: '📚', 
    desc: 'Fireside reading nooks with Ethiopian literature',
    highlight: '24/7 access'
  },
  {
    name: 'Fitness Center',
    icon: '💪',
    desc: 'State-of-the-art equipment with lake views',
    highlight: 'Personal trainers'
  },
  {
    name: 'Business Center',
    icon: '💼',
    desc: 'Modern workspace with high-speed internet',
    highlight: 'Meeting rooms'
  }
];

const ActivitiesAmenities = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const activitiesRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('activities');
  const [hoveredActivity, setHoveredActivity] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo('.section-header',
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotationX: 45
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.section-header',
            start: 'top 80%'
          }
        }
      );

      // Activities cards with 3D flip animation
      gsap.fromTo('.activity-card',
        {
          rotationY: 180,
          opacity: 0,
          z: -100
        },
        {
          rotationY: 0,
          opacity: 1,
          z: 0,
          duration: 1,
          stagger: {
            amount: 1.2,
            grid: 'auto',
            from: 'start'
          },
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.activity-card',
            start: 'top 85%'
          }
        }
      );

      // Amenities with morphing animation
      gsap.fromTo('.amenity-item',
        {
          scale: 0,
          rotation: 180,
          opacity: 0
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.amenity-item',
            start: 'top 90%'
          }
        }
      );

      // Floating animation for background elements
      gsap.to('.floating-bg', {
        y: '+=30',
        rotation: '+=180',
        duration: 8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      });

      // Parallax effect for the entire section
      gsap.to(sectionRef.current, {
        backgroundPosition: '50% 100%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-gradient-to-br from-[#F9FAFB] via-white to-[#F9FAFB] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(30, 58, 138, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(212, 160, 23, 0.05) 0%, transparent 50%)'
      }}
    >
      {/* Animated Background Elements */}
      <div className="floating-bg absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-[#D4A017]/10 to-[#1E3A8A]/10 rounded-full blur-xl"></div>
      <div className="floating-bg absolute bottom-20 right-20 w-56 h-56 bg-gradient-to-l from-[#166534]/10 to-[#D4A017]/10 rounded-full blur-xl"></div>
      <div className="floating-bg absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-tr from-[#1E3A8A]/10 to-transparent rounded-full blur-xl"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Enhanced Header */}
        <div className="section-header text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4A017]/20 to-[#1E3A8A]/20 px-6 py-3 rounded-full mb-8 backdrop-blur-sm"
          >
            <Star className="w-5 h-5 text-[#D4A017]" />
            <span className="font-roboto text-sm font-semibold text-[#1E3A8A]">Experiences & Amenities</span>
          </motion.div>
          
          <h2 className="font-playfair text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#1E3A8A] via-[#D4A017] to-[#166534] bg-clip-text text-transparent mb-6">
            Curated Adventures
          </h2>
          
          <p className="font-roboto text-xl text-[#F9FAFB] max-w-4xl mx-auto leading-relaxed">
            From adrenaline-pumping activities to serene wellness experiences, discover the perfect blend of adventure and relaxation.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg">
            <button
              onClick={() => setActiveTab('activities')}
              className={`px-8 py-4 rounded-xl font-roboto font-semibold transition-all duration-300 ${
                activeTab === 'activities'
                  ? 'bg-gradient-to-r from-[#1E3A8A] to-[#D4A017] text-white shadow-lg transform scale-105'
                  : 'text-[#6B7280] hover:text-[#1E3A8A]'
              }`}
            >
              Activities
            </button>
            <button
              onClick={() => setActiveTab('amenities')}
              className={`px-8 py-4 rounded-xl font-roboto font-semibold transition-all duration-300 ${
                activeTab === 'amenities'
                  ? 'bg-gradient-to-r from-[#1E3A8A] to-[#D4A017] text-white shadow-lg transform scale-105'
                  : 'text-[#6B7280] hover:text-[#1E3A8A]'
              }`}
            >
              Amenities
            </button>
          </div>
        </div>

        {/* Activities Section */}
        {activeTab === 'activities' && (
          <div ref={activitiesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {activities.map((activity, idx) => (
              <motion.div
                key={idx}
                className="activity-card group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                onMouseEnter={() => setHoveredActivity(idx)}
                onMouseLeave={() => setHoveredActivity(null)}
                whileHover={{ scale: 1.02 }}
              >
                {activity.featured && (
                  <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-[#D4A017] to-[#1E3A8A] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}
                
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={activity.img}
                    alt={activity.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Icon */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white transform group-hover:scale-110 transition-transform duration-300">
                    {activity.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-playfair text-2xl font-bold text-white mb-2">
                    {activity.title}
                  </h3>
                  
                  <p className="font-roboto text-white/90 text-sm mb-4 line-clamp-2">
                    {activity.desc}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-xs text-white/80">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{activity.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        <span>{activity.difficulty}</span>
                      </div>
                    </div>
                    <span className="font-roboto font-semibold text-[#D4A017]">
                      {activity.price}
                    </span>
                  </div>
                  
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-white font-roboto font-medium text-sm group-hover:text-[#D4A017] transition-colors duration-300"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.button>
                </div>
                
                {/* Hover Glow Effect */}
                {hoveredActivity === idx && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#D4A017] via-[#1E3A8A] to-[#166534] rounded-3xl blur opacity-30 animate-pulse"></div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Amenities Section */}
        {activeTab === 'amenities' && (
          <div ref={amenitiesRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((amenity, idx) => (
              <motion.div
                key={idx}
                className="amenity-item group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20"
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4A017]/5 to-[#1E3A8A]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {amenity.icon}
                  </div>
                  
                  {/* Highlight Badge */}
                  <div className="inline-block bg-gradient-to-r from-[#D4A017]/20 to-[#1E3A8A]/20 text-[#1E3A8A] px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    {amenity.highlight}
                  </div>
                  
                  <h4 className="font-playfair text-xl font-bold text-[#111827] mb-3 group-hover:text-[#1E3A8A] transition-colors duration-300">
                    {amenity.name}
                  </h4>
                  
                  <p className="font-roboto text-[#6B7280] text-sm leading-relaxed">
                    {amenity.desc}
                  </p>
                  
                  {/* Hover Arrow */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute bottom-6 right-6 text-[#D4A017]"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ActivitiesAmenities;