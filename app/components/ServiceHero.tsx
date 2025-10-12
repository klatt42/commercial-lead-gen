'use client'

/**
 * ServiceHero Component
 *
 * Hero section for individual service pages with emergency CTAs.
 * Features large emoji, title, subtitle, description, urgency message,
 * and prominent regional phone number CTAs.
 */

interface ServiceHeroProps {
  emoji: string
  title: string
  subtitle: string
  description: string
  urgencyMessage: string
}

export default function ServiceHero({
  emoji,
  title,
  subtitle,
  description,
  urgencyMessage
}: ServiceHeroProps) {
  return (
    <section className="relative min-h-[80vh] bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center overflow-hidden">
      {/* Subtle background pattern - matching homepage hero */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-16 sm:py-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main Hero Content */}
          <div className="text-center text-white">
            {/* Large Emoji */}
            <div className="text-7xl sm:text-8xl md:text-9xl mb-6 animate-bounce">
              {emoji}
            </div>

            {/* H1 Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-[1.15]">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl mb-6 text-[#FFD700] font-bold">
              {subtitle}
            </p>

            {/* Description */}
            <p className="text-lg sm:text-xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>

            {/* Urgency Message - Highlighted Box */}
            <div className="bg-gradient-to-r from-red-600/30 to-orange-600/30 backdrop-blur-md rounded-2xl p-6 border-2 border-red-400/50 max-w-3xl mx-auto mb-10 shadow-2xl">
              <div className="flex items-center justify-center gap-3 mb-2">
                <svg
                  className="w-8 h-8 text-[#FFD700] flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xl sm:text-2xl font-bold text-white">URGENT</span>
              </div>
              <p className="text-base sm:text-lg text-white font-semibold leading-relaxed">
                {urgencyMessage}
              </p>
            </div>

            {/* Emergency Phone Number CTAs */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 max-w-4xl mx-auto shadow-2xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-[#FFD700]">
                24/7 Emergency Contact - Call Now
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Maryland */}
                <a
                  href="tel:301-900-5171"
                  className="block bg-gradient-to-r from-[#d32f2f] via-[#dc2626] to-[#f44336] hover:from-[#b71c1c] hover:to-[#c62828] text-white px-6 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-cta hover:shadow-cta-hover min-h-[80px] flex flex-col items-center justify-center group"
                  aria-label="Call Maryland emergency line at 301-900-5171"
                >
                  <span className="text-sm sm:text-base mb-1 group-hover:text-[#FFD700] transition-colors">
                    Maryland
                  </span>
                  <span className="text-xl sm:text-2xl font-black">
                    301-900-5171
                  </span>
                </a>

                {/* Washington DC */}
                <a
                  href="tel:202-796-7422"
                  className="block bg-gradient-to-r from-[#d32f2f] via-[#dc2626] to-[#f44336] hover:from-[#b71c1c] hover:to-[#c62828] text-white px-6 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-cta hover:shadow-cta-hover min-h-[80px] flex flex-col items-center justify-center group"
                  aria-label="Call Washington DC emergency line at 202-796-7422"
                >
                  <span className="text-sm sm:text-base mb-1 group-hover:text-[#FFD700] transition-colors">
                    Washington DC
                  </span>
                  <span className="text-xl sm:text-2xl font-black">
                    202-796-7422
                  </span>
                </a>

                {/* Virginia */}
                <a
                  href="tel:703-844-4204"
                  className="block bg-gradient-to-r from-[#d32f2f] via-[#dc2626] to-[#f44336] hover:from-[#b71c1c] hover:to-[#c62828] text-white px-6 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-cta hover:shadow-cta-hover min-h-[80px] flex flex-col items-center justify-center group"
                  aria-label="Call Virginia emergency line at 703-844-4204"
                >
                  <span className="text-sm sm:text-base mb-1 group-hover:text-[#FFD700] transition-colors">
                    Virginia
                  </span>
                  <span className="text-xl sm:text-2xl font-black">
                    703-844-4204
                  </span>
                </a>
              </div>
              <p className="text-sm sm:text-base text-blue-200 mt-4 font-medium">
                &lt;60 minute emergency response time
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base text-blue-100 mt-8">
              <div className="flex items-center gap-2">
                <span className="text-lg">✅</span>
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🏆</span>
                <span>A+ BBB Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🛡️</span>
                <span>$2M Liability Coverage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
