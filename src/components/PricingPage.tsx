import { useNavigate } from 'react-router-dom';

export default function PricingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Pricing
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Choose the option that fits your needs.
            </p>
            <div className="grid gap-8 md:grid-cols-2 text-left">
              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-2 gradient-text">Free Quick-Check</h2>
                <p className="text-3xl font-bold text-sky-blue mb-4">$0</p>
                <p className="text-gray-300 text-sm mb-6">
                  A short quiz to flag potential compliance gaps. Get a snapshot of areas to focus on and the option to request a full review.
                </p>
                <button
                  onClick={() => navigate('/quiz')}
                  className="w-full bg-sky-blue/20 hover:bg-sky-blue/30 text-sky-blue font-bold py-3 rounded-lg border border-sky-blue/50 transition-colors"
                >
                  Try Quick-Check
                </button>
              </div>
              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-2 gradient-text">Full Assessment</h2>
                <p className="text-gray-400 text-sm mb-4">Contact for pricing</p>
                <p className="text-gray-300 text-sm mb-6">
                  25–30 minute comprehensive gap analysis across 13 areas. Professional PDF report with findings and recommendations.
                </p>
                <button
                  onClick={() => navigate('/full-assessment')}
                  className="w-full bg-sky-blue hover:bg-sky-blue/90 text-navy-900 font-bold py-3 rounded-lg transition-colors"
                >
                  Get Full Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
