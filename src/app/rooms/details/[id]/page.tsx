'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Playfair_Display } from 'next/font/google';
import { ChevronLeft, ChevronRight, Star, Users, Bed, Waves, Wifi, Utensils, Car, Coffee, MapPin } from 'lucide-react';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { FaSwimmingPool, FaSpa } from 'react-icons/fa';
import { MdLocalLaundryService } from 'react-icons/md';
import { TbAirConditioning } from 'react-icons/tb';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { rooms } from '../../../../data/rooms';

gsap.registerPlugin(ScrollTrigger);

const playfair = Playfair_Display({ subsets: ['latin'] });

interface RoomImage {
  id: number;
  url: string;
  alt: string;
}

interface Feature {
  icon: string;
  label: string;
  value: string;
}

interface Amenity {
  icon: React.ReactNode;
  label: string;
}

interface Room {
  id: string;
  type: 'single' | 'double' | 'standard' | 'vip' | 'family';
  title: string;
  description: string;
  price: number;
  image: string;
  amenities: string[];
  maxGuests: number;
  bedType: string;
  size: string;
  view: string;
  features: Feature[];
  images: RoomImage[];
}

const amenitiesIcons: Amenity[] = [
  { icon: <Wifi className="w-5 h-5" />, label: 'High-Speed Wi-Fi' },
  { icon: <TbAirConditioning className="w-5 h-5" />, label: 'Climate Control' },
  { icon: <Coffee className="w-5 h-5" />, label: 'Coffee & Tea Station' },
  { icon: <Utensils className="w-5 h-5" />, label: '24/7 Room Service' },
  { icon: <FaSwimmingPool className="w-5 h-5" />, label: 'Infinity Pool Access' },
  { icon: <FaSpa className="w-5 h-5" />, label: 'Spa & Wellness' },
  { icon: <Car className="w-5 h-5" />, label: 'Complimentary Parking' },
  { icon: <MdLocalLaundryService className="w-5 h-5" />, label: 'Laundry Service' },
  { icon: <Waves className="w-5 h-5" />, label: 'Lake View' },
  { icon: <Waves className="w-5 h-5" />, label: 'Kids Area' },
  { icon: <Star className="w-5 h-5" />, label: 'Butler Service' },
  { icon: <Star className="w-5 h-5" />, label: 'Balcony' },
  { icon: <Star className="w-5 h-5" />, label: 'Coffee Machine' },
  { icon: <Star className="w-5 h-5" />, label: 'Private Pool' },
];

export default function RoomDetailsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const params = useParams();
  const roomId = params.id as string;
  const room = rooms.find((r) => r.id === roomId);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(heroRef.current, {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.from(contentRef.current?.children || [], {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.gallery-item', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 80%',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % (room?.images.length || 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + (room?.images.length || 1)) % (room?.images.length || 1));
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-5 h-5" />;
      case 'Bed':
        return <Bed className="w-5 h-5" />;
      case 'BsFillGrid3X3GapFill':
        return <BsFillGrid3X3GapFill className="w-5 h-5" />;
      case 'Waves':
        return <Waves className="w-5 h-5" />;
      default:
        return <Star className="w-5 h-5" />;
    }
  };

  if (!room) {
    return <div className="text-center py-20 text-[var(--dark-gray)]">Room not found</div>;
  }

  return (
    <div ref={containerRef} className="bg-[var(--warm-white)] min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[70vh] md:h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={room.images[currentImage].url}
            alt={room.images[currentImage].alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className={`${playfair.className} text-5xl md:text-7xl lg:text-8xl font-bold mb-4`}>
              {room.title}
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-90">
              Experience Ethiopian luxury at its finest
            </p>
          </div>
        </div>

        {/* Gallery Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={prevImage}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <div className="flex gap-2">
            {room.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImage ? 'w-8 bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextImage}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section ref={contentRef} className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Back to Rooms Badge */}
          <div className="mb-8">
            <Link href="/rooms#room-section">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--nature-green)]/10 text-[var(--nature-green)] rounded-full font-medium hover:bg-[var(--nature-green)]/20 transition-colors duration-300">
                <ChevronLeft className="w-5 h-5" />
                <span>Back to Rooms</span>
              </div>
            </Link>
          </div>

          {/* Overview */}
          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <div className="md:col-span-2">
              <h2 className={`${playfair.className} text-4xl md:text-5xl text-[var(--dark-gray)] mb-6`}>
                Unparalleled Lakefront Elegance
              </h2>
              <p className="text-lg text-[var(--soft-gray)] leading-relaxed mb-6">
                {room.description}
              </p>
            </div>
            <div className="bg-[var(--ethiopian-gold)]/10 p-8 rounded-2xl h-fit max-h-48">
              <h3 className={`${playfair.className} text-2xl text-[var(--lake-blue)] mb-4`}>
                From ${room.price} / night
              </h3>
            </div>
          </div>

          {/* Features */}
          <div className="mb-20">
            <h3 className={`${playfair.className} text-3xl text-[var(--dark-gray)] mb-8`}>
              Room Features
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {room.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="text-[var(--ethiopian-gold)] mb-3">{getIconComponent(feature.icon)}</div>
                  <p className="text-sm text-[var(--soft-gray)] mb-1">{feature.label}</p>
                  <p className="font-medium text-[var(--dark-gray)]">{feature.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div ref={galleryRef} className="mb-20">
            <h3 className={`${playfair.className} text-3xl text-[var(--dark-gray)] mb-8`}>
              Suite Gallery
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {room.images.map((image) => (
                <div
                  key={image.id}
                  className="gallery-item relative group cursor-pointer overflow-hidden rounded-xl"
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-20">
            <h3 className={`${playfair.className} text-3xl text-[var(--dark-gray)] mb-8`}>
              Amenities & Services
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {room.amenities.map((amenity, index) => {
                const amenityIcon = amenitiesIcons.find((a) => a.label === amenity);
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className="text-[var(--nature-green)]">{amenityIcon?.icon || <Star className="w-5 h-5" />}</div>
                    <span className="text-sm text-[var(--dark-gray)]">{amenity}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Location */}
          <div className="bg-gradient-to-r from-[var(--lake-blue)]/5 to-[var(--ethiopian-gold)]/5 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className={`${playfair.className} text-3xl text-[var(--dark-gray)] mb-4`}>
                  Prime Location
                </h3>
                <p className="text-[var(--soft-gray)] mb-6">
                  Located just 45 minutes from Addis Ababa, our resort sits on the shores of
                  Lake Bishoftu, offering easy access to both urban conveniences and
                  natural beauty.
                </p>
                <div className="flex items-center gap-2 text-[var(--lake-blue)]">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">Lake Bishoftu, Oromia, Ethiopia</span>
                </div>
              </div>
              <div className="h-64 bg-gray-200 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80"
                  alt="Lake Bishoftu Resort Location"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}