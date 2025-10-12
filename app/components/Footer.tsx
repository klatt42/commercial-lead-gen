import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white py-12">
      <div className="container mx-auto px-4">
        {/* Main Footer Content - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#FFD700] mb-4">Commercial Restoration Services</h3>
            <p className="text-blue-100 leading-relaxed">
              Professional 24/7 emergency restoration for commercial and industrial properties.
              We specialize in water damage, fire restoration, mold remediation, storm damage,
              and environmental remediation services.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>Licensed</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🏆</span>
                <span>A+ BBB Rating</span>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-xl font-bold text-[#FFD700] mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/water-damage"
                  className="text-blue-100 hover:text-[#FFD700] transition-colors flex items-center gap-2"
                >
                  <span>💧</span>
                  <span>Water Damage Restoration</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/fire-damage"
                  className="text-blue-100 hover:text-[#FFD700] transition-colors flex items-center gap-2"
                >
                  <span>🔥</span>
                  <span>Fire Damage Recovery</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/mold-remediation"
                  className="text-blue-100 hover:text-[#FFD700] transition-colors flex items-center gap-2"
                >
                  <span>🦠</span>
                  <span>Mold Remediation</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/storm-damage"
                  className="text-blue-100 hover:text-[#FFD700] transition-colors flex items-center gap-2"
                >
                  <span>⛈️</span>
                  <span>Storm Damage Repair</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/industrial-equipment"
                  className="text-blue-100 hover:text-[#FFD700] transition-colors flex items-center gap-2"
                >
                  <span>⚙️</span>
                  <span>Industrial Equipment Restoration</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/environmental-remediation"
                  className="text-blue-100 hover:text-[#FFD700] transition-colors flex items-center gap-2"
                >
                  <span>🌍</span>
                  <span>Environmental Remediation</span>
                </Link>
              </li>
              <li className="flex items-center gap-2 text-[#FFD700] font-semibold">
                <span>🚨</span>
                <span>24/7 Emergency Response</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-xl font-bold text-[#FFD700] mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-blue-200 mb-1">Maryland</p>
                <a
                  href="tel:301-900-5171"
                  className="text-lg font-bold text-white hover:text-[#FFD700] transition-colors"
                >
                  301-900-5171
                </a>
              </div>
              <div>
                <p className="text-sm text-blue-200 mb-1">Washington DC</p>
                <a
                  href="tel:202-796-7422"
                  className="text-lg font-bold text-white hover:text-[#FFD700] transition-colors"
                >
                  202-796-7422
                </a>
              </div>
              <div>
                <p className="text-sm text-blue-200 mb-1">Virginia</p>
                <a
                  href="tel:703-844-4204"
                  className="text-lg font-bold text-white hover:text-[#FFD700] transition-colors"
                >
                  703-844-4204
                </a>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-[#FFD700] font-semibold">⚡ &lt;60 minute response time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6 mt-6">
          <div className="text-center text-sm text-blue-100 space-y-2">
            <p className="font-semibold">
              © 2025 Commercial Restoration Services. All rights reserved.
            </p>
            <p>
              Serving commercial properties across Maryland, Washington DC, and Virginia
              with professional emergency restoration services since 1995.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
