'use client'

import { useState } from 'react'
import { galleryItems } from '@/data/gallery'
import { GalleryItem } from '@/types/gallery'
import Image from 'next/image'

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter)

  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  return (
    <section id="gallery" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Our Portfolio</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore our latest interior design projects and get inspired for your own space transformation
        </p>
        
        {/* Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {['all', 'living', 'bedroom', 'kitchen', 'office'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                activeFilter === filter
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-purple-100'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="gallery-item group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
              onClick={() => openLightbox(item)}
            >
              <div className="relative h-64">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition duration-300">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 modal-overlay"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl w-full modal-content">
            <button 
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition"
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
            <div className="relative h-[600px]">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="text-center mt-6">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
              <p className="text-gray-300">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
