import AmbianceSection from '@/components/dining/AmbianceSection'
import DiningHero from '@/components/dining/DiningHero'
import DiningOptionsSection from '@/components/dining/DiningOptionsSection'
import GallerySection from '@/components/dining/GallerySection'
import MenuDesign from '@/components/dining/MenuDesign'
import MenuSection from '@/components/dining/MenuSection'
import TestimonialsSection from '@/components/dining/TestimonialsSection'
import React from 'react'

const pages = () => {
  return (
    <div>
      <DiningHero />
      <DiningOptionsSection />
      <MenuSection />
      <MenuDesign />
      <GallerySection />
      <TestimonialsSection />
      <AmbianceSection />
    </div>
  )
}

export default pages