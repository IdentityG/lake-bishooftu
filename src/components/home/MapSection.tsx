"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function LocationMapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 90%" },
        }
      );

      gsap.fromTo(
        mapRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: mapRef.current, start: "top 85%" },
        }
      );

      cardRefs.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 md:px-10 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          ref={titleRef}
          className="font-playfair text-4xl md:text-5xl lg:text-6xl text-center text-[#111827] mb-4"
        >
          Find Your Way to Paradise
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center text-[#6B7280] max-w-2xl mx-auto mb-16"
        >
          Nestled on the shores of Lake Bishoftu, we’re just 40 minutes from Addis Ababa Bole International Airport.
        </motion.p>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Map */}
          <motion.div
            ref={mapRef}
            className="lg:col-span-3 relative rounded-2xl overflow-hidden shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <iframe
              title="Lake Bishoftu Resort Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126423.84438600878!2d38.9914!3d8.7525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85b037a9ad4d%3A0x4d54f5b0b0e3a1!2sLake%20Bishoftu%20Resort!5e0!3m2!1sen!2set!4v1710000000000"
              className="w-full h-[450px] md:h-[550px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </motion.div>

          {/* Info Cards */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {[
              {
                icon: <MapPin className="w-6 h-6 text-[#D4A017]" />,
                label: "Address",
                text: "Lake Bishoftu, Bishoftu, Ethiopia",
              },
              {
                icon: <Phone className="w-6 h-6 text-[#D4A017]" />,
                label: "Phone",
                text: "+251 11 667 8700",
              },
              {
                icon: <Mail className="w-6 h-6 text-[#D4A017]" />,
                label: "Email",
                text: "reservations@lakebishoftu.com",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                ref={(el: HTMLDivElement | null): void => { cardRefs.current[idx] = el }}
                className="bg-white rounded-2xl p-6 shadow-lg flex items-start gap-4"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <div>
                  <p className="font-playfair text-lg text-[#111827]">{item.label}</p>
                  <p className="text-sm text-[#6B7280]">{item.text}</p>
                </div>
              </motion.div>
            ))}

            {/* CTA */}
            <motion.div
              ref={(el: HTMLDivElement | null): void => { cardRefs.current[3] = el }}
              className="bg-gradient-to-br from-[#1E3A8A] to-[#D4A017] rounded-2xl p-6 text-white"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="font-playfair text-2xl mb-2">Need a Shuttle?</h3>
              <p className="text-sm mb-4">
                We provide private airport transfers in luxury vehicles.
              </p>
              <button className="flex items-center gap-2 text-sm font-medium border border-white rounded-full px-4 py-2 hover:bg-white hover:text-[#1E3A8A] transition">
                Book Transfer <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}