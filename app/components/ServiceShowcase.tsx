'use client'

import Link from 'next/link'

const services = [
  {
    emoji: '💧',
    title: 'Water Damage Restoration',
    slug: 'water-damage',
    description: 'Rapid extraction and drying to prevent business interruption. Advanced moisture detection, industrial dehumidification, and structural drying for offices, warehouses, and retail spaces. Minimize downtime with our 24/7 emergency response.',
    highlights: ['Industrial water extraction', 'Thermal imaging detection', 'Structural drying', 'Prevents secondary damage'],
    color: 'from-blue-500/20 to-blue-600/20',
    borderColor: 'border-blue-400/30',
  },
  {
    emoji: '🔥',
    title: 'Fire & Smoke Damage',
    slug: 'fire-damage',
    description: 'Complete fire damage restoration including smoke odor removal, soot cleaning, and structural repairs. Minimize downtime with rapid response and comprehensive recovery plans tailored to commercial operations.',
    highlights: ['Smoke odor elimination', 'Soot removal & cleaning', 'Structural reconstruction', 'Contents restoration'],
    color: 'from-red-500/20 to-orange-600/20',
    borderColor: 'border-red-400/30',
  },
  {
    emoji: '🦠',
    title: 'Mold Remediation',
    slug: 'mold-remediation',
    description: 'EPA-certified mold remediation for commercial facilities. Protect employee health and business operations with professional containment, removal, and prevention strategies. We follow IICRC protocols for safe workplace restoration.',
    highlights: ['EPA-certified process', 'Air quality testing', 'Safe containment', 'Prevention protocols'],
    color: 'from-green-500/20 to-emerald-600/20',
    borderColor: 'border-green-400/30',
  },
  {
    emoji: '⛈️',
    title: 'Storm Damage Repair',
    slug: 'storm-damage',
    description: 'Emergency storm damage response for commercial properties. Roof repairs, water intrusion mitigation, and structural stabilization to restore business operations quickly. Comprehensive emergency services for MD, DC, and VA.',
    highlights: ['Emergency roof tarping', 'Water intrusion control', 'Structural assessment', 'Rapid restoration'],
    color: 'from-gray-500/20 to-slate-600/20',
    borderColor: 'border-gray-400/30',
  },
  {
    emoji: '⚙️',
    title: 'Industrial Equipment Restoration',
    slug: 'industrial-equipment',
    description: 'Specialized restoration for manufacturing facilities and industrial properties. Equipment cleaning, decontamination, and operational recovery for machinery and production lines. Minimize production downtime with expert industrial restoration.',
    highlights: ['Equipment decontamination', 'Production line recovery', 'Machinery restoration', 'Minimal downtime'],
    color: 'from-orange-500/20 to-amber-600/20',
    borderColor: 'border-orange-400/30',
  },
  {
    emoji: '🌍',
    title: 'Environmental Remediation',
    slug: 'environmental-remediation',
    description: 'Commercial-grade environmental cleanup for hazardous materials, chemical spills, and contamination events. OSHA-compliant remediation for safe workplace restoration. Expert handling of environmental emergencies.',
    highlights: ['OSHA compliance', 'Hazmat cleanup', 'Site decontamination', 'Safety protocols'],
    color: 'from-emerald-500/20 to-teal-600/20',
    borderColor: 'border-emerald-400/30',
  },
]

export default function ServiceShowcase() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              Commercial Restoration Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive emergency response for commercial and industrial properties across MD, DC, and VA
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl p-8 sm:p-10 border-2 ${service.borderColor} hover:border-opacity-60 transition-all duration-300 hover:shadow-heavy hover:-translate-y-2 backdrop-blur-sm`}
              >
                {/* Gradient background overlay */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-6xl sm:text-7xl mb-6">{service.emoji}</div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-6">
                    {service.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={`/services/${service.slug}`}
                    className="block w-full bg-restoration-blue hover:bg-blue-700 text-white px-6 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all hover:scale-105 shadow-medium hover:shadow-heavy min-h-[44px] text-center"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center bg-gradient-to-r from-restoration-blue to-blue-900 rounded-2xl p-8 sm:p-12 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Not Sure Which Service You Need?
            </h3>
            <p className="text-lg sm:text-xl mb-6 text-blue-100">
              Call now for a free assessment. Our experts will evaluate your situation and recommend the best course of action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:301-900-5171"
                className="bg-[#FFD700] hover:bg-[#FFA500] text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-medium hover:shadow-heavy min-h-[44px] flex items-center justify-center"
              >
                Call MD: 301-900-5171
              </a>
              <a
                href="tel:202-796-7422"
                className="bg-[#FFD700] hover:bg-[#FFA500] text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-medium hover:shadow-heavy min-h-[44px] flex items-center justify-center"
              >
                Call DC: 202-796-7422
              </a>
              <a
                href="tel:703-844-4204"
                className="bg-[#FFD700] hover:bg-[#FFA500] text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-medium hover:shadow-heavy min-h-[44px] flex items-center justify-center"
              >
                Call VA: 703-844-4204
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
