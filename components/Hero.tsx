'use client'

import Image from 'next/image'

interface HeroProps {
  onButtonClick: (type: 'home' | 'office') => void
}

export default function Hero({ onButtonClick }: HeroProps) {
  return (
    <section id="home" className="gradient-bg text-white py-20 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <Image 
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&h=800&fit=crop&auto=format" 
          alt="Interior Design Background" 
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-purple-700/60"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Best Interior Designers Near Me in Gajuwaka, Visakhapatnam
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Transform your space with expert interior designers. Get quotes from verified professionals for residential and commercial projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onButtonClick('home')}
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition transform hover:scale-105 shadow-lg"
              >
                <i className="fas fa-home mr-2"></i>Home Interiors
              </button>
              <button 
                onClick={() => onButtonClick('office')}
                className="bg-white/20 backdrop-blur text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/30 transition border border-white/30 transform hover:scale-105"
              >
                <i className="fas fa-building mr-2"></i>Office/Commercial Interiors
              </button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1554995209-c0f1a13a8c31?w=600&h=400&fit=crop&auto=format" 
                alt="Luxury Interior Design" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-award text-white text-xl"></i>
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">Award Winning</div>
                    <div className="text-sm text-gray-600">Design Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
