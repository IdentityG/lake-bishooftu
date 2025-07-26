'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Star, Clock, CheckCircle } from 'lucide-react';

interface Package {
  title: string;
  subtitle: string;
  duration: string;
  price: string;
  rating: number;
  description: string;
  features: string[];
  image: string;
  color: string;
}

const packages: Package[] = [
  {
    title: 'Weekend Escape',
    subtitle: 'Two nights of pure serenity',
    duration: '2 Days / 1 Night',
    price: '$680',
    rating: 4.9,
    description: 'Unwind with sunset yoga, a 90-min signature massage, and a private lakeside dinner.',
    features: [
      'Luxury lake-view suite',
      'Daily breakfast & dinner',
      '90-min Ethiopian Coffee Ritual',
      'Sunset yoga session'
    ],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    color: 'from-[--lake-blue]/10 to-[--lake-blue]/5'
  },
  {
    title: 'Romance Retreat',
    subtitle: 'Designed for couples',
    duration: '3 Days / 2 Nights',
    price: '$1,290',
    rating: 5,
    description: 'Re-connect with rose-petal turndown, couple’s massage, and champagne under the stars.',
    features: [
      'Royal couple’s suite',
      'Private jacuzzi & fireplace',
      'Couple’s 120-min treatment',
      'Private sunset cruise'
    ],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    color: 'from-[--ethiopian-gold]/10 to-[--ethiopian-gold]/5'
  },
  {
    title: 'Wellness Immersion',
    subtitle: 'Mind, body & soul reset',
    duration: '5 Days / 4 Nights',
    price: '$2,450',
    rating: 4.9,
    description: 'Detox with plant-based meals, daily yoga, meditation and three bespoke spa rituals.',
    features: [
      'Garden-view villa',
      'Plant-based gourmet meals',
      'Daily yoga & meditation',
      '3 bespoke spa rituals'
    ],
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e19f32e?w=800&q=80',
    color: 'from-[--nature-green]/10 to-[--nature-green]/5'
  }
];

export default function SpecialPackagesSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[--warm-white] py-24 sm:py-32">
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[--ethiopian-gold]/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[--lake-blue]/5 blur-3xl" />
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
            Curated Luxury Packages
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[--soft-gray]">
            Hand-crafted experiences that blend Ethiopian heritage with modern indulgence.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {packages.map((pkg, idx) => (
            <motion.article
              key={pkg.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="relative isolate flex flex-col overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:shadow-2xl"
            >
              <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${pkg.color}`} />
              <div className="flex flex-1 flex-col">
                {/* Image */}
                <div className="overflow-hidden rounded-t-3xl">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Star className="h-4 w-4 fill-[--ethiopian-gold] text-[--ethiopian-gold]" />
                    <span>{pkg.rating}</span>
                    <span className="text-[--soft-gray]">• {pkg.duration}</span>
                  </div>

                  <h3 className="mt-4 font-playfair text-2xl font-bold text-[--dark-gray]">
                    {pkg.title}
                  </h3>
                  <p className="mt-1 text-sm text-[--soft-gray]">{pkg.subtitle}</p>

                  <p className="mt-4 text-sm leading-relaxed text-[--soft-gray]">
                    {pkg.description}
                  </p>

                  <ul className="mt-6 space-y-2">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[--soft-gray]">
                        <CheckCircle className="h-4 w-4 shrink-0 text-[--nature-green]" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="font-playfair text-3xl font-bold text-[--dark-gray]">
                          {pkg.price}
                        </span>
                        <span className="ml-1 text-sm text-[--soft-gray]">/person</span>
                      </div>

                      <button className="group/btn flex items-center gap-2 rounded-full bg-[--lake-blue] px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[--ethiopian-gold]">
                        <span>Reserve</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}