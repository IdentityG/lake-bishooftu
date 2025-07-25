'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Star, 
  Waves, 
  Wifi, 
  Coffee, 
  Car, 
  Utensils, 
  Sparkles,
  Zap,
  Shield,
  Heart,
  Mountain,
  Sun,
  Moon,
  Wind,
  TreePine,
  Droplets,
  Award,
  Crown,
  Diamond
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Amenity {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  category: 'luxury' | 'comfort' | 'nature' | 'service';
  image: string;
}

const amenities: Amenity[] = [
  {
    id: '1',
    icon: <Crown className="w-8 h-8" />,
    title: 'Royal Lakefront Views',
    description: 'Wake to panoramic vistas of Lake Bishoftu from your private terrace',
    category: 'luxury',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'
  },
  {
    id: '2',
    icon: <Sparkles className="w-8 h-8" />,
    title: 'Ethiopian Gold Spa',
    description: 'Traditional treatments infused with golden botanicals and ancient rituals',
    category: 'luxury',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80'
  },
  {
    id: '3',
    icon: <Zap className="w-8 h-8" />,
    title: 'Smart-Room Tech',
    description: 'Voice-controlled lighting, temperature and entertainment at your command',
    category: 'comfort',
    image: 'https://images.unsplash.com/photo-1558002038-1055e2dae2d7?w=800&q=80'
  },
  {
    id: '4',
    icon: <Wifi className="w-8 h-8" />,
    title: 'Hyper-Fast WiFi',
    description: 'Stream, work and connect with fiber-optic speeds throughout your stay',
    category: 'comfort',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
  },
  {
    id: '5',
    icon: <TreePine className="w-8 h-8" />,
    title: 'Private Forest Garden',
    description: 'Your own slice of Ethiopian highland forest with endemic flora',
    category: 'nature',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80'
  },
  {
    id: '6',
    icon: <Droplets className="w-8 h-8" />,
    title: 'Infinity Lake Pool',
    description: 'Seamlessly blends with Lake Bishoftu horizon for surreal swims',
    category: 'nature',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80'
  },
  {
    id: '7',
    icon: <Utensils className="w-8 h-8" />,
    title: 'Personal Chef Service',
    description: 'Master chefs craft bespoke menus featuring Ethiopian fusion cuisine',
    category: 'service',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80'
  },
  {
    id: '8',
    icon: <Car className="w-8 h-8" />,
    title: 'Helicopter Transfers',
    description: 'Arrive in style with direct aerial transfers from Addis Ababa',
    category: 'service',
    image: 'https://images.unsplash.com/photo-1517999144091-3d9d76b77547?w=800&q=80'
  }
];

const categoryColors = {
  luxury: 'from-[var(--ethiopian-gold)]/20 to-[var(--ethiopian-gold)]/5',
  comfort: 'from-[var(--lake-blue)]/20 to-[var(--lake-blue)]/5',
  nature: 'from-[var(--nature-green)]/20 to-[var(--nature-green)]/5',
  service: 'from-[var(--soft-gray)]/20 to-[var(--soft-gray)]/5'
};

export default function AmenitiesFeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Grid items stagger animation
      gsap.from('.amenity-card', {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });

      // Floating animation for icons
      gsap.to('.floating-icon', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      // Parallax effect for background elements
      gsap.to('.parallax-bg', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden py-32 bg-[var(--warm-white)]">
      {/* Background Elements */}
      <div className="parallax-bg absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[var(--lake-blue)] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--ethiopian-gold)] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="font-playfair text-5xl md:text-7xl text-[var(--dark-gray)] mb-6"
          >
            Amenities & Features
          </h2>
          <p className="text-xl text-[var(--soft-gray)] max-w-3xl mx-auto leading-relaxed">
            Where Ethiopian hospitality meets world-class luxury. Every detail crafted to elevate your stay.
          </p>
        </div>

        {/* Amenities Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {amenities.map((amenity) => (
            <div
              key={amenity.id}
              className="amenity-card group relative"
            >
              {/* Card Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[amenity.category]} rounded-2xl transform transition-all duration-500 group-hover:scale-105`} />
              
              {/* Main Card */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 h-full transform transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                {/* Icon */}
                <div className={`floating-icon inline-flex p-4 rounded-xl mb-6 transition-colors duration-300 ${
                  amenity.category === 'luxury' ? 'bg-[var(--ethiopian-gold)]/20 text-[var(--ethiopian-gold)]' :
                  amenity.category === 'comfort' ? 'bg-[var(--lake-blue)]/20 text-[var(--lake-blue)]' :
                  amenity.category === 'nature' ? 'bg-[var(--nature-green)]/20 text-[var(--nature-green)]' :
                  'bg-[var(--soft-gray)]/20 text-[var(--soft-gray)]'
                }`}>
                  {amenity.icon}
                </div>

                {/* Title */}
                <h3 className="font-playfair text-2xl text-[var(--dark-gray)] mb-4 transition-colors duration-300">
                  {amenity.title}
                </h3>

                {/* Description */}
                <p className="text-[var(--soft-gray)] leading-relaxed mb-6">
                  {amenity.description}
                </p>

                {/* Image Preview */}
                <div className="relative h-32 rounded-lg overflow-hidden">
                  <img
                    src={amenity.image}
                    alt={amenity.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Hover Effect Ring */}
                <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-[var(--ethiopian-gold)]/50 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Award className="w-12 h-12" />,
              title: 'Award-Winning',
              subtitle: 'Best Luxury Resort 2024'
            },
            {
              icon: <Heart className="w-12 h-12" />,
              title: 'Guest Favorite',
              subtitle: '4.9/5 from 2,847 reviews'
            },
            {
              icon: <Mountain className="w-12 h-12" />,
              title: 'Eco-Certified',
              subtitle: 'Sustainable luxury practices'
            }
          ].map((highlight, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-100 hover:border-[var(--ethiopian-gold)]/30 transition-all duration-300"
            >
              <div className="inline-flex p-4 bg-[var(--ethiopian-gold)]/10 text-[var(--ethiopian-gold)] rounded-2xl mb-4">
                {highlight.icon}
              </div>
              <h4 className="font-playfair text-xl text-[var(--dark-gray)] mb-2">
                {highlight.title}
              </h4>
              <p className="text-[var(--soft-gray)]">{highlight.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}