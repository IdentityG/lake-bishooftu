import AboutUsSection from "@/components/home/AboutSection";
import ActivitiesAmenities from "@/components/home/ActivitiesAmenities";
import CallToAction from "@/components/home/CallToAction";
import ContactFormSection from "@/components/home/ContactFormSection";
import DiningOptions from "@/components/home/DiningOptions";
import FeaturedRooms from "@/components/home/FeaturedRooms";
import GallerySection from "@/components/home/GallerySection";
import Hero from "@/components/home/Hero";
import LocationMapSection from "@/components/home/MapSection";
import MenuSection from "@/components/home/MenuSection";
import SpecialOffersSection from "@/components/home/SpecialOffersSection";
import TestimonialSection from "@/components/home/TestimonialSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <AboutUsSection />
      <FeaturedRooms />
      <DiningOptions />
      <GallerySection />
      <ActivitiesAmenities />
      <MenuSection />
      <SpecialOffersSection />
      <TestimonialSection />
      <LocationMapSection />
      <CallToAction />
      <ContactFormSection />
    </div>
  );
}
