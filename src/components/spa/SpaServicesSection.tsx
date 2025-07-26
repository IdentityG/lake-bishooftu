'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Clock, Star, Users, MapPin } from 'lucide-react';
import Link from 'next/link';
import { spaServices } from '../../data/spaServices';

interface Service {
  id: string;
  type: string;
  title: string;
  duration: string;
  price: string;
  description: string;
  image: string;
  features: { icon: string; label: string; value: string }[];
}

export default function SpaServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Clock':
        return <Clock className="h-4 w-4" />;
      case 'Users':
        return <Users className="h-4 w-4" />;
      case 'MapPin':
        return <MapPin className="h-4 w-4" />;
      case 'Star':
        return <Star className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  const handleButtonClick = (id: string) => {
    console.log(`Clicked View Details for service ID: ${id}`);
  };

  return (
    <section id="spa-services" ref={ref} className="relative overflow-hidden bg-[var(--warm-white)] py-24 sm:py-32">
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-[var(--ethiopian-gold)]/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[var(--lake-blue)]/10 blur-3xl" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-playfair text-4xl font-bold tracking-tight text-[var(--dark-gray)] sm:text-5xl lg:text-6xl">
            Signature Spa Treatments
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[var(--soft-gray)]">
            Discover our curated selection of treatments that blend Ethiopian wellness traditions with modern luxury techniques.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {spaServices.map((service, index) => {
            const ratingFeature = service.features.find((f) => f.label === 'Rating');
            const icon = ratingFeature ? getIconComponent(ratingFeature.icon) : <Star className="h-4 w-4" />;
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--lake-blue)]/10"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                </div>

                <div className="p-6 relative z-10">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[var(--ethiopian-gold)]/10 px-3 py-1 text-sm font-medium text-[var(--ethiopian-gold)]">
                      {icon}
                      {service.type.charAt(0).toUpperCase() + service.type.slice(1)}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-[var(--soft-gray)]">
                      <Clock className="h-4 w-4" />
                      {service.duration}
                    </span>
                  </div>

                  <h3 className="font-playfair text-2xl font-bold text-[var(--dark-gray)]">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[var(--soft-gray)] line-clamp-2">
                    {service.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-playfair text-3xl font-bold text-[var(--lake-blue)]">
                      {service.price}
                    </span>

                    <Link href={`/spa/details/${service.id}`}>
                      <button
                        onClick={() => handleButtonClick(service.id)}
                        className="group/btn flex items-center gap-2 rounded-full bg-[var(--nature-green)] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[var(--nature-green)]/90 cursor-pointer relative z-20"
                      >
                        View Details
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="absolute inset-0 border-2 border-[var(--ethiopian-gold)]/0 transition-all duration-500 group-hover:border-[var(--ethiopian-gold)]/50 rounded-2xl pointer-events-none" />
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}