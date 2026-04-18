'use client'

import { Designer } from '../types/designer'
import { Service } from '../types/service'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'quote' | 'contact' | 'getstarted'
  data?: Designer | Service
}

export default function Modal({ isOpen, onClose, type, data }: ModalProps) {
  if (!isOpen) return null

  const renderContent = () => {
    switch (type) {
      case 'quote':
        const designer = data as Designer
        return (
          <>
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check text-green-600 text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-2">Quote Request Sent!</h3>
              <p className="text-gray-600">Your request has been sent to {designer.name}</p>
            </div>
            <div className="space-y-3 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Designer will contact you at:</p>
                <p className="font-semibold">{designer.phone}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm text-purple-600">Expected response time:</p>
                <p className="font-semibold text-purple-700">Within 2-4 hours</p>
              </div>
            </div>
          </>
        )

      case 'contact':
        return (
          <>
            <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" />
              <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" />
              <input type="tel" placeholder="Your Phone" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" />
              <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"></textarea>
              <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                Send Message
              </button>
            </form>
          </>
        )

      case 'getstarted':
        return (
          <>
            <h3 className="text-2xl font-bold mb-6">Get Started</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" />
              <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" />
              <input type="tel" placeholder="Your Phone" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" />
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
                <option value="">Select Service Type</option>
                <option value="home">Home Interiors</option>
                <option value="office">Office/Commercial</option>
                <option value="kitchen">Kitchen Design</option>
                <option value="bedroom">Bedroom Design</option>
                <option value="other">Other</option>
              </select>
              <textarea placeholder="Describe your project" rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"></textarea>
              <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                Submit Request
              </button>
            </form>
          </>
        )

      default:
        return null
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 modal-overlay" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-md w-full modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
        
        {renderContent()}
        
        {type === 'quote' && (
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Close
            </button>
            <button 
              onClick={onClose}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              View More Designers
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
