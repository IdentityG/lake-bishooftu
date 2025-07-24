'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MapPin, Phone, Mail, Clock, ArrowUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLLIElement | null)[]>([]);
  const socialRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
      linkRefs.current.forEach((li, index) => {
        gsap.fromTo(
          li,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: index * 0.1, ease: 'power3.out' }
        );
      });
      socialRefs.current.forEach((a, index) => {
        gsap.fromTo(
          a,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, delay: 0.4 + index * 0.1, ease: 'back.out(1.7)' }
        );
      });
    }, footerRef);

    // Scroll event listener to toggle back-to-top button
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const halfwayPoint = documentHeight / 2;

      setShowScrollTop(scrollPosition > halfwayPoint);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="bg-[#111827] text-[#F9FAFB] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Section */}
          <motion.div ref={logoRef} className="flex flex-col space-y-6">
            <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D4A017] to-[#F9FAFB]">
              Lake Bishoftu Resort
            </h3>
            <p className="font-['Roboto'] text-sm text-[#9CA3AF] leading-relaxed max-w-xs">
              Experience Ethiopian luxury on the pristine shores of Lake Bishoftu.
            </p>
            <ul className="space-y-4 text-sm font-['Roboto']">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-[#D4A017] mt-0.5" />
                <span>
                  Lake Bishoftu, <br />
                  Bishoftu, Ethiopia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-[#D4A017]" />
                <span>+251 11 667 8700</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-[#D4A017]" />
                <span>reservations@lakebishoftu.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={20} className="text-[#D4A017]" />
                <span>24/7 Concierge</span>
              </li>
            </ul>
          </motion.div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-6">
            <h4 className="font-['Playfair_Display'] text-xl md:text-2xl font-semibold text-[#F9FAFB]">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm font-['Roboto']">
              {[
                { name: 'About', href: '/about' },
                { name: 'Rooms & Suites', href: '/rooms' },
                { name: 'Dining', href: '/dining' },
                { name: 'Spa', href: '/spa' },
                { name: 'Offers', href: '/offers' },
                { name: 'Gallery', href: '/gallery' },
              ].map((link, index) => (
                <motion.li
                  key={link.name}
                  ref={(el: HTMLLIElement | null): void => { linkRefs.current[index] = el }}
                  className="hover:text-[#D4A017] transition-colors duration-200"
                >
                  <Link href={link.href} className="block">
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col space-y-6">
            <h4 className="font-['Playfair_Display'] text-xl md:text-2xl font-semibold text-[#F9FAFB]">
              Resources
            </h4>
            <ul className="space-y-3 text-sm font-['Roboto']">
              {[
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms & Conditions', href: '/terms' },
                { name: 'FAQ', href: '/faq' },
                { name: 'Careers', href: '/careers' },
                { name: 'Press Kit', href: '/press' },
              ].map((res, index) => (
                <motion.li
                  key={res.name}
                  ref={(el: HTMLLIElement | null): void => { linkRefs.current[index + 6] = el }}
                  className="hover:text-[#D4A017] transition-colors duration-200"
                >
                  <Link href={res.href} className="block">
                    {res.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col space-y-6">
            <h4 className="font-['Playfair_Display'] text-xl md:text-2xl font-semibold text-[#F9FAFB]">
              Stay Updated
            </h4>
            <p className="font-['Roboto'] text-sm text-[#9CA3AF] leading-relaxed">
              Subscribe for exclusive offers and resort updates.
            </p>
            <motion.form
              className="flex flex-col gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg bg-[#1F2A44] border border-[#6B7280]/30 text-[#F9FAFB] focus:outline-none focus:border-[#D4A017] transition-colors duration-200"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-[#D4A017] text-[#111827] font-['Roboto'] font-semibold py-3 rounded-lg hover:bg-[#D4A017]/90 transition-colors duration-200"
              >
                Subscribe
              </motion.button>
            </motion.form>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-16 pt-10 border-t border-[#6B7280]/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-['Roboto'] text-sm text-[#9CA3AF]">
            © {new Date().getFullYear()} Lake Bishoftu Resort. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {[
              { Icon: FaFacebook, href: 'https://facebook.com' },
              { Icon: FaTwitter, href: 'https://twitter.com' },
              { Icon: FaInstagram, href: 'https://instagram.com' },
              { Icon: FaLinkedin, href: 'https://linkedin.com' },
            ].map(({ Icon, href }, index) => (
              <motion.div
                key={index}
                ref={(el: HTMLDivElement | null): void => { socialRefs.current[index] = el }}
                className="w-10 h-10 rounded-full bg-[#1E3A8A]/20 flex items-center justify-center hover:bg-[#D4A017] hover:text-[#111827] transition-colors duration-200"
              >
                <Link href={href} target="_blank" rel="noopener noreferrer">
                  <Icon size={20} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Back-to-top Button */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-14 h-14 rounded-full bg-[#D4A017] text-[#111827] shadow-lg hover:shadow-xl z-50 flex items-center justify-center transition-opacity duration-300 ${showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </motion.button>
    </footer>
  );
}