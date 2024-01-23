import React from 'react'
import GamingHeroSection from '../components/Hero'
import Video from '../components/Video'
import TutorialComponent from '../components/Tutorial'

const Home = () => {
  return (
    <div>
      <GamingHeroSection />
      <Video/>
      <TutorialComponent />
    </div>
  )
}

export default Home