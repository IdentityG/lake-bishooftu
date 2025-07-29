'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, User, MessageSquare, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactFormSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 90%' },
        }
      );
      gsap.fromTo(
        imageRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: imageRef.current, start: 'top 85%' },
        }
      );
      gsap.fromTo(
        formRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 85%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for reaching out! We will contact you soon.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB] overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          ref={headingRef}
          className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-center text-[#111827] mb-4"
        >
          Get In Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center text-[--soft-gray] max-w-2xl mx-auto mb-12 text-base sm:text-lg"
        >
          Questions, special requests, or feedback—our team is ready to assist you.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Image Side */}
          <motion.div
            ref={imageRef}
            className="relative rounded-2xl overflow-hidden shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img
              src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=1200&q=80"
              alt="Lake Bishoftu Resort"
              className="w-full h-full min-h-[400px] sm:min-h-[450px] lg:min-h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-playfair text-xl sm:text-2xl mb-2">Lake Bishoftu Resort</h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> Bishoftu, Ethiopia
                </span>
                <span className="flex items-center gap-1">
                  <Phone size={14} /> +251 11 667 8700
                </span>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 bg-white rounded-2xl shadow-lg p-6 sm:p-8"
            >
              <div className="relative">
                <User className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-[#6B7280]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A017] transition"
                />
              </div>

              <div className="relative">
                <Mail className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-[#6B7280]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A017] transition"
                />
              </div>

              <div className="relative">
                <MessageSquare className="absolute top-4 left-4 w-5 h-5 text-[#6B7280]" />
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Your Message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-[#6B7280]/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#D4A017] transition"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-[#D4A017] text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 shadow-md hover:bg-[#D4A017]/90 transition"
              >
                Send Message <Send size={16} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}