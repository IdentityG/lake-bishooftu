'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Star, Clock, Users, MapPin, ChevronLeft, ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { spaServices } from '../../../../data/spaServices';
import { Playfair_Display } from 'next/font/google';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const playfair = Playfair_Display({ subsets: ['latin'] });

interface Service {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  duration: string;
  price: string;
  rating: number;
  description: string;
  highlights: string[];
  includes: string[];
  location: string;
  image: string;
  images: { id: number; url: string; alt: string }[];
  features: { icon: string; label: string; value: string }[];
}

export default function TreatmentDetailsSection() {
  const ref = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const params = useParams();
  const serviceId = params.id as string;
  const service = spaServices.find((s) => s.id === serviceId);
  const [currentImage, setCurrentImage] = useState(0);

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current?.children || [],
        { autoAlpha: 0, y: 100 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          immediateRender: false,
        }
      );

      // Gallery items animation
      gsap.fromTo(
        '.gallery-item',
        { autoAlpha: 0, scale: 0.8 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          immediateRender: false,
        }
      );

      // Fallback for initial load if in view
      if (contentRef.current && isElementInViewport(contentRef.current)) {
        gsap.to(contentRef.current.children, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        });
      }
      if (galleryRef.current && isElementInViewport(galleryRef.current)) {
        gsap.to('.gallery-item', {
          autoAlpha: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        });
      }
    });

    return () => ctx.revert();
  }, [serviceId]);

  const isElementInViewport = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % (service?.images.length || 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + (service?.images.length || 1)) % (service?.images.length || 1));
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Clock':
        return <Clock className="h-5 w-5" />;
      case 'Users':
        return <Users className="h-5 w-5" />;
      case 'MapPin':
        return <MapPin className="h-5 w-5" />;
      case 'Star':
        return <Star className="h-5 w-5" />;
      default:
        return <Star className="h-5 w-5" />;
    }
  };

  if (!service) {
    return <div className="text-center py-20 text-[var(--dark-gray)]">Treatment not found</div>;
  }

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-br from-[#1E3A8A]/50 via-[#D4A017]/20 to-[#166534]/70 py-24 sm:py-32">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#D4A017]]/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#1E3A8A]/5 blur-3xl" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[70vh] overflow-hidden rounded-3xl shadow-2xl mb-8"
        >
          <motion.div style={{ scale: imgScale }} className="h-full w-full">
            <img
              src={service.images[currentImage].url}
              alt={service.images[currentImage].alt}
              className="h-full w-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <Star className="h-4 w-4 fill-[var(--ethiopian-gold)] text-[var(--ethiopian-gold)]" />
              {service.rating} ({service.features.find(f => f.label === 'Rating')?.value.split(' ')[1]})
            </span>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <button
              onClick={prevImage}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <div className="flex gap-2">
              {service.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImage ? 'w-8 bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextImage}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </motion.div>

        {/* Back to Spa Services Badge */}
        <div className="mb-8">
          <Link href="/spa#spa-services">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--nature-green)]/10 text-[var(--nature-green)] rounded-full font-medium hover:bg-[var(--nature-green)]/20 transition-colors duration-300">
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Spa Services</span>
            </div>
          </Link>
        </div>

        {/* Main Content */}
        <div ref={contentRef} className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="flex flex-col">
            <span className="mb-2 inline-block text-sm uppercase tracking-[0.2em] text-[var(--ethiopian-gold)]">
              {service.subtitle}
            </span>

            <h1 className={`font-playfair text-4xl font-bold leading-tight text-[var(--dark-gray)] sm:text-5xl ${playfair.className}`}>
              {service.title}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-[var(--soft-gray)]">
              {service.description}
            </p>

            <div className="mt-8">
              <h3 className={`font-playfair text-2xl font-bold text-[var(--dark-gray)] ${playfair.className}`}>
                Treatment Highlights
              </h3>
              <ul className="mt-4 space-y-3">
                {service.highlights.map((item, idx) => (
                  <li
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <Star className="h-5 w-5 shrink-0 text-[var(--ethiopian-gold)]" />
                    <span className="text-[var(--soft-gray)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h3 className={`font-playfair text-2xl font-bold text-[var(--dark-gray)] ${playfair.className}`}>
                Includes
              </h3>
              <ul className="mt-4 space-y-3">
                {service.includes.map((item, idx) => (
                  <li
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <Star className="h-5 w-5 shrink-0 text-[var(--nature-green)]" />
                    <span className="text-[var(--soft-gray)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col">
            <div className="bg-[var(--ethiopian-gold)]/10 p-8 rounded-2xl h-fit max-h-48 mb-8">
              <h3 className={`font-playfair text-2xl text-[var(--lake-blue)] mb-4 ${playfair.className}`}>
                {service.price}
              </h3>
            </div>

            <div className="mb-8">
              <h3 className={`font-playfair text-2xl font-bold text-[var(--dark-gray)] ${playfair.className}`}>
                Features
              </h3>
              <div className="grid grid-cols-2 gap-6 mt-4">
                {service.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="text-[var(--ethiopian-gold)] mb-3">{getIconComponent(feature.icon)}</div>
                    <p className="text-sm text-[var(--soft-gray)] mb-1">{feature.label}</p>
                    <p className="font-medium text-[var(--dark-gray)]">{feature.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div ref={galleryRef} className="mb-8">
              <h3 className={`font-playfair text-2xl font-bold text-[var(--dark-gray)] ${playfair.className}`}>
                Gallery
              </h3>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {service.images.map((image) => (
                  <div
                    key={image.id}
                    className="gallery-item relative group cursor-pointer overflow-hidden rounded-xl"
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <button className="group relative overflow-hidden rounded-full bg-[var(--lake-blue)] px-8 py-4 text-sm font-medium text-white transition-all duration-500 hover:scale-105 cursor-pointer">
                <span className="relative z-10">Book Now</span>
                <motion.div
                  className="absolute inset-0 bg-[var(--ethiopian-gold)]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </button>

              <button className="group flex items-center gap-2 rounded-full border border-[var(--lake-blue)] px-6 py-4 text-sm font-medium text-[var(--lake-blue)] transition-all duration-300 hover:bg-[var(--lake-blue)] hover:text-white cursor-pointer">
                <ArrowRight className="h-4 w-4" />
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}