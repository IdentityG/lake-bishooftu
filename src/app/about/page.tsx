import HeroAboutSection from '@/components/about/HeroAboutSection'
import MissionVisionSection from '@/components/about/MissionVisionSection'
import OurStorySection from '@/components/about/OurStorySection'
import ResortFeaturesSection from '@/components/about/ResortFeaturesSection'
import SustainabilityCommunitySection from '@/components/about/SustainabilityCommunitySection'
import TeamSection from '@/components/about/TeamSection'
import React from 'react'

const page = () => {
  return (
    <div>
        <HeroAboutSection />
        <OurStorySection />
        <MissionVisionSection />
        <ResortFeaturesSection />
        <TeamSection />
        <SustainabilityCommunitySection />
    </div>
  )
}

export default page