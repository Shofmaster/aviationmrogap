import type { AssessmentData, GapAnalysisResult, Gap, Recommendation } from '../types/assessment';

function normalizeValue(value?: string | null): string {
  return (value || '').trim().toLowerCase();
}

function parsePercent(value?: string): number | null {
  if (!value) return null;
  const normalized = value.replace(/%/g, '').trim();
  if (!normalized || normalized.toLowerCase().includes('unknown')) return null;

  const rangeMatch = normalized.match(/^(\d+(\.\d+)?)\s*-\s*(\d+(\.\d+)?)$/);
  if (rangeMatch) {
    const low = parseFloat(rangeMatch[1]);
    const high = parseFloat(rangeMatch[3]);
    if (Number.isFinite(low) && Number.isFinite(high)) {
      return (low + high) / 2;
    }
  }

  const numeric = parseFloat(normalized);
  return Number.isFinite(numeric) ? numeric : null;
}

function parseMoney(value?: string): number | null {
  if (!value) return null;
  const normalized = value.replace(/[$,]/g, '').trim();
  if (!normalized || normalized.toLowerCase().includes('unknown')) return null;

  const matches = [...normalized.matchAll(/(\d+(\.\d+)?)(\s*[mk])?/gi)];
  if (matches.length === 0) return null;

  const values = matches.map((match) => {
    const num = parseFloat(match[1]);
    const suffix = match[3]?.trim().toLowerCase();
    if (!Number.isFinite(num)) return null;
    if (suffix === 'm') return num * 1_000_000;
    if (suffix === 'k') return num * 1_000;
    return num;
  }).filter((num): num is number => num !== null);

  if (values.length === 0) return null;
  const sum = values.reduce((acc, current) => acc + current, 0);
  return sum / values.length;
}

function mapOverdueCalibrations(value?: string): number | null {
  switch (value) {
    case 'None':
      return 0;
    case '1-3 Items':
      return 2;
    case '4-10 Items':
      return 7;
    case 'More than 10':
      return 11;
    default:
      return null;
  }
}

