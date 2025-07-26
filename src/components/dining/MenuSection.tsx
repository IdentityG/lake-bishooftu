'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Clock, MapPin, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  {
    category: 'Breakfast',
    items: [
      {
        name: 'Injera Platter',
        description: 'Traditional injera served with assorted wot, including misir wot and shiro, with fresh vegetables.',
        price: '350 ETB',
        image: 'https://images.unsplash.com/photo-1615524829907-2e2f1285f9b5?q=80&w=800',
        rating: 4.9,
      },
      {
        name: 'Chechebsa',
        description: 'Flatbread braised with berbere and Ethiopian butter, served with honey and yogurt.',
        price: '280 ETB',
        image: 'https://images.unsplash.com/photo-1606499631919-4e6e6a7c0b1b?q=80&w=800',
        rating: 4.7,
      },
      {
        name: 'Kinche',
        description: 'Cracked wheat cooked with Ethiopian butter and spices, served with a side of ayib.',
        price: '250 ETB',
        image: 'https://images.unsplash.com/photo-1627303562537-0f6b32694a0b?q=80&w=800',
        rating: 4.6,
      },
      {
        name: 'Fir Fir',
        description: 'Torn injera soaked in spiced berbere sauce with onions and peppers, optionally with beef.',
        price: '320 ETB',
        image: 'https://images.unsplash.com/photo-1592978301978-8e4f91b25d5f?q=80&w=800',
        rating: 4.8,
      },
    ],
  },
  {
    category: 'Lunch',
    items: [
      {
        name: 'Tibs Signature',
        description: 'Prime beef cubes sautéed with berbere, onions, and peppers, served with injera or rice.',
        price: '450 ETB',
        image: 'https://images.unsplash.com/photo-1606499631919-4e6e6a7c0b1b?q=80&w=800',
        rating: 5.0,
      },
      {
        name: 'Grilled Tilapia',
        description: 'Fresh lake tilapia grilled with lemon butter sauce, served with gomen and rice.',
        price: '520 ETB',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800',
        rating: 4.9,
      },
      {
        name: 'Beyaynetu',
        description: 'A vibrant platter of vegetarian dishes: misir wot, shiro, gomen, and tikil gomen.',
        price: '400 ETB',
        image: 'https://images.unsplash.com/photo-1615524829907-2e2f1285f9b5?q=80&w=800',
        rating: 4.8,
      },
      {
        name: 'Key Wat',
        description: 'Spicy beef stew with berbere, onions, and garlic, served with injera.',
        price: '480 ETB',
        image: 'https://images.unsplash.com/photo-1627303562537-0f6b32694a0b?q=80&w=800',
        rating: 4.9,
      },
    ],
  },
  {
    category: 'Dinner',
    items: [
      {
        name: 'Doro Wat',
        description: 'Traditional Ethiopian chicken stew with hard-boiled eggs, served with injera.',
        price: '580 ETB',
        image: 'https://images.unsplash.com/photo-1615524829907-2e2f1285f9b5?q=80&w=800',
        rating: 5.0,
      },
      {
        name: 'Kitfo',
        description: 'Freshly minced lean beef with mitmita and spiced butter, served raw or medium-rare.',
        price: '650 ETB',
        image: 'https://images.unsplash.com/photo-1606499631919-4e6e6a7c0b1b?q=80&w=800',
        rating: 4.9,
      },
      {
        name: 'Shint Tibs',
        description: 'Juicy rib-eye cubes sautéed with onions, jalapeños, and rosemary, served with injera.',
        price: '700 ETB',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800',
        rating: 5.0,
      },
      {
        name: 'Vegetarian Delight',
        description: 'Assorted vegan dishes including shiro, gomen, and red lentil stew, served with teff injera.',
        price: '420 ETB',
        image: 'https://images.unsplash.com/photo-1592978301978-8e4f91b25d5f?q=80&w=800',
        rating: 4.8,
      },
    ],
  },
];

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('Breakfast');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate only the title with GSAP ScrollTrigger
      gsap.from('.menu-title', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.menu-title',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#F9FAFB] py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern with Dark Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E3A8A' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute inset-0 bg-[#111827] opacity-50" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="menu-title font-playfair text-5xl md:text-7xl font-bold text-[#111827] mb-4">
            Culinary Experience
          </h2>
          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
            Discover the authentic flavors of Ethiopia, reimagined with modern culinary artistry
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/50 backdrop-blur-sm rounded-full p-2 shadow-xl">
            {menuItems.map((category) => (
              <button
                key={category.category}
                onClick={() => setActiveCategory(category.category)}
                className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.category
                    ? 'text-white'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                {activeCategory === category.category && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#1E3A8A] rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{category.category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="wait" initial={false}>
            {menuItems
              .find((cat) => cat.category === activeCategory)
              ?.items.map((item, index) => (
                <motion.div
                  key={`${activeCategory}-${item.name}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/20 to-[#D4A017]/20" />
                    <motion.div
                      className="absolute inset-0 bg-[#1E3A8A]/10"
                      animate={{
                        opacity: hoveredItem === item.name ? 0.8 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-[#D4A017] fill-current" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-playfair text-2xl font-bold text-[#111827]">
                        {item.name}
                      </h3>
                      <span className="text-2xl font-bold text-[#1E3A8A]">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-[#6B7280] mb-4">{item.description}</p>

                    {/* Animated CTA */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 text-[#1E3A8A] font-medium group/btn"
                    >
                      <span>Order Now</span>
                      <motion.div
                        animate={{ x: hoveredItem === item.name ? 5 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Sparkles className="w-4 h-4" />
                      </motion.div>
                    </motion.button>
                  </div>

                  {/* Hover Effect Border */}
                  <motion.div
                    className="absolute inset-0 border-2 border-[#D4A017] rounded-2xl pointer-events-none"
                    animate={{
                      opacity: hoveredItem === item.name ? 1 : 0,
                      scale: hoveredItem === item.name ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {/* Info Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <Clock className="w-8 h-8 text-[#1E3A8A] mb-3" />
            <h4 className="font-playfair text-xl font-bold mb-2">Hours</h4>
            <p className="text-[#6B7280]">Daily 6:00 AM - 10:00 PM</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <MapPin className="w-8 h-8 text-[#1E3A8A] mb-3" />
            <h4 className="font-playfair text-xl font-bold mb-2">Location</h4>
            <p className="text-[#6B7280]">Main Restaurant & Lake Terrace</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <Sparkles className="w-8 h-8 text-[#1E3A8A] mb-3" />
            <h4 className="font-playfair text-xl font-bold mb-2">Special</h4>
            <p className="text-[#6B7280]">Chef's Tasting Menu Available</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}