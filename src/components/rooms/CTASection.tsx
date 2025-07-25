'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, MapPin, Calendar, Users, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' }
      });

      // Background parallax
      gsap.to('.bg-parallax', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Form reveal
      gsap.from('.form-field', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 85%' }
      });

      // Floating animation
      gsap.to('.float-el', {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Inquiry submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section ref={sectionRef} className="relative py-32 bg-gradient-to-br from-[var(--warm-white)] via-[var(--lake-blue)]/5 to-[var(--ethiopian-gold)]/5 overflow-hidden">
      {/* Background parallax elements */}
      <div className="bg-parallax absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[var(--lake-blue)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[var(--ethiopian-gold)]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="font-playfair text-5xl md:text-7xl text-[var(--dark-gray)] mb-6"
          >
            Begin Your Journey
          </h2>
          <p className="text-xl text-[var(--soft-gray)] max-w-3xl mx-auto leading-relaxed">
            Let us craft your perfect Ethiopian escape. Share your dreams, and we'll weave them into unforgettable memories.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Form */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50">
              <h3 className="font-playfair text-3xl text-[var(--dark-gray)] mb-8">Plan Your Stay</h3>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-field">
                    <label className="block text-sm font-medium text-[var(--dark-gray)] mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--ethiopian-gold)] focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label className="block text-sm font-medium text-[var(--dark-gray)] mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--ethiopian-gold)] focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-field">
                    <label className="block text-sm font-medium text-[var(--dark-gray)] mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--ethiopian-gold)] focus:border-transparent transition-all duration-300"
                      placeholder="+251xxxxxxxxx"
                    />
                  </div>

                  <div className="form-field">
                    <label className="block text-sm font-medium text-[var(--dark-gray)] mb-2">Number of Guests</label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--ethiopian-gold)] focus:border-transparent transition-all duration-300"
                      required
                    >
                      <option value="">Select guests</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-field">
                    <label className="block text-sm font-medium text-[var(--dark-gray)] mb-2">Check-in Date</label>
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--ethiopian-gold)] focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label className="block text-sm font-medium text-[var(--dark-gray)] mb-2">Check-out Date</label>
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--ethiopian-gold)] focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="block text-sm font-medium text-[var(--dark-gray)] mb-2">Special Requests</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--ethiopian-gold)] focus:border-transparent transition-all duration-300"
                    placeholder="Tell us about your dream stay..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-[var(--lake-blue)] to-[var(--lake-blue)]/90 text-white py-4 px-8 rounded-xl font-medium hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Send Inquiry
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Right - Contact & Details */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
              <h4 className="font-playfair text-2xl text-[var(--dark-gray)] mb-6">Get in Touch</h4>
              
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[var(--lake-blue)]/5 hover:bg-[var(--lake-blue)]/10 transition-colors cursor-pointer"
                >
                  <Mail className="w-6 h-6 text-[var(--lake-blue)]" />
                  <div>
                    <p className="font-medium text-[var(--dark-gray)]">Email Us</p>
                    <p className="text-sm text-[var(--soft-gray)]">reservations@lakebishoftu.com</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[var(--ethiopian-gold)]/5 hover:bg-[var(--ethiopian-gold)]/10 transition-colors cursor-pointer"
                >
                  <Phone className="w-6 h-6 text-[var(--ethiopian-gold)]" />
                  <div>
                    <p className="font-medium text-[var(--dark-gray)]">Call Us</p>
                    <p className="text-sm text-[var(--soft-gray)]">+251 (91) 123-4567</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[var(--nature-green)]/5 hover:bg-[var(--nature-green)]/10 transition-colors cursor-pointer"
                >
                  <MapPin className="w-6 h-6 text-[var(--nature-green)]" />
                  <div>
                    <p className="font-medium text-[var(--dark-gray)]">Visit Us</p>
                    <p className="text-sm text-[var(--soft-gray)]">Lake Bishoftu, Oromia, Ethiopia</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
              <h4 className="font-playfair text-2xl text-[var(--dark-gray)] mb-6">Quick Actions</h4>
              
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-[var(--warm-white)] border border-gray-100 hover:border-[var(--ethiopian-gold)]/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[var(--lake-blue)]" />
                    <span className="text-[var(--dark-gray)] font-medium">Book a Call</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[var(--soft-gray)]" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-[var(--warm-white)] border border-gray-100 hover:border-[var(--ethiopian-gold)]/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[var(--ethiopian-gold)]" />
                    <span className="text-[var(--dark-gray)] font-medium">Join VIP List</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[var(--soft-gray)]" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-[var(--lake-blue)] to-[var(--lake-blue)]/90 text-white py-4 px-8 rounded-full shadow-2xl float-el">
            <p className="font-medium">24/7 Concierge • Personalized Service • Lifetime Memories</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}