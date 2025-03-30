import React from 'react'
import Header from '../components/Header'
import HeroSection from '@/components/HeroSection'

const Landing: React.FC = () => {
  return (
      <div>
        <header>
        <Header></Header>
      </header>
      <main>
        <HeroSection />
      </main>
    </div>
  )
}

export default Landing
