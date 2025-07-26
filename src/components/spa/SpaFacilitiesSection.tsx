'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles, Waves, Wind, Sun, Trees, Droplets } from 'lucide-react';

interface Facility {
  title: string;
  description: string;
  capacity: string;
  image: string;
  icon: React.ReactNode;
  features: string[];
}

const facilities: Facility[] = [
  {
    title: "Lakefront Infinity Pool",
    description: "Temperature-controlled infinity pool merging seamlessly with Lake Bishoftu.",
    capacity: "Open 6 AM – 10 PM",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    icon: <Waves className="h-6 w-6" />,
    features: ["Hydrotherapy jets", "Underwater music", "Sunset views"]
  },
  {
    title: "Herbal Steam Sanctuary",
    description: "Eucalyptus-infused steam room built with volcanic basalt for deep detox.",
    capacity: "12 persons",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    icon: <Wind className="h-6 w-6" />,
    features: ["Aromatherapy infusions", "Chromatic lighting", "Cool-down showers"]
  },
  {
    title: "Royal Couple's Suite",
    description: "Private suite with panoramic lake views and personalized butler service.",
    capacity: "2 persons",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    icon: <Sparkles className="h-6 w-6" />,
    features: ["Fireplace", "Jacuzzi", "Champagne service"]
  },
  {
    title: "Traditional Hammam",
    description: "Authentic marble hammam with Ethiopian black-soap rituals.",
    capacity: "8 persons",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    icon: <Droplets className="h-6 w-6" />,
    features: ["Kese exfoliation", "Foam massage", "Rose water rinse"]
  }
];

export default function SpaFacilitiesSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[--warm-white] py-24 sm:py-32">
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[--nature-green]/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[--ethiopian-gold]/5 blur-3xl" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-playfair text-4xl font-bold tracking-tight text-[--dark-gray] sm:text-5xl lg:text-6xl">
            World-Class Spa Facilities
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[--soft-gray]">
            Every corner of our spa is designed for serenity, privacy, and unforgettable luxury.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 xl:grid-cols-4">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:shadow-2xl"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="mb-3 flex items-center gap-2 text-[--ethiopian-gold]">
                  {facility.icon}
                  <span className="text-sm font-medium">{facility.capacity}</span>
                </div>

                <h3 className="font-playfair text-2xl font-bold text-[--dark-gray]">
                  {facility.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[--soft-gray]">
                  {facility.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {facility.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-[--soft-gray]"
                    >
                      <Sun className="h-4 w-4 shrink-0 text-[--nature-green]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="group/btn mt-6 flex items-center gap-2 text-sm font-medium text-[--lake-blue] transition-colors hover:text-[--ethiopian-gold]">
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>

              <div className="absolute inset-0 border-2 border-[--ethiopian-gold]/0 transition-all duration-500 group-hover:border-[--ethiopian-gold]/50 rounded-3xl" />
            </motion.div>
          ))}
        </div>

        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 rounded-3xl bg-gradient-to-br from-[--lake-blue]/5 via-[--warm-white] to-[--ethiopian-gold]/5 p-8 text-center"
        >
          <h3 className="font-playfair text-3xl font-bold text-[--dark-gray]">
            Ready to Indulge?
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-[--soft-gray]">
            Our spa concierge will curate a bespoke wellness journey just for you.
          </p>
          <button className="group relative mt-8 overflow-hidden rounded-full bg-[--lake-blue] px-8 py-4 text-sm font-medium text-white transition-all duration-500 hover:scale-105">
            <span className="relative z-10">Book Your Experience</span>
            <motion.div
              className="absolute inset-0 bg-[--ethiopian-gold]"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}