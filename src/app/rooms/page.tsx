import AmenitiesFeaturesSection from '@/components/rooms/AmenitiesFeaturesSection'
import CTASection from '@/components/rooms/CTASection'
import HeroRoomsOverview from '@/components/rooms/HeroRoomsOverview'
import RatesAvailabilitySection from '@/components/rooms/RatesAvailabilitySection'
import RoomCategories from '@/components/rooms/RoomCategory'
import RoomSection from '@/components/rooms/RoomSection'
import TestimonialsSection from '@/components/rooms/TestimonialsSection'
import React from 'react'

const page = () => {
  return (
    <div>
      <HeroRoomsOverview />
      <RoomCategories />
      <section id="room-section">
        <RoomSection />
      </section>
      <AmenitiesFeaturesSection />
      <RatesAvailabilitySection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}

export default page