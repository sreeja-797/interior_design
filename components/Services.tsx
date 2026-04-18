'use client'

import { services } from '@/data/services'
import { Service } from '@/types/service'
import Image from 'next/image'

interface ServicesProps {
  onLearnMore: (service: Service) => void
}

export default function Services({ onLearnMore }: ServicesProps) {
  return (
    <section id="services" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Our Interior Design Services</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Comprehensive interior design solutions for every space and style
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-8 rounded-xl shadow-lg text-center card-hover group">
              <div className="relative mb-6 h-48">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover rounded-lg group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-purple-600/20 rounded-lg"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <i className={`fas ${service.icon} text-purple-600 text-2xl`}></i>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <button 
                onClick={() => onLearnMore(service)}
                className="mt-4 text-purple-600 font-semibold hover:text-purple-700 transition"
              >
                Learn More <i className="fas fa-arrow-right ml-1"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
