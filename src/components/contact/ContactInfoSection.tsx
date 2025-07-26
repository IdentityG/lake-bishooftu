'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

export default function ContactInfoSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[--warm-white] py-24 sm:py-32">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-[--ethiopian-gold]/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-[--lake-blue]/5 blur-3xl" />
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
            Contact & Location
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[--soft-gray]">
            Reach us effortlessly—whether for reservations, bespoke itineraries, or simply to feel the warmth of Ethiopian hospitality.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left: Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <div className="rounded-3xl border border-[--soft-gray]/20 bg-white p-8 shadow-sm">
              <h3 className="font-playfair text-2xl font-bold text-[--dark-gray]">Get in Touch</h3>

              <div className="mt-6 space-y-6">
                <a
                  href="tel:+251112345678"
                  className="group flex items-center gap-4 rounded-2xl bg-[--lake-blue]/5 p-4 transition-all hover:bg-[--lake-blue]/10"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-[--lake-blue] text-white">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-sm text-[--soft-gray]">Call us</span>
                    <span className="block font-medium text-[--dark-gray]">+251 11 234 5678</span>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5 text-[--lake-blue] transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="mailto:stay@lakebishoftu.com"
                  className="group flex items-center gap-4 rounded-2xl bg-[--ethiopian-gold]/5 p-4 transition-all hover:bg-[--ethiopian-gold]/10"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-[--ethiopian-gold] text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-sm text-[--soft-gray]">Email us</span>
                    <span className="block font-medium text-[--dark-gray]">stay@lakebishoftu.com</span>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5 text-[--ethiopian-gold] transition-transform group-hover:translate-x-1" />
                </a>

                <div className="flex items-center gap-4 rounded-2xl bg-[--nature-green]/5 p-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-[--nature-green] text-white">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-sm text-[--soft-gray]">Visit us</span>
                    <span className="block font-medium text-[--dark-gray]">Lake Bishoftu, Ethiopia</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-2 text-sm text-[--soft-gray]">
                <Clock className="h-4 w-4" />
                <span>Response within 2 hours</span>
              </div>
            </div>

            <div className="rounded-3xl border border-[--soft-gray]/20 bg-white p-8 shadow-sm">
              <h3 className="font-playfair text-2xl font-bold text-[--dark-gray]">Opening Hours</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-[--soft-gray]">Reservations</span>
                  <span className="font-medium text-[--dark-gray]">24 / 7</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[--soft-gray]">Front Desk</span>
                  <span className="font-medium text-[--dark-gray]">24 / 7</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[--soft-gray]">Concierge</span>
                  <span className="font-medium text-[--dark-gray]">24 / 7</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right: Map & Directions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl border border-[--soft-gray]/20 bg-white p-1 shadow-sm"
          >
            <iframe
              title="Lake Bishoftu Resort Location"
              className="h-96 w-full rounded-2xl"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125061.49898699355!2d38.996460823046875!3d8.754352200000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5dd6bbf%3A0x8f3e1c7b8d7e4e1!2sLake%20Bishoftu%20Resort!5e0!3m2!1sen!2set!4v1712345678901"
              allowFullScreen
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}