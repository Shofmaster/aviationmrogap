import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import {
  QUIZ_QUESTIONS,
  computeFlaggedAreas,
  type QuizAnswers,
  type LeadInfo,
  type FlaggedArea,
} from '../types/quiz';
import type { Id } from '../../convex/_generated/dataModel';
import {
  FiChevronRight,
  FiChevronLeft,
  FiShield,
  FiAlertTriangle,
  FiCheckCircle,
  FiSend,
  FiArrowRight,
  FiPhone,
  FiMail,
  FiUser,
  FiBriefcase,
  FiLock,
} from 'react-icons/fi';

type Step = 'quiz' | 'lead' | 'results';

export default function QuizPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('quiz');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [leadInfo, setLeadInfo] = useState<LeadInfo>({
    email: '',
    companyName: '',
    contactName: '',
    phone: '',
    consentToContact: false,
  });
  const [flaggedAreas, setFlaggedAreas] = useState<FlaggedArea[]>([]);
  const [submissionId, setSubmissionId] = useState<Id<'quizSubmissions'> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadErrors, setLeadErrors] = useState<Record<string, string>>({});

  const submitQuiz = useMutation(api.quizSubmissions.submit);
  const requestFullReviewMut = useMutation(api.quizSubmissions.requestFullReview);

  const currentQ = QUIZ_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;
  const allAnswered = QUIZ_QUESTIONS.every((q) => answers[q.field]);

  const selectAnswer = useCallback(
    (value: string) => {
      setAnswers((prev) => ({ ...prev, [currentQ.field]: value }));
      if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
        setTimeout(() => setCurrentQuestion((p) => p + 1), 300);
      }
    },
    [currentQ.field, currentQuestion]
  );

  const goToLeadCapture = useCallback(() => setStep('lead'), []);

  const validateLead = useCallback((): boolean => {
    const errors: Record<string, string> = {};
    if (!leadInfo.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadInfo.email.trim()))
      errors.email = 'Enter a valid email address';
    if (!leadInfo.companyName.trim()) errors.companyName = 'Company name is required';
    if (!leadInfo.contactName.trim()) errors.contactName = 'Contact name is required';
    if (!leadInfo.phone.trim()) errors.phone = 'Phone number is required';
    if (!leadInfo.consentToContact) errors.consent = 'You must consent to be contacted';
    setLeadErrors(errors);
    return Object.keys(errors).length === 0;
  }, [leadInfo]);

  const handleSubmit = useCallback(async () => {
    if (!validateLead()) return;
    setIsSubmitting(true);
    setLeadErrors((prev) => ({ ...prev, submit: '' }));
    try {
      const flags = computeFlaggedAreas(answers);
      setFlaggedAreas(flags);

      // Ensure quizAnswers is a plain record of string -> string for Convex
      const quizAnswersRecord: Record<string, string> = {};
      for (const [key, value] of Object.entries(answers)) {
        if (typeof key === 'string' && typeof value === 'string') {
          quizAnswersRecord[key] = value;
        }
      }

      const id = await submitQuiz({
        email: leadInfo.email.trim(),
        companyName: leadInfo.companyName.trim(),
        contactName: leadInfo.contactName.trim(),
        phone: leadInfo.phone.trim(),
        consentToContact: leadInfo.consentToContact,
        quizAnswers: quizAnswersRecord,
        flaggedAreas: flags.map((f) => f.area),
      });
      setSubmissionId(id);
      setStep('results');
    } catch (err) {
      console.error('Quiz submit error:', err);
      setLeadErrors({
        submit: 'Unable to save your results. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [answers, leadInfo, submitQuiz, validateLead]);

  const handleRequestFullReview = useCallback(async () => {
    if (!submissionId) return;
    try {
      await requestFullReviewMut({ submissionId });
      window.location.href = `mailto:info@aviationqualitycompany.com?subject=Full%20Review%20Request%20-%20${encodeURIComponent(leadInfo.companyName)}&body=Hi%2C%0A%0AI%20completed%20the%20free%20compliance%20quiz%20and%20would%20like%20to%20request%20a%20full%20review.%0A%0ACompany%3A%20${encodeURIComponent(leadInfo.companyName)}%0AContact%3A%20${encodeURIComponent(leadInfo.contactName)}%0AEmail%3A%20${encodeURIComponent(leadInfo.email)}%0APhone%3A%20${encodeURIComponent(leadInfo.phone)}`;
    } catch {
      // Silent fail
    }
  }, [submissionId, leadInfo, requestFullReviewMut]);

  const highFlags = useMemo(() => flaggedAreas.filter((f) => f.severity === 'high'), [flaggedAreas]);
  const mediumFlags = useMemo(() => flaggedAreas.filter((f) => f.severity === 'medium'), [flaggedAreas]);

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="px-4 sm:px-6 py-6 sm:py-10">
        {step === 'quiz' && (
          <div className="space-y-6">
            <div className="glass rounded-2xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60 font-medium">
                  Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-sm text-sky-blue font-semibold">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-blue to-sky-light rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="glass rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 leading-snug">
                {currentQ.question}
              </h2>

              <div className="space-y-3">
                {currentQ.options.map((opt) => {
                  const selected = answers[currentQ.field] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => selectAnswer(opt.value)}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
                        selected
                          ? 'bg-sky-blue/20 border-sky-blue text-white shadow-lg shadow-sky-blue/10'
                          : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="font-medium">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setCurrentQuestion((p) => Math.max(0, p - 1))}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2 px-5 py-3 glass rounded-xl text-white/70 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <FiChevronLeft /> Back
              </button>

              {currentQuestion < QUIZ_QUESTIONS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentQuestion((p) => p + 1)}
                  disabled={!answers[currentQ.field]}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-blue to-sky-light rounded-xl font-semibold hover:shadow-lg hover:shadow-sky-blue/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next <FiChevronRight />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={goToLeadCapture}
                  disabled={!allAnswered}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-blue to-sky-light rounded-xl font-semibold hover:shadow-lg hover:shadow-sky-blue/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  See My Results <FiArrowRight />
                </button>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              {QUIZ_QUESTIONS.map((q, i) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentQuestion(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === currentQuestion
                      ? 'bg-sky-blue scale-125'
                      : answers[q.field]
                        ? 'bg-sky-blue/40'
                        : 'bg-white/20'
                  }`}
                  aria-label={`Go to question ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {step === 'lead' && (
          <div className="space-y-6">
            <button
              type="button"
              onClick={() => setStep('quiz')}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <FiChevronLeft /> Back to quiz
            </button>

            <div className="glass rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Almost there</h2>
              <p className="text-white/60 mb-6">
                Enter your details to receive your personalized compliance quick-check results.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Email *</label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-lg" />
                    <input
                      type="email"
                      value={leadInfo.email}
                      onChange={(e) => setLeadInfo((p) => ({ ...p, email: e.target.value }))}
                      placeholder="you@company.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-sky-blue focus:ring-1 focus:ring-sky-blue"
                    />
                  </div>
                  {leadErrors.email && <p className="text-red-400 text-xs mt-1">{leadErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Company name *</label>
                  <div className="relative">
                    <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-lg" />
                    <input
                      type="text"
                      value={leadInfo.companyName}
                      onChange={(e) => setLeadInfo((p) => ({ ...p, companyName: e.target.value }))}
                      placeholder="Your company"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-sky-blue focus:ring-1 focus:ring-sky-blue"
                    />
                  </div>
                  {leadErrors.companyName && <p className="text-red-400 text-xs mt-1">{leadErrors.companyName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Contact name *</label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-lg" />
                    <input
                      type="text"
                      value={leadInfo.contactName}
                      onChange={(e) => setLeadInfo((p) => ({ ...p, contactName: e.target.value }))}
                      placeholder="Your name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-sky-blue focus:ring-1 focus:ring-sky-blue"
                    />
                  </div>
                  {leadErrors.contactName && <p className="text-red-400 text-xs mt-1">{leadErrors.contactName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Phone *</label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-lg" />
                    <input
                      type="tel"
                      value={leadInfo.phone}
                      onChange={(e) => setLeadInfo((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="(555) 123-4567"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-sky-blue focus:ring-1 focus:ring-sky-blue"
                    />
                  </div>
                  {leadErrors.phone && <p className="text-red-400 text-xs mt-1">{leadErrors.phone}</p>}
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={leadInfo.consentToContact}
                      onChange={(e) =>
                        setLeadInfo((p) => ({ ...p, consentToContact: e.target.checked }))
                      }
                      className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-sky-blue focus:ring-sky-blue focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                      I consent to Aviation Quality Company contacting me about my assessment
                      results and services. *
                    </span>
                  </label>
                  {leadErrors.consent && (
                    <p className="text-red-400 text-xs mt-1 ml-8">{leadErrors.consent}</p>
                  )}
                </div>

                {leadErrors.submit && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm">
                    {leadErrors.submit}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-sky-blue to-sky-light rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-sky-blue/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <FiSend /> Get My Results
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="text-center text-white/30 text-xs flex items-center justify-center gap-1">
              <FiLock className="text-xs" /> Your information is secure and will only be used to
              contact you about your results.
            </p>
          </div>
        )}

        {step === 'results' && (
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6 sm:p-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                Your Compliance Quick-Check Results
              </h2>
              <p className="text-white/60">
                Based on your responses, we identified{' '}
                <span className="text-white font-semibold">{flaggedAreas.length}</span>{' '}
                {flaggedAreas.length === 1 ? 'area' : 'areas'} that may need attention.
              </p>

              <div className="mt-6 flex justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="url(#scoreGradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${((QUIZ_QUESTIONS.length - flaggedAreas.length) / QUIZ_QUESTIONS.length) * 264} 264`}
                      transform="rotate(-90 50 50)"
                    />
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#7dd3fc" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">
                      {QUIZ_QUESTIONS.length - flaggedAreas.length}/{QUIZ_QUESTIONS.length}
                    </span>
                    <span className="text-xs text-white/50">areas clear</span>
                  </div>
                </div>
              </div>
            </div>

            {flaggedAreas.length > 0 ? (
              <div className="space-y-4">
                {highFlags.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-bold text-red-400 mb-3">
                      <FiAlertTriangle /> High Priority Areas
                    </h3>
                    <div className="space-y-3">
                      {highFlags.map((flag) => (
                        <div
                          key={flag.area}
                          className="glass rounded-xl p-5 border-l-4 border-red-400"
                        >
                          <h4 className="font-semibold text-white mb-1">{flag.label}</h4>
                          <p className="text-white/60 text-sm leading-relaxed">
                            {flag.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {mediumFlags.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-bold text-amber-400 mb-3">
                      <FiAlertTriangle /> Areas for Improvement
                    </h3>
                    <div className="space-y-3">
                      {mediumFlags.map((flag) => (
                        <div
                          key={flag.area}
                          className="glass rounded-xl p-5 border-l-4 border-amber-400"
                        >
                          <h4 className="font-semibold text-white mb-1">{flag.label}</h4>
                          <p className="text-white/60 text-sm leading-relaxed">
                            {flag.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="glass rounded-2xl p-6 sm:p-8 text-center">
                <FiCheckCircle className="text-green-400 text-4xl mx-auto mb-3" />
                <h3 className="text-xl font-bold text-green-400 mb-2">
                  Looking Good!
                </h3>
                <p className="text-white/60">
                  Based on your quick-check responses, no major compliance gaps were flagged. A full
                  review can provide deeper insights and identify hidden risks.
                </p>
              </div>
            )}

            <div className="glass rounded-2xl p-6 sm:p-8 border border-sky-blue/30 bg-gradient-to-br from-sky-blue/5 to-transparent">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                  Ready for a Complete Assessment?
                </h3>
                <p className="text-white/60 mb-6 max-w-2xl mx-auto">
                  Our <span className="text-white font-medium">Full Compliance Review</span>{' '}
                  provides an in-depth, AI-powered analysis across 80+ assessment criteria, plus
                  document review of your manuals and procedures. Get actionable findings,
                  prioritized recommendations, and audit preparation guidance.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleRequestFullReview}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-blue to-sky-light rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-sky-blue/30 transition-all"
                  >
                    Request Full Review <FiArrowRight />
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex flex-col items-center gap-1 text-white/50">
                    <span className="text-sky-blue font-bold text-lg">80+</span>
                    Assessment Criteria
                  </div>
                  <div className="flex flex-col items-center gap-1 text-white/50">
                    <span className="text-sky-blue font-bold text-lg">AI-Powered</span>
                    Deep Analysis
                  </div>
                  <div className="flex flex-col items-center gap-1 text-white/50">
                    <span className="text-sky-blue font-bold text-lg">Document</span>
                    Review Included
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-white/30 text-xs">
              This quick-check provides a high-level overview only. A full review is needed for
              comprehensive compliance analysis and audit preparation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
