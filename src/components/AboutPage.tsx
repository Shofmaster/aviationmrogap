export default function AboutPage() {
  return (
    <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              About AeroGap
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              We help aviation maintenance organizations understand where they stand on quality, safety, and compliance — and get a clear path to improve.
            </p>
            <div className="glass rounded-2xl p-8 md:p-10 space-y-6 text-gray-300">
              <p>
                AeroGap provides gap analysis and compliance assessments tailored to aviation MROs, from single A&P shops to global operations. Our process is designed to be efficient: you answer questions about your systems and practices, and we deliver a professional report that highlights gaps and actionable recommendations.
              </p>
              <p>
                Whether you choose our free Quick-Check or the full assessment, you get confidential, practical insights to reduce risk, stay audit-ready, and optimize your operations.
              </p>
            </div>
          </div>
        </div>
    </div>
  );
}
