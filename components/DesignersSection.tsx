'use client'

import { designers } from '../data/designers'
import DesignerCard from './DesignerCard'
import { Designer } from '../types/designer'

interface DesignersSectionProps {
  onGetQuote: (designer: Designer) => void
}

export default function DesignersSection({ onGetQuote }: DesignersSectionProps) {
  return (
    <section id="designers" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Best Interior Designers in Gajuwaka, Visakhapatnam</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {designers.map((designer) => (
            <DesignerCard 
              key={designer.id} 
              designer={designer} 
              onGetQuote={onGetQuote}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
