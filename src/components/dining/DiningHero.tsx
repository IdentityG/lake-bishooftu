'use client';

import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function DiningHero() {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollHintRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1.2, ease: 'power3.out' },
    });

    tl.fromTo(
      bgRef.current,
      { scale: 1.15, rotation: 0.5 },
      { scale: 1, rotation: 0, duration: 2 }
    )
      .fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 0.45 },
        '-=1.5'
      )
      .fromTo(
        headlineRef.current,
        { yPercent: 80, opacity: 0 },
        { yPercent: 0, opacity: 1 },
        '-=0.8'
      )
      .fromTo(
        sublineRef.current,
        { yPercent: 40, opacity: 0 },
        { yPercent: 0, opacity: 1 },
        '-=0.6'
      )
      .fromTo(
        ctaRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1 },
        '-=0.4'
      )
      .fromTo(
        scrollHintRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.2'
      );

    gsap.to(scrollHintRef.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.4,
      ease: 'sine.inOut',
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        gsap.to(bgRef.current, { yPercent: self.progress * 50 });
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[var(--warm-white)]"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/images/bg.jpg"
          alt="Lake Bishoftu Resort Dining"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[var(--lake-blue)]"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <h1
          ref={headlineRef}
          className="font-[Playfair_Display] text-[clamp(2.5rem,6vw,5.5rem)] leading-none text-[var(--warm-white)] tracking-[-0.02em] max-w-5xl"
        >
          Savor Culinary Artistry Overlooking Lake Bishoftu
        </h1>

        <p
          ref={sublineRef}
          className="font-[Roboto] text-lg md:text-xl text-[var(--warm-white)] mt-6 max-w-2xl opacity-90"
        >
          From sunrise breakfasts to starlit dinners, experience the finest flavors crafted with locally-sourced ingredients.
        </p>

        <a
          ref={ctaRef}
          href="#reserve"
          className="inline-flex items-center justify-center px-8 py-4 mt-10 bg-[var(--ethiopian-gold)] text-[var(--dark-gray)] font-[Roboto] font-medium tracking-wider uppercase hover:bg-[var(--ethiopian-gold)]/90 transition-all duration-300 shadow-2xl shadow-[var(--ethiopian-gold)]/30"
        >
          Reserve Your Table
        </a>
      </div>

      <button
        ref={scrollHintRef}
        aria-label="Scroll to explore"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--warm-white)] hover:scale-110 transition-transform"
      >
        <ArrowDown size={28} />
      </button>
    </section>
  );
}