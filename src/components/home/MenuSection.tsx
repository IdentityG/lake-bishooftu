"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
}

const menuData: MenuItem[] = [
  {
    id: 1,
    name: "Ethiopian Injera Platter",
    category: "breakfast",
    price: "$12",
    image: "https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?auto=format&fit=crop&w=800&q=80",
    description: "Traditional injera with assorted wats and fresh herbs.",
  },
  {
    id: 2,
    name: "Avocado Toast Royale",
    category: "breakfast",
    price: "$9",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    description: "Sourdough, smashed avocado, poached egg & dukkah.",
  },
  {
    id: 3,
    name: "Lake-Side Burger",
    category: "burger",
    price: "$15",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c583c?auto=format&fit=crop&w=800&q=80",
    description: "Grass-fed beef, smoked gouda & caramelized onions.",
  },
  {
    id: 4,
    name: "Margherita Pizza",
    category: "pizza",
    price: "$14",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
    description: "San Marzano tomato, buffalo mozzarella & fresh basil.",
  },
  {
    id: 5,
    name: "Grilled Nile Perch",
    category: "lunch",
    price: "$22",
    image: "https://images.unsplash.com/photo-1519708227412-cda01dd3b8c5?auto=format&fit=crop&w=800&q=80",
    description: "Served with lemon butter sauce and garden vegetables.",
  },
  {
    id: 6,
    name: "Doro Wat & Rice",
    category: "diner",
    price: "$19",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
    description: "Spicy chicken stew slow-cooked in berbere sauce.",
  },
  {
    id: 7,
    name: "Tropical Sunrise",
    category: "juice",
    price: "$7",
    image: "https://images.unsplash.com/photo-1556679343-c1c4b8e4fdce?auto=format&fit=crop&w=800&q=80",
    description: "Mango, pineapple & passion fruit blend.",
  },
  {
    id: 8,
    name: "Sparkling Ambo",
    category: "soft drink",
    price: "$4",
    image: "https://images.unsplash.com/photo-1553421583-21e5cf92082f?auto=format&fit=crop&w=800&q=80",
    description: "Ethiopian mineral water with a twist of lime.",
  },
];

const categories = ["all", "breakfast", "lunch", "diner", "burger", "pizza", "juice", "soft drink"];

export default function MenuSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const filteredItems =
    activeCategory === "all"
      ? menuData
      : menuData.filter((item) => item.category === activeCategory);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 90%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const prevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

  return (
    <section ref={sectionRef} className="py-24 px-4 md:px-10 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          ref={titleRef}
          className="font-playfair text-4xl md:text-5xl lg:text-6xl text-center text-[#111827] mb-4"
        >
          Culinary Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center text-[#6B7280] max-w-2xl mx-auto mb-10"
        >
          Explore flavors inspired by Ethiopian heritage and global cuisine.
        </motion.p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(0);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#D4A017] text-white shadow-lg"
                  : "bg-white text-[#1E3A8A] border border-[#1E3A8A]/20 hover:bg-[#1E3A8A]/10"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Menu Cards */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {paginatedItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative w-full h-44">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-playfair text-lg text-[#1E3A8A] mb-1">{item.name}</h3>
                    <p className="text-xs text-[#6B7280] mb-2 truncate">{item.description}</p>
                    <p className="text-lg font-bold text-[#D4A017]">{item.price}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={prevPage}
                className="p-3 rounded-full bg-[#1E3A8A] text-white shadow-lg hover:bg-[#1E3A8A]/80 transition"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-sm text-[#6B7280]">
                {currentPage + 1} / {totalPages}
              </span>
              <button
                onClick={nextPage}
                className="p-3 rounded-full bg-[#1E3A8A] text-white shadow-lg hover:bg-[#1E3A8A]/80 transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}