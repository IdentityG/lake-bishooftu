'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Calendar, Users, Star, Zap, Shield, Sun, Moon, Car, Coffee, Waves } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Rate {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  currency: string;
  period: string;
  image: string;
  features: string[];
  highlight?: boolean;
}

const rates: Rate[] = [
  {
    id: 'lake-view',
    title: 'Lake View Suite',
    subtitle: 'Panoramic sunrise vistas',
    price: 450,
    currency: 'USD',
    period: '/ night',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    features: ['Lake-facing balcony', '55 m²', 'King bed', 'Bathtub'],
    highlight: true
  },
  {
    id: 'garden-villa',
    title: 'Garden Villa',
    subtitle: 'Private forest retreat',
    price: 680,
    currency: 'USD',
    period: '/ night',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    features: ['Private pool', '85 m²', 'King bed', 'Outdoor shower']
  },
  {
    id: 'royal-penthouse',
    title: 'Royal Penthouse',
    subtitle: 'Ultimate luxury living',
    price: 1200,
    currency: 'USD',
    period: '/ night',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    features: ['Rooftop jacuzzi', '120 m²', 'Butler service', 'Helipad access']
  }
];

export default function RatesAvailabilitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedDates, setSelectedDates] = useState({ checkIn: '', checkOut: '' });
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%' }
        }
      );

      // Cards stagger
      gsap.fromTo(
cardsRef.current ? cardsRef.current.querySelectorAll('.rate-card') : [],
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' }
        }
      );

      // Floating animation for decorative elements
      gsap.to('.float-up', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-[var(--warm-white)] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[var(--lake-blue)]/5 rounded-full blur-3xl float-up" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[var(--ethiopian-gold)]/5 rounded-full blur-3xl float-up" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="font-playfair text-5xl md:text-7xl text-[var(--dark-gray)] mb-6"
          >
            Rates & Availability
          </h2>
          <p className="text-xl text-[var(--soft-gray)] max-w-3xl mx-auto leading-relaxed">
            Discover our curated collection of suites and villas, each offering a unique perspective on Ethiopian luxury
          </p>
        </div>

        {/* Availability Checker */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-16 bg-white/50 backdrop-blur-sm border border-gray-100 rounded-2xl p-8"
        >
          <div className="grid md:grid-cols-3 gap-6 items-end">
            <div>
              <label className="block text-sm font-medium text-[var(--dark-gray)] mb-2">Check-in</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--soft-gray)]" />
                <input
                  type="date"
                  value={selectedDates.checkIn}
                  onChange={(e) => setSelectedDates({ ...selectedDates, checkIn: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--ethiopian-gold)] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--dark-gray)] mb-2">Check-out</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--soft-gray)]" />
                <input
                  type="date"
                  value={selectedDates.checkOut}
                  onChange={(e) => setSelectedDates({ ...selectedDates, checkOut: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--ethiopian-gold)] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--dark-gray)] mb-2">Guests</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--soft-gray)]" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--ethiopian-gold)] focus:border-transparent appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-6 bg-[var(--lake-blue)] text-white py-4 px-8 rounded-xl font-medium hover:bg-[var(--lake-blue)]/90 transition-colors"
          >
            Check Availability
          </motion.button>
        </motion.div>

        {/* Rates Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {rates.map((rate) => (
            <div
              key={rate.id}
              className="rate-card relative group"
            >
              {/* Card Background */}
              <div className={`absolute inset-0 bg-gradient-to-br from-[var(--lake-blue)]/5 to-[var(--ethiopian-gold)]/5 rounded-3xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl ${rate.highlight ? 'ring-2 ring-[var(--ethiopian-gold)]/20' : ''}`} />
              
              {/* Main Card */}
              <div className="relative bg-white rounded-3xl overflow-hidden transform transition-transform duration-500 group-hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={rate.image}
                    alt={rate.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  {rate.highlight && (
                    <div className="absolute top-4 right-4 bg-[var(--ethiopian-gold)] text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="mb-4">
                    <h3 className="font-playfair text-2xl text-[var(--dark-gray)] mb-1">{rate.title}</h3>
                    <p className="text-[var(--soft-gray)]">{rate.subtitle}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-[var(--lake-blue)]">{rate.currency}{rate.price}</span>
                    <span className="text-[var(--soft-gray)] ml-2">{rate.period}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {rate.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-[var(--soft-gray)]">
                        <Star className="w-4 h-4 text-[var(--ethiopian-gold)] mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                      rate.highlight 
                        ? 'bg-[var(--ethiopian-gold)] text-white hover:bg-[var(--ethiopian-gold)]/90' 
                        : 'bg-[var(--lake-blue)] text-white hover:bg-[var(--lake-blue)]/90'
                    }`}
                  >
                    Reserve Now
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <h3 className="font-playfair text-3xl text-[var(--dark-gray)] mb-8">Enhance Your Stay</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: <Coffee className="w-6 h-6" />, title: 'Breakfast' },
              { icon: <Car className="w-6 h-6" />, title: 'Airport Transfer' },
              { icon: <Waves className="w-6 h-6" />, title: 'Spa Access' },
              { icon: <Shield className="w-6 h-6" />, title: 'Late Checkout' }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white/50 backdrop-blur-sm border border-gray-100 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:border-[var(--ethiopian-gold)]/30 hover:shadow-lg"
              >
                <div className="text-[var(--ethiopian-gold)] mb-3">{service.icon}</div>
                <p className="text-sm text-[var(--dark-gray)] font-medium">{service.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}