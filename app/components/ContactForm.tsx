'use client'

import { useState } from 'react'
import { type Lead } from '@/lib/supabase'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    phone: '',
    email: '',
    propertyAddress: '',
    propertyType: 'office' as 'office' | 'warehouse' | 'manufacturing' | 'retail' | 'healthcare' | 'educational' | 'other',
    propertySize: '',
    damageType: [] as string[],
    damageDescription: '',
    urgencyLevel: 'urgent' as 'emergency' | 'urgent' | 'standard' | 'non-urgent',
    serviceArea: 'VA' as 'MD' | 'DC' | 'VA',
    zipCode: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleDamageTypeToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      damageType: prev.damageType.includes(type)
        ? prev.damageType.filter(t => t !== type)
        : [...prev.damageType, type]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    if (formData.damageType.length === 0) {
      setError('Please select at least one damage type')
      setSubmitting(false)
      return
    }

    const lead: Lead = {
      business_name: formData.businessName,
      contact_name: formData.contactName,
      phone: formData.phone,
      email: formData.email,
      property_address: formData.propertyAddress,
      property_type: formData.propertyType,
      property_size: parseInt(formData.propertySize),
      damage_type: formData.damageType,
      damage_description: formData.damageDescription,
      urgency_level: formData.urgencyLevel,
      service_area: formData.serviceArea,
      zip_code: formData.zipCode,
      lead_source: 'commercial_landing_page',
    }

    try {
      // Call API route (server-side) instead of direct client-side submission
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lead),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
        setFormData({
          businessName: '',
          contactName: '',
          phone: '',
          email: '',
          propertyAddress: '',
          propertyType: 'office',
          propertySize: '',
          damageType: [],
          damageDescription: '',
          urgencyLevel: 'urgent',
          serviceArea: 'VA',
          zipCode: '',
        })
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        setError('Failed to submit. Please call us directly.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setError('Failed to submit. Please call us directly.')
    }

    setSubmitting(false)
  }

  if (submitted) {
    return (
      <section id="contact-form" className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-8 sm:p-12 text-center">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl sm:text-3xl font-bold text-green-900 mb-4">
                Request Received!
              </h3>
              <p className="text-lg text-green-800 mb-6">
                We'll contact you within 15 minutes. For immediate assistance, call:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:301-900-5171" className="bg-restoration-blue hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-medium hover:shadow-heavy transition-all hover:scale-105">MD: 301-900-5171</a>
                <a href="tel:202-796-7422" className="bg-restoration-blue hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-medium hover:shadow-heavy transition-all hover:scale-105">DC: 202-796-7422</a>
                <a href="tel:703-844-4204" className="bg-restoration-blue hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-medium hover:shadow-heavy transition-all hover:scale-105">VA: 703-844-4204</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact-form" className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block bg-emergency-red/10 px-4 py-2 rounded-full mb-4">
              <span className="text-emergency-red font-bold">🚨 24/7 EMERGENCY RESPONSE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              Request Commercial Assessment
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Get expert damage assessment and restoration plan within 60 minutes
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-heavy p-6 sm:p-10 border-2 border-gray-100">
            {error && (
              <div className="mb-6 bg-red-50 border-2 border-red-500 rounded-lg p-4 text-red-800">
                {error}
              </div>
            )}

            {/* Business Name */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Business/Organization Name *</label>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-restoration-blue focus:ring-4 focus:ring-restoration-blue/10 focus:outline-none text-base min-h-[44px] transition-all"
                placeholder="e.g., ABC Manufacturing Inc."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* Contact Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-restoration-blue focus:ring-4 focus:ring-restoration-blue/10 focus:outline-none text-base min-h-[44px] transition-all"
                  placeholder="John Smith"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-restoration-blue focus:ring-4 focus:ring-restoration-blue/10 focus:outline-none text-base min-h-[44px] transition-all"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-restoration-blue focus:ring-4 focus:ring-restoration-blue/10 focus:outline-none text-base min-h-[44px] transition-all"
                  placeholder="john@example.com"
                />
              </div>

              {/* Service Area */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Service Area *</label>
                <select
                  required
                  value={formData.serviceArea}
                  onChange={(e) => setFormData({...formData, serviceArea: e.target.value as 'MD' | 'DC' | 'VA'})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-restoration-blue focus:ring-4 focus:ring-restoration-blue/10 focus:outline-none text-base min-h-[44px] transition-all"
                >
                  <option value="MD">Maryland</option>
                  <option value="DC">Washington DC</option>
                  <option value="VA">Virginia</option>
                </select>
              </div>
            </div>

            {/* Property Address */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Property Address *</label>
              <input
                type="text"
                required
                value={formData.propertyAddress}
                onChange={(e) => setFormData({...formData, propertyAddress: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-restoration-blue focus:ring-4 focus:ring-restoration-blue/10 focus:outline-none text-base min-h-[44px] transition-all"
                placeholder="123 Main St, City, State, ZIP"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* Property Type */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Property Type *</label>
                <select
                  required
                  value={formData.propertyType}
                  onChange={(e) => setFormData({...formData, propertyType: e.target.value as any})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-restoration-blue focus:ring-4 focus:ring-restoration-blue/10 focus:outline-none text-base min-h-[44px] transition-all"
                >
                  <option value="office">Office Building</option>
                  <option value="warehouse">Warehouse/Distribution</option>
                  <option value="manufacturing">Manufacturing Facility</option>
                  <option value="retail">Retail/Commercial</option>
                  <option value="healthcare">Healthcare Facility</option>
                  <option value="educational">Educational Institution</option>
                  <option value="other">Other Commercial</option>
                </select>
              </div>

              {/* Property Size */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Property Size (sq ft) *</label>
                <input
                  type="number"
                  required
                  min="100"
                  step="100"
                  value={formData.propertySize}
                  onChange={(e) => setFormData({...formData, propertySize: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-restoration-blue focus:ring-4 focus:ring-restoration-blue/10 focus:outline-none text-base min-h-[44px] transition-all"
                  placeholder="e.g., 25000"
                />
              </div>
            </div>

            {/* Damage Type */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">Type of Damage *</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { value: 'water', label: '💧 Water' },
                  { value: 'fire', label: '🔥 Fire' },
                  { value: 'mold', label: '🦠 Mold' },
                  { value: 'storm', label: '⛈️ Storm' },
                  { value: 'industrial', label: '⚙️ Industrial' },
                  { value: 'environmental', label: '🌍 Environmental' },
                  { value: 'large-loss', label: '🏗️ Large Loss' },
                ].map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => handleDamageTypeToggle(type.value)}
                    className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all min-h-[44px] ${
                      formData.damageType.includes(type.value)
                        ? 'bg-restoration-blue text-white border-restoration-blue'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-restoration-blue'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Urgency Level */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">Urgency Level *</label>
              <select
                required
                value={formData.urgencyLevel}
                onChange={(e) => setFormData({...formData, urgencyLevel: e.target.value as any})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-restoration-blue focus:outline-none text-base min-h-[44px]"
              >
                <option value="emergency">🚨 EMERGENCY - Immediate danger/active damage</option>
                <option value="urgent">⚡ URGENT - Need help within 24 hours</option>
                <option value="standard">📋 STANDARD - Need help this week</option>
                <option value="non-urgent">📅 NON-URGENT - General inquiry</option>
              </select>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Describe the Situation</label>
              <textarea
                value={formData.damageDescription}
                onChange={(e) => setFormData({...formData, damageDescription: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-restoration-blue focus:outline-none text-base"
                placeholder="Briefly describe what happened and current conditions..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-[#d32f2f] via-[#dc2626] to-[#f44336] hover:from-[#b71c1c] hover:to-[#c62828] text-white px-8 py-5 rounded-2xl font-black text-lg sm:text-xl transition-all hover:scale-[1.02] shadow-cta hover:shadow-cta-hover disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
            >
              {submitting ? 'Submitting...' : '🚨 REQUEST EMERGENCY SERVICE NOW'}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              By submitting, you agree to be contacted by our team. We respond within 15 minutes.
            </p>
          </form>

          {/* Alternative Contact */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4 font-semibold">Prefer to call? We're available 24/7:</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:301-900-5171" className="bg-restoration-blue hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold min-h-[44px] flex items-center justify-center shadow-medium hover:shadow-heavy transition-all hover:scale-105">📞 MD: 301-900-5171</a>
              <a href="tel:202-796-7422" className="bg-restoration-blue hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold min-h-[44px] flex items-center justify-center shadow-medium hover:shadow-heavy transition-all hover:scale-105">📞 DC: 202-796-7422</a>
              <a href="tel:703-844-4204" className="bg-restoration-blue hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold min-h-[44px] flex items-center justify-center shadow-medium hover:shadow-heavy transition-all hover:scale-105">📞 VA: 703-844-4204</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
