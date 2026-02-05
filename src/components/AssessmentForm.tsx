import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessmentStore } from '../store/assessmentStore';
import { FaChevronLeft, FaChevronRight, FaCheck } from 'react-icons/fa';
import CompanyInfoSection from './sections/CompanyInfoSection';
import CertificationsSection from './sections/CertificationsSection';
import AircraftServicesSection from './sections/AircraftServicesSection';
import SoftwareProcessSection from './sections/SoftwareProcessSection';
import PartsInventorySection from './sections/PartsInventorySection';
import QualityToolControlSection from './sections/QualityToolControlSection';
import SMSSection from './sections/SMSSection';
import TrainingSection from './sections/TrainingSection';
import CalibrationSection from './sections/CalibrationSection';
import CAPASection from './sections/CAPASection';
import RegulatoryAuditSection from './sections/RegulatoryAuditSection';
import ProductionSection from './sections/ProductionSection';
import MetricsFinancialsSection from './sections/MetricsFinancialsSection';

const SECTIONS = [
  { id: 0, title: 'Company Information', component: CompanyInfoSection },
  { id: 1, title: 'Certifications & Standards', component: CertificationsSection },
  { id: 2, title: 'Aircraft & Services', component: AircraftServicesSection },
  { id: 3, title: 'Software & Processes', component: SoftwareProcessSection },
  { id: 4, title: 'Parts & Inventory', component: PartsInventorySection },
  { id: 5, title: 'Quality & Tool Control', component: QualityToolControlSection },
  { id: 6, title: 'Safety Management System', component: SMSSection },
  { id: 7, title: 'Training & Competency', component: TrainingSection },
  { id: 8, title: 'Calibration Program', component: CalibrationSection },
  { id: 9, title: 'CAPA System', component: CAPASection },
  { id: 10, title: 'Regulatory & Audit', component: RegulatoryAuditSection },
  { id: 11, title: 'Production Control', component: ProductionSection },
  { id: 12, title: 'Metrics & Financials', component: MetricsFinancialsSection },
];

export default function AssessmentForm() {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep, assessmentData, updateAssessmentData } = useAssessmentStore();
  const [localData, setLocalData] = useState(assessmentData);

  const CurrentSectionComponent = SECTIONS[currentStep]?.component;
  const isLastStep = currentStep === SECTIONS.length - 1;

  const handleNext = () => {
    updateAssessmentData(localData);
    if (isLastStep) {
      // Navigate to results/analysis page
      navigate('/results');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    updateAssessmentData(localData);
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  const handleSectionClick = (sectionId: number) => {
    updateAssessmentData(localData);
    setCurrentStep(sectionId);
  };

  const progressPercentage = ((currentStep + 1) / SECTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-navy text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 gradient-text" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Aviation Quality Assessment
          </h1>
          <p className="text-gray-400">Complete all sections for comprehensive gap analysis</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Progress</span>
            <span className="text-sm text-gray-400">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-navy-800 rounded-full h-2">
            <div
              className="bg-sky-blue rounded-full h-2 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="glass rounded-xl p-4 sticky top-8">
              <h3 className="text-sm font-semibold mb-4 text-gray-400">Sections</h3>
              <div className="space-y-2">
                {SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      currentStep === section.id
                        ? 'bg-sky-blue text-navy-900 font-semibold'
                        : 'hover:bg-white/10 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {currentStep > section.id && (
                        <FaCheck className="w-3 h-3 text-green-400" />
                      )}
                      <span className="flex-1">{section.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="glass-strong rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 gradient-text">
                {SECTIONS[currentStep]?.title}
              </h2>

              {/* Render Current Section */}
              {CurrentSectionComponent && (
                <CurrentSectionComponent data={localData} updateData={setLocalData} />
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    currentStep === 0
                      ? 'opacity-50 cursor-not-allowed bg-gray-700'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <FaChevronLeft />
                  Previous
                </button>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-sky-blue hover:bg-sky-blue/90 text-navy-900 transition-all"
                >
                  {isLastStep ? (
                    <>
                      Complete Assessment
                      <FaCheck />
                    </>
                  ) : (
                    <>
                      Next
                      <FaChevronRight />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
