'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

export default function Loader() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ringRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(ringRefs.current, { scale: 0, opacity: 0 });
      gsap.set(textRef.current, { opacity: 0, y: 20 });
      gsap.set(logoRef.current, { scale: 0.5, opacity: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(wrapperRef.current, {
            yPercent: -100,
            duration: 0.5,
            ease: 'power4.inOut',
            delay: 0.2,
          });
        },
      });

      tl.to(logoRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: 'power4.out' })
        .to(
          ringRefs.current,
          {
            scale: 1,
            opacity: 0.4,
            duration: 0.6,
            stagger: 0.1,
            ease: 'elastic.out(1, 0.8)',
          },
          '-=0.4'
        )
        .to(
          ringRefs.current,
          {
            opacity: 0,
            scale: 1.5,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.inOut',
          },
          '-=0.3'
        )
        .to(textRef.current, { opacity: 1, y: 0, duration: 0.3 }, '-=0.3');
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center min-h-screen bg-[var(--warm-white)]"
    >
      <div className="relative w-24 h-24 sm:w-32 sm:h-32">
        {/* Rings */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            ref={(el: HTMLDivElement | null): void => {
              ringRefs.current[i] = el;
            }}
            className="absolute inset-0 rounded-full border-2 border-[var(--ethiopian-gold)]"
          />
        ))}

        {/* Logo */}
        <div
          ref={logoRef}
          className="absolute inset-3 sm:inset-4 flex items-center justify-center rounded-full bg-[var(--lake-blue)]"
        >
          <Image
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=128&q=60"
            alt="Lake Bishoftu Resort"
            fill
            className="rounded-full object-cover"
          />
        </div>
      </div>

      {/* Text */}
      <span
        ref={textRef}
        className="mt-4 text-base sm:text-lg tracking-widest text-[var(--soft-gray)] font-['var(--font-roboto)']"
      >
        Lake Bishoftu Resort
      </span>
    </div>
  );
}