export async function analyzeAssessment(data: Partial<AssessmentData>): Promise<GapAnalysisResult> {
  // Simulate analysis delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const gaps: Gap[] = [];
  const recommendations: Recommendation[] = [];
  let scoreDeductions = 0;

  // Analyze Certifications
  if (!data.certifications || data.certifications.length === 0 || data.certifications.includes('None')) {
    gaps.push({
      id: 'cert-1',
      category: 'Certifications & Compliance',
      severity: 'critical',
      title: 'No Active Certifications',
      description: 'Organization lacks fundamental aviation maintenance certifications such as FAA Part 145 or EASA Part 145.',
      impact: 'Cannot legally perform maintenance on many aircraft types. Severely limits business opportunities.',
      recommendation: 'Prioritize obtaining FAA Part 145 certification. Begin by conducting a gap analysis against 14 CFR Part 145 requirements.',
    });
    scoreDeductions += 20;
  }

  // Analyze IS-BAO Stage
  if (data.certifications?.includes('IS-BAO') && (!data.isbaoStage || data.isbaoStage === 'N/A')) {
    gaps.push({
      id: 'cert-isbao-1',
      category: 'Certifications & Compliance',
      severity: 'medium',
      title: 'IS-BAO Stage Not Defined',
      description: 'Organization claims IS-BAO certification but has not specified the audit stage.',
      impact: 'Unable to benchmark safety management maturity against IS-BAO framework.',
      recommendation: 'Determine current IS-BAO stage and develop a roadmap to progress to Stage 3 (Continual Improvement).',
    });
    scoreDeductions += 3;
  } else if (data.isbaoStage === 'Stage 1') {
    gaps.push({
      id: 'cert-isbao-2',
      category: 'Certifications & Compliance',
      severity: 'medium',
      title: 'IS-BAO Stage 1 - Foundation Level Only',
      description: 'Organization is at IS-BAO Stage 1 (Foundation), which represents initial SMS implementation.',
      impact: 'Stage 1 demonstrates commitment but lacks the mature safety culture of Stage 2 and 3 operators.',
      recommendation: 'Develop plan to advance to IS-BAO Stage 2 by strengthening safety reporting, risk management, and safety assurance processes.',
    });
    scoreDeductions += 3;
  }

  // Analyze Wyvern Rating
  if (data.certifications?.includes('Wyvern Wingman') && (!data.wyvernLevel || data.wyvernLevel === 'N/A')) {
    gaps.push({
      id: 'cert-wyvern-1',
      category: 'Certifications & Compliance',
      severity: 'low',
      title: 'Wyvern Rating Not Specified',
      description: 'Organization references Wyvern but has not specified the rating level.',
      impact: 'Cannot assess third-party safety audit status.',
      recommendation: 'Clarify current Wyvern rating status (Wingman or Registered).',
    });
    scoreDeductions += 2;
  }

  // Analyze Quality Systems
  if (data.capaSystemStatus === 'None') {
    gaps.push({
      id: 'quality-1',
      category: 'Quality Systems',
      severity: 'critical',
      title: 'Inadequate CAPA System',
      description: 'Corrective and Preventive Action system is insufficient for regulatory compliance and continuous improvement.',
      impact: 'Risk of recurring quality issues, audit findings, and potential certificate action by FAA.',
      recommendation: 'Implement a formal CAPA system with root cause analysis, effectiveness checks, and closure verification.',
    });
    scoreDeductions += 15;
  } else if (data.capaSystemStatus === 'Partially Implemented' || data.capaSystemStatus === 'In Development') {
    gaps.push({
      id: 'quality-1',
      category: 'Quality Systems',
      severity: 'high',
      title: 'CAPA System Needs Maturity',
      description: 'CAPA system is not fully implemented or still in development.',
      impact: 'Risk of recurring quality issues and delayed corrective action effectiveness.',
      recommendation: 'Complete CAPA implementation with root cause analysis, effectiveness checks, and closure verification.',
    });
    scoreDeductions += 10;
  } else if (data.capaSystemStatus === 'Implemented') {
    gaps.push({
      id: 'quality-1',
      category: 'Quality Systems',
      severity: 'medium',
      title: 'CAPA System Needs Improvement',
      description: 'CAPA system is implemented but still requires improvements to ensure consistent effectiveness.',
      impact: 'Potential for recurring issues if CAPA effectiveness is not verified.',
      recommendation: 'Strengthen CAPA effectiveness checks, management review, and closure verification.',
    });
    scoreDeductions += 6;
  }

  // Analyze Training
  if (!data.trainingProgramType || data.trainingProgramType === 'OJT Only' || data.trainingProgramType === 'Minimal') {
    gaps.push({
      id: 'training-1',
      category: 'Training & Competency',
      severity: 'high',
      title: 'Informal Training Program',
      description: 'Lack of structured training program violates 14 CFR §145.163 requirements for training data.',
      impact: 'Non-compliance with Part 145 training requirements. Risk of unqualified personnel performing critical work.',
      recommendation: 'Develop formal training program with documented curricula, competency assessments, and training records.',
    });
    scoreDeductions += 12;
  }

  // Analyze Calibration
  const overdueCount = mapOverdueCalibrations(data.overdueCalibrations);
  if (data.calibrationProgram === 'No' || overdueCount !== null && overdueCount > 5) {
    gaps.push({
      id: 'calibration-1',
      category: 'Calibration & Equipment',
      severity: data.calibrationProgram === 'No' ? 'critical' : 'high',
      title: 'Calibration Program Deficiencies',
      description: 'Inadequate calibration program or excessive overdue calibrations (14 CFR §145.109).',
      impact: 'Risk of using out-of-tolerance equipment, leading to improper work and safety hazards.',
      recommendation: 'Establish formal calibration program with tracked intervals, vendor certifications, and overdue equipment lockout procedures.',
    });
    scoreDeductions += data.calibrationProgram === 'No' ? 15 : 8;
  } else if (data.calibrationProgram === 'Partially') {
    gaps.push({
      id: 'calibration-2',
      category: 'Calibration & Equipment',
      severity: 'high',
      title: 'Calibration Program Partially Implemented',
      description: 'Calibration program exists but is not fully implemented or consistently followed.',
      impact: 'Increased risk of out-of-tolerance tools and inconsistent compliance.',
      recommendation: 'Formalize calibration procedures, tracking, and vendor controls to ensure full coverage.',
    });
    scoreDeductions += 8;
  }

  // Analyze Tool Control
  if (data.toolControlMethod === 'None' || data.toolControlErrors === 'Yes') {
    gaps.push({
      id: 'tool-1',
      category: 'Tool Control & FOD',
      severity: data.toolControlMethod === 'None' ? 'high' : 'medium',
      title: 'Tool Control System Gaps',
      description: 'Inadequate tool control system with documented errors or missing tools.',
      impact: 'FOD risk, safety hazard, and potential for catastrophic failures if tools left in aircraft.',
      recommendation: 'Implement shadow boards, tool checkout system, and mandatory pre/post-flight tool accountability procedures.',
    });
    scoreDeductions += data.toolControlMethod === 'None' ? 10 : 5;
  }

  // Analyze Production Metrics
  const firstPassRate = parsePercent(data.firstPassRate);
  if (firstPassRate !== null && firstPassRate < 85) {
    gaps.push({
      id: 'production-1',
      category: 'Production & Quality Metrics',
      severity: firstPassRate < 70 ? 'high' : 'medium',
      title: 'Low First Pass Rate',
      description: `First pass rate of ${data.firstPassRate} is below industry standard of 85-95%.`,
      impact: 'Excessive rework costs, schedule delays, and reduced profitability. Indicates quality control issues.',
      recommendation: 'Implement first pass quality initiatives: enhanced training, better work instructions, and process standardization.',
    });
    scoreDeductions += firstPassRate < 70 ? 8 : 5;
  }

  // Analyze Audit Findings
  if (data.recurringFindings === 'Yes' || data.recurringFindings === 'Some') {
    gaps.push({
      id: 'audit-1',
      category: 'Regulatory & Audit',
      severity: data.recurringFindings === 'Yes' ? 'critical' : 'high',
      title: 'Recurring Audit Findings',
      description: 'Issues found in multiple FAA surveillance visits indicate systemic CAPA weaknesses.',
      impact: 'Increased risk of certificate action. Demonstrates ineffective corrective action process.',
      recommendation: 'Conduct root cause analysis on recurring findings. Implement systemic changes and verify effectiveness.',
    });
    scoreDeductions += data.recurringFindings === 'Yes' ? 15 : 8;
  }

  // Analyze Financial Metrics
  const jobMargin = parsePercent(data.jobMargin);
  if (jobMargin !== null && jobMargin < 15) {
    gaps.push({
      id: 'financial-1',
      category: 'Financial Performance',
      severity: 'medium',
      title: 'Low Job Margins',
      description: `Job margins of ${data.jobMargin} are below industry standard of 20-30%.`,
      impact: 'Reduced profitability and limited resources for quality improvements and capital investments.',
      recommendation: 'Analyze pricing strategy, reduce rework costs, improve schedule adherence, and optimize parts management.',
    });
    scoreDeductions += 5;
  }

  // Generate Recommendations
  const turnoverRate = parsePercent(data.turnoverRate);
  if (turnoverRate !== null && turnoverRate > 15) {
    recommendations.push({
      id: 'rec-1',
      priority: 'high',
      area: 'Workforce Retention',
      recommendation: 'Implement employee retention program with competitive compensation, career development, and improved work environment.',
      expectedImpact: 'Reduce training costs, improve quality consistency, and enhance institutional knowledge.',
      implementationTimeline: '3-6 months',
      estimatedCost: '$50,000 - $100,000 annually',
    });
  }

  const softwareSatisfaction = normalizeValue(data.softwareSatisfaction);
  if (!data.maintenanceTrackingSoftware?.length || softwareSatisfaction === 'very dissatisfied' || softwareSatisfaction === 'dissatisfied') {
    recommendations.push({
      id: 'rec-2',
      priority: 'medium',
      area: 'Technology Upgrade',
      recommendation: 'Invest in modern maintenance tracking software (CAMP, Traxxall, or Corridor) to improve efficiency and compliance.',
      expectedImpact: 'Better compliance tracking, reduced administrative burden, improved metrics visibility.',
      implementationTimeline: '6-12 months',
      estimatedCost: '$20,000 - $75,000 implementation + $10,000-$30,000 annually',
    });
  }

  const inventoryMethod = data.partsInventoryMethod || '';
  if (
    inventoryMethod === 'Spreadsheet' ||
    inventoryMethod === 'Manual/Paper' ||
    inventoryMethod === 'Manual' ||
    (data.inventoryAccuracy && data.inventoryAccuracy !== '95-100%')
  ) {
    recommendations.push({
      id: 'rec-3',
      priority: 'medium',
      area: 'Inventory Management',
      recommendation: 'Implement barcode/RFID inventory tracking system with cycle counting program.',
      expectedImpact: 'Reduce parts delays, minimize excess inventory, improve invoice accuracy, and reduce write-offs.',
      implementationTimeline: '3-6 months',
      estimatedCost: '$15,000 - $50,000',
    });
  }

  recommendations.push({
    id: 'rec-4',
    priority: 'high',
    area: 'Quality Management System',
    recommendation: 'Conduct comprehensive QMS gap analysis against Part 145 and AS9100 standards.',
    expectedImpact: 'Identify all compliance gaps, prioritize improvements, and create roadmap for certification readiness.',
    implementationTimeline: '1-3 months',
    estimatedCost: '$10,000 - $25,000 for consultant-led gap analysis',
  });

  // Calculate Overall Score
  const overallScore = Math.max(0, 100 - scoreDeductions);

  // Calculate Potential Savings
  let potentialSavings = 0;
  if (data.annualRevenue) {
    const revenue = parseMoney(data.annualRevenue);
    if (revenue !== null && revenue > 0) {
      // Estimate 10-20% savings from operational improvements
      potentialSavings = revenue * 0.15;
    }
  }

  const docCount = data.uploadedDocuments?.length ?? 0;
  const summaryInsights: string[] = [
    `Overall compliance score: ${overallScore}%`,
    `${gaps.filter(g => g.severity === 'critical').length} critical gaps requiring immediate attention`,
    `${gaps.filter(g => g.severity === 'high').length} high-priority gaps to address within 30-60 days`,
    gaps.length > 0 ? 'Prioritized action plan provided in recommendations section' : 'Strong compliance posture with minor improvement opportunities',
  ];
  if (docCount > 0) {
    summaryInsights.push(`${docCount} company document(s) uploaded for full analysis — included in your assessment record.`);
  }

  const result: GapAnalysisResult = {
    companyName: data.companyName || 'Your Organization',
    analysisDate: new Date().toISOString(),
    overallScore,
    criticalGaps: gaps,
    recommendations,
    potentialSavings: potentialSavings > 0 ? `$${(potentialSavings / 1000000).toFixed(1)}M - $${(potentialSavings * 1.3 / 1000000).toFixed(1)}M` : undefined,
    summaryInsights,
  };

  return result;
}
