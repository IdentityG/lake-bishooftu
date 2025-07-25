'use client';

import { motion, useInView } from 'framer-motion';
import { Leaf, Users, Globe, HandHeart } from 'lucide-react';
import { useRef } from 'react';

export default function SustainabilityCommunitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative isolate bg-gradient-to-b from-[var(--warm-white)] to-[#f3f4f6] py-24 sm:py-32"
    >
      {/* Background decorative pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 bg-[radial-gradient(ellipse_100%_100%_at_50%_0%,rgba(30,58,138,0.03)_0%,rgba(30,58,138,0)_50%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-playfair text-3xl font-semibold tracking-tight text-[var(--dark-gray)] sm:text-4xl lg:text-5xl">
            Sustainability & Community
          </h2>
          <p className="mt-6 text-lg leading-8 text-[var(--soft-gray)]">
            At Lake Bishoftu Resort, luxury and responsibility walk hand-in-hand.
            Discover how we protect our lake, empower our neighbors, and craft
            experiences that give back.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-12">
          {/* Eco Initiatives */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-[#0f172a] px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
          >
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1080&q=80"
              alt="Lake Bishoftu shoreline"
              className="absolute inset-0 -z-10 h-full w-full object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[rgba(30,58,138,0.8)] via-[rgba(30,58,138,0.5)] to-transparent" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

            <Leaf className="h-10 w-10 text-[var(--ethiopian-gold)]" />
            <h3 className="mt-4 font-playfair text-2xl font-semibold text-white">
              Eco Initiatives
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-200">
              Solar energy, water conservation, and re-forestation programs that
              keep Lake Bishoftu pristine.
            </p>
          </motion.div>

          {/* Community Partnerships */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-[#0f172a] px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
          >
            <img
              src="https://images.unsplash.com/photo-1529156064428-4a6f334f95a9?auto=format&fit=crop&w=1080&q=80"
              alt="Local artisans"
              className="absolute inset-0 -z-10 h-full w-full object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[rgba(22,101,52,0.8)] via-[rgba(22,101,52,0.5)] to-transparent" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

            <Users className="h-10 w-10 text-[var(--ethiopian-gold)]" />
            <h3 className="mt-4 font-playfair text-2xl font-semibold text-white">
              Community Partnerships
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-200">
              Partnering with local artisans, farmers, and guides to create
              authentic experiences for you and prosperity for them.
            </p>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mx-auto mt-16 grid max-w-xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
        >
          {[
            { value: '40%', label: 'Less energy use', icon: Globe },
            { value: '100+', label: 'Local jobs', icon: Users },
            { value: '5,000', label: 'Trees planted', icon: Leaf },
            { value: '20+', label: 'Artisan partners', icon: HandHeart },
          ].map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-2xl bg-white/60 px-4 py-8 shadow-sm ring-1 ring-black/5 backdrop-blur-sm"
            >
              <Icon className="h-8 w-8 text-[var(--lake-blue)]" />
              <p className="mt-4 font-playfair text-3xl font-semibold text-[var(--dark-gray)]">
                {value}
              </p>
              <p className="mt-1 text-sm text-[var(--soft-gray)]">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--ethiopian-gold)] px-8 py-3 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[var(--ethiopian-gold)] focus:ring-opacity-50"
          >
            Make a Positive Impact
            <span
              aria-hidden="true"
              className="ml-1 inline-block transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}