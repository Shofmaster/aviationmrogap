import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaFileAlt, FaClock, FaChartLine, FaShieldAlt } from 'react-icons/fa';

export default function FullAssessmentLandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative z-10">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Full AeroGap Assessment
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Comprehensive gap analysis for aviation maintenance organizations
          </p>
          <p className="text-gray-400">
            25–30 minutes • 13 key areas • Professional PDF report
          </p>
        </div>

        <div className="glass rounded-2xl p-8 md:p-10 mb-10">
          <h2 className="text-2xl font-bold mb-6 gradient-gold text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            What's Included
          </h2>
          <ul className="space-y-4 mb-10">
            <li className="flex items-start gap-3 text-gray-300">
              <FaCheckCircle className="w-6 h-6 text-sky-blue flex-shrink-0 mt-0.5" />
              <span>Critical compliance gaps with specific regulation references (FAA, EASA, TCCA, AS9100, IS-BAO, Nadcap & more)</span>
            </li>
            <li className="flex items-start gap-3 text-gray-300">
              <FaCheckCircle className="w-6 h-6 text-sky-blue flex-shrink-0 mt-0.5" />
              <span>Operational improvement opportunities benchmarked against industry standards</span>
            </li>
            <li className="flex items-start gap-3 text-gray-300">
              <FaCheckCircle className="w-6 h-6 text-sky-blue flex-shrink-0 mt-0.5" />
              <span>Financial impact analysis with potential cost savings estimates</span>
            </li>
            <li className="flex items-start gap-3 text-gray-300">
              <FaCheckCircle className="w-6 h-6 text-sky-blue flex-shrink-0 mt-0.5" />
              <span>Prioritized action plan with implementation timelines</span>
            </li>
            <li className="flex items-start gap-3 text-gray-300">
              <FaFileAlt className="w-6 h-6 text-sky-blue flex-shrink-0 mt-0.5" />
              <span>Professional PDF report ready to share with stakeholders</span>
            </li>
            <li className="flex items-start gap-3 text-gray-300">
              <FaFileAlt className="w-6 h-6 text-sky-blue flex-shrink-0 mt-0.5" />
              <span>Optional: upload company manuals and files for a full document-based analysis</span>
            </li>
          </ul>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="text-center p-3 rounded-lg bg-white/5">
              <FaClock className="w-6 h-6 text-sky-blue mx-auto mb-1" />
              <p className="text-sm text-gray-400">25–30 min</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-white/5">
              <FaChartLine className="w-6 h-6 text-sky-blue mx-auto mb-1" />
              <p className="text-sm text-gray-400">13 Areas</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-white/5">
              <FaFileAlt className="w-6 h-6 text-sky-blue mx-auto mb-1" />
              <p className="text-sm text-gray-400">PDF Report</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-white/5">
              <FaShieldAlt className="w-6 h-6 text-sky-blue mx-auto mb-1" />
              <p className="text-sm text-gray-400">Confidential</p>
            </div>
          </div>

          <div className="text-center border-t border-white/10 pt-8">
            <p className="text-gray-400 text-sm mb-6">
              Complete your purchase to unlock the full assessment. You'll be able to start immediately after payment.
            </p>
            <button
              onClick={() => navigate('/assessment')}
              className="bg-gold hover:bg-gold/90 text-navy-900 font-bold text-lg px-12 py-4 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Pay & Start Full Assessment
            </button>
            <p className="text-xs text-gray-500 mt-4">
              Secure payment • Instant access
            </p>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm">
          Not ready for the full assessment?{' '}
          <button
            onClick={() => navigate('/quiz')}
            className="text-sky-blue hover:underline"
          >
            Try the free Quick-Check Quiz
          </button>
        </p>
      </div>
    </div>
  );
}
