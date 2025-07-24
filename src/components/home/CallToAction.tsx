'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CallToAction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null)
  const paraRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        yPercent: 100,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: '+=60%',
          scrub: 1.5,
        },
      });

      gsap.from([headingRef.current, paraRef.current, btnRef.current], {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Fixed hero background */}
      <section className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('./images/bg.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-[var(--lake-blue)]/50" />
      </section>

      {/* CTA section that scrolls over */}
      <section ref={containerRef} className="relative -mt-20">
        <div
          ref={contentRef}
          className="min-h-screen flex items-center justify-center px-6"
        >
          <div className="max-w-3xl text-center">
            <h1
              ref={headingRef}
              className="font-playfair text-4xl font-bold text-[var(--warm-white)] sm:text-5xl md:text-7xl"
            >
              Your Lakefront Oasis Awaits
            </h1>

            <p
              ref={paraRef}
              className="mt-6 text-lg text-[var(--warm-white)]/90 md:text-xl"
            >
              Surrender to the hush of Lake Bishoftu. Immerse yourself in
              Ethiopian warmth, contemporary elegance, and barefoot luxury.
            </p>

            <a
              ref={btnRef}
              href="/booking"
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[var(--ethiopian-gold)] px-8 py-4 text-base font-medium text-[var(--warm-white)] shadow-2xl transition-transform duration-300 hover:scale-105"
            >
              <Calendar size={20} />
              Reserve Your Escape
              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="h-20 bg-[var(--warm-white)] rounded-t-[50px_50px_0_0]" />
      </section>
    </>
  );
}