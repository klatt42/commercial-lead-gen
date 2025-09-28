export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-restoration-blue to-blue-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-6">
            Commercial Restoration Lead Generation
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            AI-powered damage assessment for water, fire, storm, and mold restoration
          </p>
          <div className="bg-white rounded-lg shadow-xl p-8 text-gray-900 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-restoration-blue">
              Serving MD, DC, VA
            </h2>
            <p className="text-lg mb-6">
              Connect property owners with qualified restoration professionals through
              intelligent lead qualification and AI-powered damage assessment.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded">
                <div className="text-emergency-red font-bold text-lg">Water</div>
                <div className="text-sm">Damage</div>
              </div>
              <div className="p-4 bg-red-50 rounded">
                <div className="text-emergency-red font-bold text-lg">Fire</div>
                <div className="text-sm">Damage</div>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <div className="text-restoration-blue font-bold text-lg">Storm</div>
                <div className="text-sm">Damage</div>
              </div>
              <div className="p-4 bg-green-50 rounded">
                <div className="text-success-green font-bold text-lg">Mold</div>
                <div className="text-sm">Remediation</div>
              </div>
            </div>
            <button className="mt-6 bg-restoration-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Get Assessment
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}