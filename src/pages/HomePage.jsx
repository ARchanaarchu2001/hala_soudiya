import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/Hersection'
import AboutSection from './AboutPage'
import ServicesPage from './ServicePage'
import ContactPage from './ContactPage'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <div>
      <Navbar />

      {/* HOME section */}
      <section id="home" className="scroll-section min-h-screen">
        <HeroSection />
      </section>

      {/* ABOUT section */}
      <section id="about" className="scroll-section min-h-screen">
        <AboutSection />
      </section>

      {/* SERVICES section */}
      <section id="services" className="scroll-section min-h-screen">
        <ServicesPage />
      </section>

      {/* CONTACT section */}
      <section id="contact" className="scroll-section min-h-screen">
        <ContactPage />
      </section>

      <Footer />
    </div>
  )
}

export default HomePage
