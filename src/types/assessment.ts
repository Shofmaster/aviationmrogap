export interface AssessmentData {
  // Company Information
  companyName: string;
  location: string;
  employeeCount: string;
  annualRevenue: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;

  // Certifications & Standards
  certifications: string[];
  as9100Rev: string;
  argusLevel: string;
  isbaoStage: string;
  wyvernLevel: string;

  // Aircraft & Services
  aircraftCategories: string[];
  specificAircraftTypes: string;
  servicesOffered: string[];
  mechanicCount: string;
  hangarCapabilities: string;
  oemAuthorizations: string[];
  specialCapabilities: string[];

  // Software & Tracking
  maintenanceTrackingSoftware: string[];
  softwareSatisfaction: string;

  // Process Management
  hasDefinedProcess: string;
  processDocumented: string;
  processFollowed: string;
  processEffectiveness: string;

  // Parts & Inventory
  partsInventoryMethod: string;
  partsTrackingSystem: string;
  inventoryAccuracy: string;
  shelfLifeTracking: string;

  // Quality Systems
  qualityMethodologies: string[];
  continuousImprovementActive: string;

  // Tool Control
  toolControlMethod: string;
  toolControlDescription: string;
  toolControlErrors: string;
  toolControlErrorFrequency: string;

  // SMS (Safety Management System)
  hasSMS: string;
  smsProgram: string;
  smsMaturity: string;
  challenges: string[];

  // Training
  trainingPrograms: string[];
  trainingProgramType: string;
  trainingTracking: string;
  initialTrainingDuration: string;
  recurrentTrainingFrequency: string;
  competencyVerification: string;
  timeToCompetency: string;

  // Calibration
  calibrationProgram: string;
  calibrationTracking: string;
  overdueCalibrations: string;
  outOfToleranceFrequency: string;
  outOfToleranceResponse: string;

  // CAPA (Corrective & Preventive Action)
  capaSystemStatus: string;
  discrepancyTracking: string;
  capaClosureTime: string;
  repeatDiscrepancies: string;
  capaAuthority: string;

  // Regulatory & Audit
  lastFAASurveillance: string;
  auditSurveillance: Record<string, string>;
  auditFindingsCount: string;
  findingSeverity: string;
  recurringFindings: string;
  findingClosureStatus: string;
  certificateActions: string[];
  auditHistory: string;
  upcomingAudits: string;

  // Production & Operations
  workOrderSystem: string;
  scheduleAdherence: string;
  productionBottlenecks: string[];
  wipVisibility: string;
  routineInspectionDays: string;
  typicalRepairDays: string;
  majorOverhaulDays: string;
  capacityUtilization: string;
  productionPlanning: string;

  // Quality Metrics
  firstPassRate: string;
  warrantyRate: string;
  repeatMaintenanceRate: string;
  reworkRate: string;

  // Financial Metrics
  jobMargin: string;
  revenuePerTech: string;
  scrapReworkCost: string;

  // Wait Times
  partsWaitDays: string;
  inspectionWaitHours: string;
  approvalTurnaroundDays: string;

  // Other
  turnoverRate: string;
  specificConcerns: string;
}

export interface GapAnalysisResult {
  companyName: string;
  analysisDate: string;
  overallScore: number;
  criticalGaps: Gap[];
  recommendations: Recommendation[];
  potentialSavings?: string;
  summaryInsights: string[];
}

export interface Gap {
  id: string;
  category: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  recommendation: string;
}

export interface Recommendation {
  id: string;
  priority: 'high' | 'medium' | 'low';
  area: string;
  recommendation: string;
  expectedImpact: string;
  implementationTimeline: string;
  estimatedCost: string;
}
