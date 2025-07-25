'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Mail, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: 'Selam Kebede',
    role: 'General Manager',
    image: '/images/team-selam.jpg',
    bio: '25 years crafting luxury experiences across Africa.',
    socials: { linkedin: '#', mail: '#' },
  },
  {
    name: 'Michael Lemma',
    role: 'Executive Chef',
    image: '/images/team-michael.jpg',
    bio: 'Michelin-trained, rooted in Ethiopian spice trails.',
    socials: { linkedin: '#', mail: '#' },
  },
  {
    name: 'Hanna Tadesse',
    role: 'Wellness Director',
    image: '/images/team-hanna.jpg',
    bio: 'Yoga master and herbalist, guardian of ancient rituals.',
    socials: { linkedin: '#', mail: '#' },
  },
  {
    name: 'Yonas Afework',
    role: 'Sustainability Lead',
    image: '/images/team-yonas.jpg',
    bio: 'Architect of zero-waste and rewilding programs.',
    socials: { linkedin: '#', mail: '#' },
  },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.team-card', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.team-grid', start: 'top 80%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#F9FAFB] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%231E3A8A%22 fill-opacity=%220.2%22%3E%3Cpath d=%22M0 40L40 0H20L0 20M40 40V20L20 40%22 /%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-5xl md:text-7xl font-bold text-[#111827] mb-4">
            Meet the Visionaries
          </h2>
          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
            Passionate professionals united by a singular purpose—delivering unforgettable Ethiopian luxury.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              className="team-card relative group"
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
                {/* Image */}
                <div className="relative aspect-[4/5]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] via-[#D4A017] to-[#166534]" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover mix-blend-overlay transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="font-playfair text-2xl font-bold text-[#111827]">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-[#D4A017]">
                    {member.role}
                  </p>
                  <p className="text-sm text-[#6B7280]">
                    {member.bio}
                  </p>

                  {/* Socials */}
                  <div className="flex items-center gap-4 pt-2">
                    <a
                      href={member.socials.linkedin}
                      className="text-[#6B7280] hover:text-[#1E3A8A] transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={member.socials.mail}
                      className="text-[#6B7280] hover:text-[#D4A017] transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D4A017]/50 rounded-3xl transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-8 py-4 rounded-full font-medium shadow-xl hover:bg-[#152A6F] transition-colors"
          >
            <Sparkles className="w-5 h-5" />
            <span>Meet the Entire Team</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}