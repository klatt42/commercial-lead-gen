'use client'

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Hero Content */}
          <div className="text-center text-white mb-12">
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-[1.15]">
              <span className="block">Commercial Restoration Experts</span>
              <span className="block text-[#FFD700]">Minimize Downtime, Maximize Recovery</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl mb-8 text-blue-100 font-medium">
              24/7 Emergency Response for Commercial Properties – Water, Fire, Storm, Mold, Industrial & Environmental Restoration
            </p>
            <p className="text-lg sm:text-xl mb-10 text-blue-200">
              Serving Maryland, Washington DC, and Virginia
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all">
                <div className="text-3xl sm:text-4xl mb-2">🚨</div>
                <div className="text-2xl sm:text-3xl font-bold text-[#FFD700]">&lt;60min</div>
                <div className="text-sm sm:text-base text-blue-100">Response Time</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all">
                <div className="text-3xl sm:text-4xl mb-2">🏢</div>
                <div className="text-2xl sm:text-3xl font-bold text-[#FFD700]">2,800+</div>
                <div className="text-sm sm:text-base text-blue-100">Commercial Properties</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all">
                <div className="text-3xl sm:text-4xl mb-2">⚡</div>
                <div className="text-2xl sm:text-3xl font-bold text-[#FFD700]">48-Hour</div>
                <div className="text-sm sm:text-base text-blue-100">Mitigation Average</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all">
                <div className="text-3xl sm:text-4xl mb-2">🕐</div>
                <div className="text-2xl sm:text-3xl font-bold text-[#FFD700]">24/7</div>
                <div className="text-sm sm:text-base text-blue-100">Emergency Service</div>
              </div>
            </div>

            {/* Regional CTAs */}
            <div className="space-y-4 mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 max-w-3xl mx-auto">
                <h3 className="text-lg font-semibold mb-4 text-[#FFD700]">Emergency Contact - Available 24/7</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <a href="tel:301-900-5171" className="block bg-gradient-to-r from-[#d32f2f] via-[#dc2626] to-[#f44336] hover:from-[#b71c1c] hover:to-[#c62828] text-white px-6 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-cta hover:shadow-cta-hover min-h-[44px] flex flex-col items-center justify-center">
                    <span className="text-sm">Maryland</span>
                    <span className="text-xl">301-900-5171</span>
                  </a>
                  <a href="tel:202-796-7422" className="block bg-gradient-to-r from-[#d32f2f] via-[#dc2626] to-[#f44336] hover:from-[#b71c1c] hover:to-[#c62828] text-white px-6 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-cta hover:shadow-cta-hover min-h-[44px] flex flex-col items-center justify-center">
                    <span className="text-sm">Washington DC</span>
                    <span className="text-xl">202-796-7422</span>
                  </a>
                  <a href="tel:703-844-4204" className="block bg-gradient-to-r from-[#d32f2f] via-[#dc2626] to-[#f44336] hover:from-[#b71c1c] hover:to-[#c62828] text-white px-6 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-cta hover:shadow-cta-hover min-h-[44px] flex flex-col items-center justify-center">
                    <span className="text-sm">Virginia</span>
                    <span className="text-xl">703-844-4204</span>
                  </a>
                </div>
              </div>

              {/* Primary CTA */}
              <button
                onClick={() => {
                  const form = document.getElementById('contact-form');
                  if (form) {
                    form.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-gray-900 px-8 py-4 sm:px-12 sm:py-5 rounded-3xl font-black text-lg sm:text-xl transition-all hover:scale-105 shadow-heavy hover:shadow-[0_16px_48px_rgba(255,215,0,0.4)] animate-pulse hover:animate-none min-h-[44px]"
              >
                Request Commercial Assessment →
              </button>
            </div>

            {/* Additional Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base text-blue-100">
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
