import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaChartLine, FaFileAlt, FaClock, FaSearch, FaTools, FaShieldAlt, FaHandshake, FaRocket, FaClipboardList, FaEnvelope } from 'react-icons/fa';

export default function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // When arriving at /#about (e.g. from /about redirect), scroll to the section
  useEffect(() => {
    if (location.hash === '#about') {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash]);

  return (
    <div className="relative z-10 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Quality & Safety for Aviation
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            From single A&P to global MRO. See where you stand — in 25 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/full-assessment')}
              className="bg-sky-blue hover:bg-sky-blue/90 text-navy-900 font-bold text-lg px-12 py-4 rounded-lg transition-all duration-200"
            >
              Get Full Assessment
            </button>
            <button
              onClick={() => navigate('/quiz')}
              className="border-2 border-sky-blue text-sky-blue hover:bg-sky-blue/10 font-bold text-lg px-12 py-4 rounded-lg transition-all duration-200"
            >
              Try Free Quick-Check
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">Confidential assessment • Professional PDF report</p>
        </div>

        {/* About — Who We Are */}
        <div id="about" className="mt-20 scroll-mt-20">
          <div className="glass rounded-2xl p-10 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center gradient-text" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Who We Are
            </h2>
            <p className="text-gray-400 text-center text-sm mb-4 max-w-2xl mx-auto">
              AeroGap is a service of Aviation Quality Company.
            </p>
            <p className="text-gray-300 text-center leading-relaxed mb-4 max-w-2xl mx-auto">
              AeroGap is an aviation quality and compliance consulting practice focused on maintenance organizations worldwide.
              We work with repair stations, MROs, and flight departments to close gaps in regulatory compliance, quality systems, and operations —
              so you can reduce risk, stay audit-ready, and capture revenue you might be leaving on the table.
            </p>
            <p className="text-gray-300 text-center leading-relaxed mb-4 max-w-2xl mx-auto">
              Our process is designed to be efficient: you answer questions about your systems and practices, and we deliver a professional report that highlights gaps and actionable recommendations.
              Whether you choose our free Quick-Check or the full assessment, you get confidential, practical insights to reduce risk, stay audit-ready, and optimize your operations.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center mt-8">
              <div>
                <p className="text-sky-blue font-bold text-lg mb-1">Repair Stations</p>
                <p className="text-gray-400 text-sm">Part 145, EASA Part-145, and international equivalents</p>
              </div>
              <div>
                <p className="text-sky-blue font-bold text-lg mb-1">MROs</p>
                <p className="text-gray-400 text-sm">Single-site to global maintenance providers</p>
              </div>
              <div>
                <p className="text-sky-blue font-bold text-lg mb-1">Flight Departments</p>
                <p className="text-gray-400 text-sm">Corporate, charter, and operator maintenance teams</p>
              </div>
            </div>
          </div>
        </div>

        {/* What We Do Section */}
        <div id="what-we-do" className="mt-20 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-4 text-center gradient-text" style={{ fontFamily: 'Poppins, sans-serif' }}>
            What We Do
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
            AeroGap helps MROs, Part 145 repair stations, flight departments, and aviation maintenance organizations
            close the gap between where they are and where they need to be — in compliance, quality, and profitability.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <WhatWeDoCard
              icon={<FaSearch className="w-7 h-7 text-sky-blue" />}
              title="Gap Analysis & Auditing"
              description="We identify compliance gaps across FAA, EASA, TCCA, AS9100, IS-BAO, Nadcap, and other regulatory frameworks — before auditors do. Our assessments pinpoint exactly where your organization falls short and what it takes to fix it."
            />
            <WhatWeDoCard
              icon={<FaShieldAlt className="w-7 h-7 text-sky-blue" />}
              title="Regulatory Compliance Support"
              description="From initial certification to ongoing compliance, we help you navigate the complexity of aviation regulations. We support Part 145, Part 121/135, EASA Part-M/21/66, SMS requirements, and international authority standards."
            />
            <WhatWeDoCard
              icon={<FaTools className="w-7 h-7 text-sky-blue" />}
              title="Quality System Development"
              description="We build and strengthen quality management systems — CAPA programs, calibration processes, tool control, FOD prevention, training matrices, and document control — so your organization runs with consistency and accountability."
            />
            <WhatWeDoCard
              icon={<FaClipboardList className="w-7 h-7 text-sky-blue" />}
              title="Process Improvement"
              description="We analyze your workflows from receiving to final inspection. By identifying bottlenecks, rework drivers, and inefficiencies, we help improve turnaround times, first-pass rates, and overall operational throughput."
            />
            <WhatWeDoCard
              icon={<FaChartLine className="w-7 h-7 text-sky-blue" />}
              title="Financial & Performance Analysis"
              description="We uncover hidden revenue leaks and cost-saving opportunities by benchmarking your key metrics — revenue per technician, job margins, scrap rates, and warranty costs — against industry standards."
            />
            <WhatWeDoCard
              icon={<FaHandshake className="w-7 h-7 text-sky-blue" />}
              title="Consulting & Implementation"
              description="We don't just hand you a report and walk away. Our team works alongside yours to implement corrective actions, build sustainable processes, and prepare your organization for successful audits and long-term growth."
            />
          </div>
        </div>

        {/* Why It Matters Section */}
        <div id="why-it-matters" className="glass rounded-2xl p-10 mt-20 max-w-4xl mx-auto scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6 text-center gradient-gold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Why It Matters
          </h2>
          <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
            In aviation maintenance, the cost of non-compliance isn't just financial — it's safety, reputation, and the ability to keep operating.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <FaRocket className="w-6 h-6 text-gold" />
              </div>
              <h4 className="font-bold text-lg mb-2">Reduce Risk</h4>
              <p className="text-gray-400 text-sm">Catch compliance gaps before they become audit findings, enforcement actions, or safety events.</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <FaChartLine className="w-6 h-6 text-gold" />
              </div>
              <h4 className="font-bold text-lg mb-2">Increase Revenue</h4>
              <p className="text-gray-400 text-sm">Most MROs leave 10-25% of potential revenue on the table through inefficient processes and missed capabilities.</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <FaShieldAlt className="w-6 h-6 text-gold" />
              </div>
              <h4 className="font-bold text-lg mb-2">Stay Audit-Ready</h4>
              <p className="text-gray-400 text-sm">Maintain continuous compliance so audits become confirmations, not surprises.</p>
            </div>
          </div>
        </div>

        {/* Our Assessment / Get a Snapshot of Your Gaps */}
        <div id="assessment" className="mt-20 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-4 text-center gradient-text" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Get a Snapshot of Your Gaps
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Our confidential online assessment is one way to see how we can help — 25–30 minutes, 13 key areas, and a professional PDF report with prioritized recommendations.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div>

        {/* What You'll Receive — Benefit list */}
        <div id="what-you-receive" className="glass rounded-2xl p-10 mt-20 max-w-4xl mx-auto scroll-mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center gradient-gold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            What You'll Receive
          </h2>
          <div className="space-y-4">
            <BenefitItem text="Critical compliance gaps with specific regulation references (FAA, EASA, TCCA, AS9100, IS-BAO, Nadcap & more)" />
            <BenefitItem text="Operational improvement opportunities benchmarked against industry standards" />
            <BenefitItem text="Financial impact analysis with potential cost savings estimates" />
            <BenefitItem text="Prioritized action plan with implementation timelines" />
            <BenefitItem text="Professional PDF report ready to share with stakeholders" />
          </div>
        </div>

        {/* Assessment Coverage Areas */}
        <div id="coverage-areas" className="mt-20 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-12 text-center gradient-text" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Assessment Coverage Areas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CoverageCard title="Regulatory Compliance" items={[
              "FAA Part 145/121/135 Requirements",
              "EASA Part 145/M/21/66",
              "TCCA, ANAC, CAAC, DGCA & More",
              "IS-BAO (Stage 1-3), ARGUS, Wyvern"
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
            onClick={() => navigate('/full-assessment')}
            className="bg-gold hover:bg-gold/90 text-navy-900 font-bold text-lg px-12 py-4 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Get Full Assessment
          </button>
          <p className="text-sm text-gray-400 mt-4">
            Completely Confidential • Professional PDF Report
          </p>
        </div>

        {/* Contact / Get in touch */}
        <div id="contact" className="mt-20 scroll-mt-20">
          <div className="glass rounded-2xl p-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center gradient-text" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Get in Touch
            </h2>
            <p className="text-gray-400 text-center mb-6">
              Questions about our assessments or consulting? Reach out.
            </p>
            <div className="flex flex-col items-center gap-4">
              <a
                href="mailto:info@aviationqualitycompany.com"
                className="inline-flex items-center gap-3 text-sky-blue hover:text-sky-blue/90 font-medium transition-colors"
              >
                <FaEnvelope className="w-6 h-6 flex-shrink-0" />
                info@aviationqualitycompany.com
              </a>
            </div>
          </div>
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

function WhatWeDoCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="glass rounded-xl p-8 hover:glass-strong transition-all duration-300 transform hover:-translate-y-1">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
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
