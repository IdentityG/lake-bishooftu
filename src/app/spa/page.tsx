import SpaFacilitiesSection from '@/components/spa/SpaFacilitiesSection'
import SpaGallerySection from '@/components/spa/SpaGallerySection'
import SpaOverviewHero from '@/components/spa/SpaOverviewHero'
import SpaServicesSection from '@/components/spa/SpaServicesSection'
import SpecialPackagesSection from '@/components/spa/SpecialPackagesSection'
import React from 'react'

const page = () => {
  return (
    <div>
      <SpaOverviewHero />
      <section id="spa-services">
        <SpaServicesSection />
      </section>
      <SpaGallerySection />
      <SpecialPackagesSection />
      <SpaFacilitiesSection />
    </div>
  )
}

export default page