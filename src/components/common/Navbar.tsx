'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/rooms', label: 'Rooms' },
  { href: '/dining', label: 'Dining' },
  { href: '/spa', label: 'Spa' },
  { href: '/experiences', label: 'Experiences' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: 'https://instagram.com', icon: FaInstagram, label: 'Instagram' },
  { href: 'https://facebook.com', icon: FaFacebook, label: 'Facebook' },
  { href: 'https://twitter.com', icon: FaTwitter, label: 'Twitter' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#1E3A8A] shadow-lg backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="font-playfair text-2xl md:text-3xl font-bold text-lake-blue">
              Lake Bishoftu
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative font-roboto text-base font-medium transition-colors duration-200 ${
                    pathname === link.href ? 'text-[#D4A017]' : 'text-[#F9FAFB] hover:text-[#D4A017]'
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 -bottom-1 w-full h-0.5 bg-ethiopian-gold"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Contact & Social */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#D4A017]" />
                <a
                  href="tel:+251911223344"
                  className="font-roboto text-sm text-[#F9FAFB] hover:text-[#D4A017] transition-colors"
                >
                  +251 911 223 344
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#D4A017]" />
                <a
                  href="mailto:info@lakebishoftu.com"
                  className="font-roboto text-sm text-[#F9FAFB] hover:text-[#D4A017] transition-colors"
                >
                  info@lakebishoftu.com
                </a>
              </div>
              
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-dark-gray hover:text-ethiopian-gold transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-gradient-to-br from-[#1E3A8A] via-dark-gray to-[#166534] lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full px-6">
              <motion.nav
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center space-y-8"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-playfair text-2xl font-medium transition-colors duration-200 ${
                      pathname === link.href ? 'text-[#D4A017]' : 'text-[#F9FAFB] hover:text-ethiopian-gold'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </motion.nav>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center mt-12 space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-[#D4A017]" />
                  <a
                    href="tel:+251911223344"
                    className="font-roboto text-[#F9FAFB]"
                  >
                    +251 911 223 344
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-[#D4A017]" />
                  <a
                    href="mailto:info@lakebishoftu.com"
                    className="font-roboto text-[#F9FAFB]"
                  >
                    info@lakebishoftu.com
                  </a>
                </div>
                <div className="flex items-center space-x-6 mt-6">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F9FAFB] hover:text-[#D4A017] transition-colors duration-200"
                      aria-label={social.label}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}