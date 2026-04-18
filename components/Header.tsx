'use client'

import { useState } from 'react'

interface HeaderProps {
  onGetStarted: () => void
}

export default function Header({ onGetStarted }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-lg sticky top-0 z-40">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-home text-white text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">InteriorDesign</h1>
              <p className="text-xs text-gray-600">Gajuwaka, Visakhapatnam</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-600 hover:text-purple-600 transition">Home</a>
            <a href="#designers" className="text-gray-600 hover:text-purple-600 transition">Designers</a>
            <a href="#gallery" className="text-gray-600 hover:text-purple-600 transition">Gallery</a>
            <a href="#services" className="text-gray-600 hover:text-purple-600 transition">Services</a>
            <a href="#faq" className="text-gray-600 hover:text-purple-600 transition">FAQ</a>
            <a href="#reviews" className="text-gray-600 hover:text-purple-600 transition">Reviews</a>
            <button 
              onClick={onGetStarted}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Get Started
            </button>
          </div>
          
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden mt-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col space-y-3">
            <a href="#home" className="block py-2 text-gray-600 hover:text-purple-600 transition">Home</a>
            <a href="#designers" className="block py-2 text-gray-600 hover:text-purple-600 transition">Designers</a>
            <a href="#gallery" className="block py-2 text-gray-600 hover:text-purple-600 transition">Gallery</a>
            <a href="#services" className="block py-2 text-gray-600 hover:text-purple-600 transition">Services</a>
            <a href="#faq" className="block py-2 text-gray-600 hover:text-purple-600 transition">FAQ</a>
            <a href="#reviews" className="block py-2 text-gray-600 hover:text-purple-600 transition">Reviews</a>
          </div>
        </div>
      </nav>
    </header>
  )
}
