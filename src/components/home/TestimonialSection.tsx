'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Selam Tsegaye',
    role: 'Travel Blogger',
    quote:
      'The sunrise over Lake Bishoftu from my private balcony was pure magic—luxury wrapped in Ethiopian warmth.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
  },
  {
    name: 'Daniel Mekonnen',
    role: 'Architect',
    quote:
      'Every detail whispers sophistication. It’s heritage re-imagined for the modern traveler.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
  },
  {
    name: 'Maya Haile',
    role: 'Photographer',
    quote:
      'From the spa to the sunset dining deck, every corner was a frame-worthy masterpiece.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
  },
];

export default function TestimonialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRefs.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.25,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.to('[data-section="testimonials"] .quote-icon', {
        y: -6,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="testimonials"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--warm-white)]"
    >
      <div className="max-w-7xl mx-auto w-full">
        <header className="text-center mb-12">
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-[var(--dark-gray)]">
            Moments Shared by Our Guests
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[var(--soft-gray)]">
            Discover why travelers fall in love with Lake Bishoftu Resort again and again.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              ref={(el: HTMLDivElement | null): void => {
                cardRefs.current[i] = el;
              }}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col relative"
            >
              <Quote
                size={36}
                className="quote-icon absolute top-4 right-4 text-[var(--ethiopian-gold)] opacity-20"
              />

              <div className="flex mb-4">
                {Array.from({ length: t.rating }).map((_, r) => (
                  <Star
                    key={r}
                    size={16}
                    className="text-[var(--ethiopian-gold)] fill-[var(--ethiopian-gold)]"
                  />
                ))}
              </div>

              <blockquote className="font-playfair text-lg sm:text-xl text-[var(--dark-gray)] mb-6 flex-1">
                “{t.quote}”
              </blockquote>

              <div className="flex items-center gap-3">
                <Image
                  src={t.img}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-[var(--dark-gray)] text-sm sm:text-base">
                    {t.name}
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--soft-gray)]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}