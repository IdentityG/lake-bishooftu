'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { MapPin, Navigation, Sun, Clock, Star } from 'lucide-react';

export default function LocationMapSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const mapOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[--warm-white] py-24 sm:py-32">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[--ethiopian-gold]/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[--lake-blue]/5 blur-3xl" />
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
            Find Us in Paradise
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[--soft-gray]">
            Nestled on the shores of Lake Bishoftu—where volcanic hills meet crystal waters and golden sunsets.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Map + Pin */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[480px] overflow-hidden rounded-3xl shadow-2xl lg:h-[540px]"
          >
            <motion.div style={{ opacity: mapOpacity }} className="h-full w-full">
              <iframe
                title="Lake Bishoftu Resort Location"
                className="h-full w-full rounded-3xl"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125061.49898699355!2d38.996460823046875!3d8.754352200000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5dd6bbf%3A0x8f3e1c7b8d7e4e1!2sLake%20Bishoftu%20Resort!5e0!3m2!1sen!2set!4v1712345678901"
                allowFullScreen
                loading="lazy"
              />
            </motion.div>

            {/* Floating Pin */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <MapPin className="h-10 w-10 text-[--ethiopian-gold]" strokeWidth={2.5} />
            </motion.div>

            {/* Mouse Spotlight */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{
                background: `radial-gradient(600px at ${smoothMouseX}px ${smoothMouseY}px, rgba(30, 58, 138, 0.06), transparent 80%)`,
              }}
            />
          </motion.div>

          {/* Right: Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h3 className="font-playfair text-3xl font-bold text-[--dark-gray]">
              Lake Bishoftu Resort
            </h3>

            <p className="mt-2 text-sm text-[--soft-gray]">
              Debre Zeyit, Ethiopia • 40 km from Addis Ababa Bole International Airport
            </p>

            <div className="mt-8 space-y-6">
              {/* Highlights */}
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-[--dark-gray]">
                <div className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-[--ethiopian-gold]" />
                  <span>Year-round temperate climate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[--nature-green]" />
                  <span>45 min drive from airport</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-[--ethiopian-gold]" />
                  <span>5-star lakeside sanctuary</span>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-[--soft-gray]/20 p-6 shadow-sm">
                <h4 className="font-playfair text-xl font-bold text-[--dark-gray]">
                  Directions & Tips
                </h4>
                <ul className="mt-4 space-y-3 text-sm text-[--soft-gray]">
                  <li className="flex items-start gap-3">
                    <Navigation className="mt-0.5 h-4 w-4 shrink-0 text-[--lake-blue]" />
                    <span>
                      From Addis Ababa: take Bole Road south-east, then follow Debre Zeyit signs for 30 km.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[--lake-blue]" />
                    <span>
                      Shuttle service available—reserve at least 24 hours prior to arrival.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sun className="mt-0.5 h-4 w-4 shrink-0 text-[--lake-blue]" />
                    <span>
                      Best time to visit: October–April for clear skies and golden sunsets.
                    </span>
                  </li>
                </ul>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[--lake-blue] py-4 text-sm font-medium text-white transition-all duration-500 hover:bg-[--ethiopian-gold]"
              >
                Get Directions
                <Navigation className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}