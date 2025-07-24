"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface Offer {
  title: string;
  price: string;
  description: string;
  image: string;
}

const offers: Offer[] = [
  {
    title: "Weekend Bliss",
    price: "$299",
    description: "Two nights in a Lake-View Suite with complimentary breakfast & spa credits.",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Royal Escape",
    price: "$499",
    description: "Three nights in our Grand Villa with private chef dinner & sunset boat ride.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Honeymoon Hideaway",
    price: "$799",
    description: "Four nights in a Presidential Suite, couples spa & champagne on arrival.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Wellness Retreat",
    price: "$349",
    description: "Two nights with daily yoga, guided meditation & organic gourmet meals.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function SpecialOffersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const offerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
          },
        }
      );

      // Animate offers
      offerRefs.current.forEach((offer, i) => {
        gsap.fromTo(
          offer,
          { y: 100, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            delay: i * 0.15,
            scrollTrigger: {
              trigger: offer,
              start: "top 90%",
            },
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
          Exclusive Special Offers
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center text-[#6B7280] max-w-2xl mx-auto mb-16"
        >
          Discover curated experiences that blend Ethiopian heritage with modern luxury.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              ref={(el: HTMLDivElement | null) => {
                offerRefs.current[index] = el;
              }}
              className="relative rounded-2xl overflow-hidden shadow-xl group bg-white"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative w-full h-72 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-4 left-4 bg-[#D4A017] text-white text-sm font-bold px-3 py-1 rounded-full">
                  Limited Time
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-playfair text-2xl text-[#1E3A8A] mb-2">{offer.title}</h3>
                <p className="text-sm text-[#6B7280] mb-4">{offer.description}</p>

                <div className="flex items-baseline justify-between">
                  <p className="text-3xl font-bold text-[#D4A017]">{offer.price}</p>
                  <span className="text-xs text-[#6B7280]">/person</span>
                </div>

                <button className="mt-6 w-full bg-[#1E3A8A] text-white font-medium py-3 rounded-lg hover:bg-[#1E3A8A]/90 transition-colors duration-300">
                  Reserve Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}