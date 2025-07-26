import ContactFormSection from '@/components/contact/ContactFormSection'
import ContactInfoSection from '@/components/contact/ContactInfoSection'
import ContactOverviewHero from '@/components/contact/ContactOverviewHero'
import LocationMapSection from '@/components/contact/LocationMapSection'
import React from 'react'

const page = () => {
  return (
    <div>
        <ContactOverviewHero />
        <ContactInfoSection />
        <ContactFormSection />
        <LocationMapSection />
    </div>
  )
}

export default page