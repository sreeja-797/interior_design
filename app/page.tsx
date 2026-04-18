'use client'

import { useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import DesignersSection from '../components/DesignersSection'
import Gallery from '../components/Gallery'
import Services from '../components/Services'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import Notification from '../components/Notification'
import { Designer } from '../types/designer'
import { Service } from '../types/service'

export default function Home() {
  const [modal, setModal] = useState<{
    isOpen: boolean
    type: 'quote' | 'contact' | 'getstarted'
    data?: Designer | Service
  }>({
    isOpen: false,
    type: 'quote'
  })
  
  const [notification, setNotification] = useState({
    isVisible: false,
    message: ''
  })

  const showNotification = (message: string) => {
    setNotification({ isVisible: true, message })
  }

  const hideNotification = () => {
    setNotification({ isVisible: false, message: '' })
  }

  const openModal = (type: 'quote' | 'contact' | 'getstarted', data?: Designer | Service) => {
    setModal({ isOpen: true, type, data })
  }

  const closeModal = () => {
    setModal({ isOpen: false, type: 'quote' })
  }

  const handleGetQuote = (designer: Designer) => {
    openModal('quote', designer)
  }

  const handleLearnMore = (service: Service) => {
    showNotification(`Loading more information about ${service.title}...`)
    setTimeout(() => {
      document.getElementById('designers')?.scrollIntoView({ behavior: 'smooth' })
    }, 1000)
  }

  const handleGetStarted = () => {
    openModal('getstarted')
  }

  const handleHeroButtonClick = (type: 'home' | 'office') => {
    if (type === 'home') {
      showNotification('Finding home interior specialists...')
    } else {
      showNotification('Finding commercial interior experts...')
    }
    setTimeout(() => {
      document.getElementById('designers')?.scrollIntoView({ behavior: 'smooth' })
    }, 800)
  }

  return (
    <div className="min-h-screen">
      <Header onGetStarted={handleGetStarted} />
      <Hero onButtonClick={handleHeroButtonClick} />
      <DesignersSection onGetQuote={handleGetQuote} />
      <Gallery />
      <Services onLearnMore={handleLearnMore} />
      <FAQ />
      <Footer />
      
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        data={modal.data}
      />
      
      <Notification
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </div>
  )
}
