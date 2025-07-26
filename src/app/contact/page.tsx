import ContactFormSection from '@/components/contact/ContactFormSection'
import ContactOverviewHero from '@/components/contact/ContactOverviewHero'
import LocationMapSection from '@/components/contact/LocationMapSection'
import React from 'react'

const page = () => {
  return (
    <div>
        <ContactOverviewHero />
        <ContactFormSection />
        <LocationMapSection />
    </div>
  )
}

export default page