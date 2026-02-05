import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessmentStore } from '../store/assessmentStore';
import { analyzeAssessment } from '../services/gapAnalysisService';
import { generatePDFReport } from '../services/pdfService';
import { FaCheckCircle, FaExclamationTriangle, FaDownload, FaHome } from 'react-icons/fa';
import type { Gap, Recommendation } from '../types/assessment';

export default function ResultsPage() {
  const navigate = useNavigate();
  const { assessmentData, analysisResult, setAnalysisResult, setIsAnalyzing, setIsGeneratingPDF } = useAssessmentStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performAnalysis = async () => {
      if (!analysisResult && assessmentData.companyName) {
        try {
          setIsAnalyzing(true);
          const result = await analyzeAssessment(assessmentData);
          setAnalysisResult(result);
        } catch (err) {
          console.error('Analysis error:', err);
          setError('Failed to complete analysis. Please try again.');
        } finally {
          setIsAnalyzing(false);
        }
      }
    };

    performAnalysis();
  }, [assessmentData, analysisResult, setAnalysisResult, setIsAnalyzing]);

  const handleDownloadPDF = async () => {
    if (!analysisResult) return;

    try {
      setIsGeneratingPDF(true);
      await generatePDFReport(analysisResult);
    } catch (err) {
      console.error('PDF generation error:', err);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-navy text-white flex items-center justify-center p-4">
        <div className="glass-strong rounded-2xl p-8 max-w-md text-center">
          <FaExclamationTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Analysis Error</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => navigate('/assessment')}
            className="bg-sky-blue hover:bg-sky-blue/90 text-navy-900 font-bold px-6 py-3 rounded-lg"
          >
            Back to Assessment
          </button>
        </div>
      </div>
    );
  }

  if (!analysisResult) {
    return (
      <div className="min-h-screen bg-gradient-navy text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse-slow">
            <div className="w-16 h-16 border-4 border-sky-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          </div>
          <p className="text-xl text-gray-300">Analyzing your assessment...</p>
          <p className="text-sm text-gray-400 mt-2">This may take a few moments</p>
        </div>
      </div>
    );
  }

  const criticalGaps = analysisResult.criticalGaps.filter(g => g.severity === 'critical');
  const highGaps = analysisResult.criticalGaps.filter(g => g.severity === 'high');

  return (
    <div className="min-h-screen bg-gradient-navy text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold gradient-text" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Gap Analysis Results
            </h1>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <FaHome />
              Home
            </button>
          </div>
          <p className="text-gray-300">{analysisResult.companyName}</p>
          <p className="text-sm text-gray-400">
            Analysis Date: {new Date(analysisResult.analysisDate).toLocaleDateString()}
          </p>
        </div>

        {/* Score Card */}
        <div className="glass-strong rounded-2xl p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <ScoreCard
              title="Overall Score"
              value={`${analysisResult.overallScore}%`}
              color={analysisResult.overallScore >= 80 ? 'text-green-400' : analysisResult.overallScore >= 60 ? 'text-yellow-400' : 'text-red-400'}
            />
            <ScoreCard
              title="Critical Gaps"
              value={criticalGaps.length}
              color="text-red-400"
            />
            <ScoreCard
              title="High Priority Gaps"
              value={highGaps.length}
              color="text-orange-400"
            />
          </div>

          {analysisResult.potentialSavings && (
            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-sm text-gray-400 mb-2">Estimated Annual Savings Opportunity</p>
              <p className="text-3xl font-bold gradient-gold">{analysisResult.potentialSavings}</p>
            </div>
          )}
        </div>

        {/* Summary Insights */}
        {analysisResult.summaryInsights && analysisResult.summaryInsights.length > 0 && (
          <div className="glass rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 gradient-text">Key Insights</h2>
            <ul className="space-y-2">
              {analysisResult.summaryInsights.map((insight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <FaCheckCircle className="w-5 h-5 text-sky-blue flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Critical Gaps */}
        {analysisResult.criticalGaps.length > 0 && (
          <div className="glass rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-6 gradient-text">Identified Gaps</h2>
            <div className="space-y-4">
              {analysisResult.criticalGaps.map((gap) => (
                <GapCard key={gap.id} gap={gap} />
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {analysisResult.recommendations.length > 0 && (
          <div className="glass rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-6 gradient-text">Recommendations</h2>
            <div className="space-y-4">
              {analysisResult.recommendations.map((rec) => (
                <RecommendationCard key={rec.id} recommendation={rec} />
              ))}
            </div>
          </div>
        )}

        {/* Download PDF Button */}
        <div className="text-center">
          <button
            onClick={handleDownloadPDF}
            className="bg-gold hover:bg-gold/90 text-navy-900 font-bold text-lg px-8 py-4 rounded-lg inline-flex items-center gap-3 transform hover:scale-105 transition-all shadow-lg"
          >
            <FaDownload />
            Download Full PDF Report
          </button>
          <p className="text-sm text-gray-400 mt-4">
            Get your complete analysis with detailed findings and action plan
          </p>
        </div>
      </div>
    </div>
  );
}

function ScoreCard({ title, value, color }: { title: string; value: string | number; color: string }) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-2">{title}</p>
      <p className={`text-4xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function GapCard({ gap }: { gap: Gap }) {
  const severityColors = {
    critical: 'bg-red-500/20 border-red-500/50 text-red-300',
    high: 'bg-orange-500/20 border-orange-500/50 text-orange-300',
    medium: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300',
    low: 'bg-blue-500/20 border-blue-500/50 text-blue-300',
  };

  return (
    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg">{gap.title}</h3>
          <p className="text-sm text-gray-400">{gap.category}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${severityColors[gap.severity]}`}>
          {gap.severity.toUpperCase()}
        </span>
      </div>
      <p className="text-gray-300 text-sm mb-3">{gap.description}</p>
      {gap.impact && (
        <p className="text-sky-blue text-sm mb-2">
          <strong>Impact:</strong> {gap.impact}
        </p>
      )}
      {gap.recommendation && (
        <p className="text-green-400 text-sm">
          <strong>Recommendation:</strong> {gap.recommendation}
        </p>
      )}
    </div>
  );
}

function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  const priorityColors = {
    high: 'bg-red-500/20 border-red-500/50 text-red-300',
    medium: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300',
    low: 'bg-green-500/20 border-green-500/50 text-green-300',
  };

  return (
    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg">{recommendation.area}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${priorityColors[recommendation.priority]}`}>
          {recommendation.priority.toUpperCase()} PRIORITY
        </span>
      </div>
      <p className="text-gray-300 mb-3">{recommendation.recommendation}</p>
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        {recommendation.expectedImpact && (
          <div>
            <strong className="text-sky-blue">Expected Impact:</strong>
            <p className="text-gray-400">{recommendation.expectedImpact}</p>
          </div>
        )}
        {recommendation.implementationTimeline && (
          <div>
            <strong className="text-green-400">Timeline:</strong>
            <p className="text-gray-400">{recommendation.implementationTimeline}</p>
          </div>
        )}
      </div>
      {recommendation.estimatedCost && (
        <p className="text-sm text-gray-400 mt-2">
          <strong>Estimated Cost:</strong> {recommendation.estimatedCost}
        </p>
      )}
    </div>
  );
}
