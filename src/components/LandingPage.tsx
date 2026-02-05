import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaChartLine, FaFileAlt, FaClock } from 'react-icons/fa';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-navy text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <span className="gradient-text">Aviation Quality Assessment</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Identify Compliance Gaps & Operational Improvements
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Free, confidential gap analysis for aviation maintenance organizations.
            Discover hidden revenue potential and compliance risks in just 25-30 minutes.
          </p>

          <button
            onClick={() => navigate('/assessment')}
            className="bg-sky-blue hover:bg-sky-blue/90 text-navy-900 font-bold text-lg px-12 py-4 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Free Assessment
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <FeatureCard
            icon={<FaClock className="w-8 h-8 text-sky-blue" />}
            title="25-30 Minutes"
            description="Quick yet comprehensive assessment of your operations"
          />
          <FeatureCard
            icon={<FaCheckCircle className="w-8 h-8 text-sky-blue" />}
            title="13 Key Areas"
            description="FAA Part 145, quality systems, production, and financials"
          />
          <FeatureCard
            icon={<FaFileAlt className="w-8 h-8 text-sky-blue" />}
            title="PDF Report"
            description="Comprehensive analysis with prioritized recommendations"
          />
          <FeatureCard
            icon={<FaChartLine className="w-8 h-8 text-sky-blue" />}
            title="Actionable Insights"
            description="Identify compliance gaps and revenue opportunities"
          />
        </div>

        {/* What You'll Get Section */}
        <div className="glass rounded-2xl p-10 mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center gradient-gold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            What You'll Receive
          </h2>
          <div className="space-y-4">
            <BenefitItem text="Critical compliance gaps with specific regulation references (14 CFR Part 145, EASA, AS9100)" />
            <BenefitItem text="Operational improvement opportunities benchmarked against industry standards" />
            <BenefitItem text="Financial impact analysis with potential cost savings estimates" />
            <BenefitItem text="Prioritized action plan with implementation timelines" />
            <BenefitItem text="Professional PDF report ready to share with stakeholders" />
          </div>
        </div>

        {/* Assessment Coverage Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-12 text-center gradient-text" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Assessment Coverage Areas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CoverageCard title="Regulatory Compliance" items={[
              "FAA Part 145 Requirements",
              "EASA Compliance",
              "AS9100 Standards",
              "IS-BAO Certification"
            ]} />
            <CoverageCard title="Quality Systems" items={[
              "CAPA Effectiveness",
              "Calibration Programs",
              "Training & Competency",
              "Tool Control & FOD"
            ]} />
            <CoverageCard title="Operations" items={[
              "Production Control",
              "Work Order Systems",
              "Schedule Adherence",
              "Capacity Utilization"
            ]} />
            <CoverageCard title="Documentation" items={[
              "Process Documentation",
              "Parts Tracking",
              "Maintenance Software",
              "Inventory Management"
            ]} />
            <CoverageCard title="Quality Metrics" items={[
              "First Pass Rate",
              "Rework/Warranty Rates",
              "Audit Findings",
              "Repeat Discrepancies"
            ]} />
            <CoverageCard title="Financial Analysis" items={[
              "Revenue Per Technician",
              "Job Margins",
              "Scrap/Rework Costs",
              "Hidden Revenue Potential"
            ]} />
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center glass-strong rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-6">Ready to Optimize Your Operations?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of aviation maintenance organizations that have discovered
            compliance gaps and unlocked hidden revenue potential.
          </p>
          <button
            onClick={() => navigate('/assessment')}
            className="bg-gold hover:bg-gold/90 text-navy-900 font-bold text-lg px-12 py-4 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Begin Assessment Now
          </button>
          <p className="text-sm text-gray-400 mt-4">
            100% Free • Completely Confidential • No Credit Card Required
          </p>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Aviation Quality Company. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="glass rounded-xl p-6 hover:glass-strong transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <FaCheckCircle className="w-6 h-6 text-sky-blue flex-shrink-0 mt-0.5" />
      <p className="text-gray-300">{text}</p>
    </div>
  );
}

function CoverageCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="glass rounded-xl p-6 hover:glass-strong transition-all duration-300">
      <h3 className="text-xl font-bold mb-4 gradient-text">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
            <span className="text-sky-blue mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
