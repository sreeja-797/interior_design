'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "How much does interior design cost in Visakhapatnam?",
    answer: "Interior design costs vary based on project scope, materials, and designer experience. Typically ranges from ₹500-2000 per square foot for residential projects."
  },
  {
    question: "How long does a complete home interior project take?",
    answer: "A complete home interior project usually takes 45-90 days depending on the size, complexity, and customization level of the project."
  },
  {
    question: "Do you provide 3D designs before execution?",
    answer: "Yes, most of our verified designers provide detailed 3D designs and walkthroughs before starting the actual work to help you visualize the final outcome."
  },
  {
    question: "What materials do you use for interior work?",
    answer: "We use high-quality materials including premium laminates, solid wood, marine plywood, genuine leather, and branded fixtures with warranty."
  },
  {
    question: "Do you offer after-sales service and warranty?",
    answer: "Yes, all our designers provide comprehensive warranty on workmanship (1-5 years) and manufacturer warranties on materials and appliances."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
              >
                <h3 className="font-semibold text-lg">{item.question}</h3>
                <i className={`fas fa-chevron-down transition-transform ${openIndex === index ? 'rotate-180' : ''}`}></i>
              </button>
              <div className={`px-6 overflow-hidden transition-all duration-300 ${openIndex === index ? 'py-4' : 'max-h-0'}`}>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
