'use client'

import { Designer } from '../types/designer'
import Image from 'next/image'

interface DesignerCardProps {
  designer: Designer
  onGetQuote: (designer: Designer) => void
}

export default function DesignerCard({ designer, onGetQuote }: DesignerCardProps) {
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>)
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>)
    }
    
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>)
    }
    
    return stars
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover group">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={designer.image}
          alt={designer.name}
          fill
          className="object-cover group-hover:scale-110 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex text-yellow-400 text-sm">
              {renderStars(designer.rating)}
            </div>
            <span className="text-sm">{designer.rating} ({designer.reviews})</span>
          </div>
          <div className={`${designer.badgeColor} px-3 py-1 rounded-full text-xs font-semibold inline-block`}>
            {designer.badge}
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center mb-3">
          <div className="relative w-12 h-12 rounded-full mr-3 overflow-hidden">
            <Image
              src={designer.avatar}
              alt={designer.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold">{designer.name}</h3>
            <p className="text-gray-600 text-sm">{designer.experience}</p>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{designer.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {designer.tags.map((tag, index) => (
            <span key={index} className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <a 
            href={`tel:${designer.phone}`} 
            className="text-purple-600 hover:text-purple-700 font-semibold flex items-center"
          >
            <i className="fas fa-phone mr-1"></i>{designer.phone}
          </a>
          <button 
            onClick={() => onGetQuote(designer)}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition transform hover:scale-105"
          >
            Get Quote
          </button>
        </div>
      </div>
    </div>
  )
}
