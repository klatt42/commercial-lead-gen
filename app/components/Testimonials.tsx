'use client'

import { useEffect, useState } from 'react'
import { getTestimonials, type Testimonial } from '@/lib/supabase'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTestimonials() {
      const { data } = await getTestimonials()
      if (data) {
        setTestimonials(data.slice(0, 3)) // Show only 3 testimonials
      }
      setLoading(false)
    }
    loadTestimonials()
  }, [])

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  const getServiceEmoji = (serviceType: string) => {
    const emojiMap: { [key: string]: string } = {
      water: '💧',
      fire: '🔥',
      mold: '🦠',
      storm: '⛈️',
      industrial: '⚙️',
      environmental: '🌍',
      'large-loss': '🏗️',
      'large loss': '🏗️',
    }
    return emojiMap[serviceType.toLowerCase()] || '✨'
  }

  if (loading) {
    return (
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500">Loading testimonials...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block bg-restoration-blue/10 px-4 py-2 rounded-full mb-4">
              <span className="text-restoration-blue font-semibold">🏢 2,800+ Commercial Properties Restored</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              What Commercial Clients Say
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by commercial property managers and business owners across Maryland, DC, and Virginia
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id || index}
                className="bg-white rounded-2xl p-6 sm:p-8 border-l-4 border-[#FFD700] shadow-light hover:shadow-heavy transition-all duration-300 hover:-translate-y-2"
              >
                {/* Service Type Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-3xl">{getServiceEmoji(testimonial.service_type)}</span>
                  <span className="text-sm font-semibold text-restoration-blue uppercase tracking-wide">
                    {testimonial.service_type} Damage
                  </span>
                </div>

                {/* Rating */}
                <div className="text-3xl text-[#FFD700] mb-4 tracking-wider">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 mb-6 leading-relaxed italic text-lg">
                  "{testimonial.quote}"
                </blockquote>

                {/* Attribution */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="font-bold text-gray-900">{testimonial.customer_name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicator CTA */}
          <div className="text-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 sm:p-12 border-2 border-blue-200">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Join 2,800+ Commercial Properties Restored
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                When disaster strikes your business, you need a restoration partner who understands commercial operations. We're available 24/7 to minimize downtime and restore your business quickly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => {
                    const form = document.getElementById('contact-form');
                    if (form) {
                      form.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-restoration-blue hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-medium hover:shadow-heavy min-h-[44px]"
                >
                  Request Emergency Service
                </button>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    ✅ Licensed & Insured
                  </span>
                  <span className="flex items-center gap-1">
                    🏆 A+ BBB Rating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
