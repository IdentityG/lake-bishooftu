'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { ArrowRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroRoomsOverview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left side stagger animation
      gsap.from('.left-anim', {
        x: -100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Right side stagger animation
      gsap.from('.right-anim', {
        x: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rightRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // CTA scale animation
      gsap.fromTo(
        ctaRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Parallax effect on images
      gsap.to('.parallax-img', {
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden bg-gradient-to-br from-[#1E3A8A]/90 via-[#166534]/80 to-[#D4A017]/60 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920')] bg-blend-overlay bg-cover bg-center relative before:content-[''] before:absolute before:inset-0 before:bg-[#111827] before:opacity-50"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
        {/* Left Content */}
        <div ref={leftRef} className="space-y-6">
          <h1 className="left-anim font-playfair text-4xl md:text-5xl lg:text-6xl text-[#F9FAFB] leading-tight">
            Serenity by the{' '}
            <span className="text-[#1E3A8A]">Lake</span>
          </h1>

          <p className="left-anim text-lg text-[#F9FAFB]/95 max-w-md leading-relaxed">
            Discover our curated collection of lake-view suites and private
            villas, designed with Ethiopian craftsmanship and modern luxury.
          </p>

          <div className="left-anim flex items-center space-x-4">
            <div className="flex text-[#D4A017]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>
            <span className="text-[#F9FAFB] font-medium">
              4.9 / 5 Guest Rating
            </span>
          </div>

          <button className="left-anim bg-[#D4A017] text-[#111827] px-8 py-4 rounded-full font-medium text-lg flex items-center space-x-2 hover:bg-[#b38f14] transition-colors">
            <span>Explore Rooms</span>
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Right Content */}
        <div ref={rightRef} className="relative">
          <div className="grid grid-cols-2 grid-rows-3 gap-4 h-[60vh] lg:h-[70vh]">
            {/* Top image */}
            <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80"
                alt="Lake Bishoftu Resort"
                fill
                className="parallax-img object-cover"
              />
            </div>

            {/* Bottom two images */}
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85f?w=400&q=80"
                alt="Resort Interior"
                fill
                className="parallax-img object-cover"
              />
            </div>

            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1578683012766-209fefe8c81b?w=400&q=80"
                alt="Lake View"
                fill
                className="parallax-img object-cover"
              />
            </div>
          </div>

          {/* Floating CTA */}
          <div
            ref={ctaRef}
            className="absolute -bottom-8 -left-8 bg-[#1E3A8A] text-white p-6 rounded-2xl shadow-2xl"
          >
            <p className="font-playfair text-2xl mb-1">From $250/night</p>
            <p className="text-sm opacity-80">Including breakfast & spa access</p>
          </div>
        </div>
      </div>
    </section>
  );
}