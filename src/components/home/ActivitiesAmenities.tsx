'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { Sailboat, Bike, Waves, Users, HandHeart, Anchor } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const activities = [
  {
    title: 'Sunrise Kayaking',
    icon: <Sailboat className="w-7 h-7" />,
    img: '/images/activities/kayak.jpg',
    desc: 'Paddle across glass-still water as golden light spills over the crater rim.',
  },
  {
    title: 'Trail Biking',
    icon: <Bike className="w-7 h-7" />,
    img: '/images/activities/biking.jpg',
    desc: 'Ride forest trails that wind through volcanic hills and coffee groves.',
  },
  {
    title: 'Lake Swimming',
    icon: <Waves className="w-7 h-7" />,
    img: '/images/activities/swim.jpg',
    desc: 'Refresh in the mineral-rich, jade-green waters of Lake Bishoftu.',
  },
  {
    title: 'Traditional Coffee',
    icon: <HandHeart className="w-7 h-7" />,
    img: '/images/activities/coffee.jpg',
    desc: 'Join a local host for an aromatic coffee ceremony beneath acacia trees.',
  },
  {
    title: 'Fishing Excursion',
    icon: <Anchor className="w-7 h-7" />,
    img: '/images/activities/fishing.jpg',
    desc: 'Cast a line for tilapia while kingfishers skim above the water.',
  },
  {
    title: 'Group Yoga',
    icon: <Users className="w-7 h-7" />,
    img: '/images/activities/yoga.jpg',
    desc: 'Salute the sunrise on our lakeside deck with certified instructors.',
  },
];

const amenities = [
  { name: 'Infinity Pool', icon: '🏊', desc: 'Lake-edge horizon pool' },
  { name: 'Wellness Spa', icon: '🧖‍♀️', desc: 'Holistic Ethiopian rituals' },
  { name: 'Kids Club', icon: '👶', desc: 'Supervised play & crafts' },
  { name: 'Library Lounge', icon: '📚', desc: 'Fireside reading nooks' },
];

const ActivitiesAmenities = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.item',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.item', start: 'top 85%' },
        }
      );
    }, sectionRef);

    gsap.to(bgRef.current, {
      yPercent: -25,
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
    <section ref={sectionRef} className="relative bg-[#F9FAFB] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Parallax Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-[#166534]/5 via-transparent to-[#D4A017]/5"
      ></div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-playfair text-4xl md:text-5xl text-[#1E3A8A]">
            Activities & Amenities
          </h2>
          <p className="mt-4 font-roboto text-lg text-[#6B7280] max-w-2xl mx-auto">
            From adrenaline to absolute calm—curated experiences to fill your stay with wonder.
          </p>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {activities.map((act, idx) => (
            <motion.div
              key={idx}
              className="item group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="h-72 w-full">
                <Image
                  src={act.img}
                  alt={act.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 p-6 w-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#D4A017]/90 text-white p-2 rounded-full">
                    {act.icon}
                  </span>
                  <h3 className="font-playfair text-xl font-bold text-white">
                    {act.title}
                  </h3>
                </div>
                <p className="font-roboto text-sm text-white/90">
                  {act.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Amenities */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="font-playfair text-3xl text-[#111827] mb-8">
            Signature Amenities
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenities.map((am, idx) => (
              <motion.div
                key={idx}
                className="item bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -6 }}
              >
                <div className="text-4xl mb-3">{am.icon}</div>
                <h4 className="font-playfair text-lg font-semibold text-[#111827]">
                  {am.name}
                </h4>
                <p className="font-roboto text-sm text-[#6B7280]">
                  {am.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#D4A017]/10 blur-3xl animate-pulse"></div>
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[#1E3A8A]/10 blur-3xl animate-pulse"></div>
      </div>
    </section>
  );
};

export default ActivitiesAmenities;