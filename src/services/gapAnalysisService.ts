import type { AssessmentData, GapAnalysisResult, Gap, Recommendation } from '../types/assessment';

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

  // Analyze Quality Systems
  if (data.capaSystemStatus === 'No formal CAPA system' || data.capaSystemStatus === 'Limited tracking') {
    gaps.push({
      id: 'quality-1',
      category: 'Quality Systems',
      severity: data.capaSystemStatus === 'No formal CAPA system' ? 'critical' : 'high',
      title: 'Inadequate CAPA System',
      description: 'Corrective and Preventive Action system is insufficient for regulatory compliance and continuous improvement.',
      impact: 'Risk of recurring quality issues, audit findings, and potential certificate action by FAA.',
      recommendation: 'Implement a formal CAPA system with root cause analysis, effectiveness checks, and closure verification.',
    });
    scoreDeductions += data.capaSystemStatus === 'No formal CAPA system' ? 15 : 10;
  }

  // Analyze Training
  if (!data.trainingProgramType || data.trainingProgramType === 'Informal on-the-job training') {
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
  if (data.calibrationProgram === 'No formal program' || parseInt(data.overdueCalibrations || '0') > 5) {
    gaps.push({
      id: 'calibration-1',
      category: 'Calibration & Equipment',
      severity: data.calibrationProgram === 'No formal program' ? 'critical' : 'high',
      title: 'Calibration Program Deficiencies',
      description: 'Inadequate calibration program or excessive overdue calibrations (14 CFR §145.109).',
      impact: 'Risk of using out-of-tolerance equipment, leading to improper work and safety hazards.',
      recommendation: 'Establish formal calibration program with tracked intervals, vendor certifications, and overdue equipment lockout procedures.',
    });
    scoreDeductions += data.calibrationProgram === 'No formal program' ? 15 : 8;
  }

  // Analyze Tool Control
  if (data.toolControlMethod === 'No formal system' || data.toolControlErrors === 'Yes') {
    gaps.push({
      id: 'tool-1',
      category: 'Tool Control & FOD',
      severity: data.toolControlMethod === 'No formal system' ? 'high' : 'medium',
      title: 'Tool Control System Gaps',
      description: 'Inadequate tool control system with documented errors or missing tools.',
      impact: 'FOD risk, safety hazard, and potential for catastrophic failures if tools left in aircraft.',
      recommendation: 'Implement shadow boards, tool checkout system, and mandatory pre/post-flight tool accountability procedures.',
    });
    scoreDeductions += data.toolControlMethod === 'No formal system' ? 10 : 5;
  }

  // Analyze Production Metrics
  const firstPassRate = parseInt(data.firstPassRate?.replace('%', '') || '0');
  if (firstPassRate < 85) {
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
  if (data.recurringFindings === 'Yes, same issues found multiple times') {
    gaps.push({
      id: 'audit-1',
      category: 'Regulatory & Audit',
      severity: 'critical',
      title: 'Recurring Audit Findings',
      description: 'Same issues found in multiple FAA surveillance visits indicates systemic CAPA failure.',
      impact: 'High risk of certificate action. Demonstrates ineffective corrective action process.',
      recommendation: 'Conduct root cause analysis on recurring findings. Implement systemic changes and verify effectiveness.',
    });
    scoreDeductions += 15;
  }

  // Analyze Financial Metrics
  const jobMargin = parseInt(data.jobMargin?.replace('%', '') || '0');
  if (jobMargin < 15) {
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
  if (data.turnoverRate && parseInt(data.turnoverRate.replace('%', '')) > 15) {
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

  if (!data.maintenanceTrackingSoftware || data.softwareSatisfaction === 'Very dissatisfied' || data.softwareSatisfaction === 'Dissatisfied') {
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

  if (data.partsInventoryMethod === 'Manual spreadsheets' || data.inventoryAccuracy !== 'Very accurate (95%+)') {
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
    const revenue = parseFloat(data.annualRevenue.replace(/[^0-9.]/g, ''));
    if (revenue > 0) {
      // Estimate 10-20% savings from operational improvements
      potentialSavings = revenue * 0.15;
    }
  }

  const result: GapAnalysisResult = {
    companyName: data.companyName || 'Your Organization',
    analysisDate: new Date().toISOString(),
    overallScore,
    criticalGaps: gaps,
    recommendations,
    potentialSavings: potentialSavings > 0 ? `$${(potentialSavings / 1000000).toFixed(1)}M - $${(potentialSavings * 1.3 / 1000000).toFixed(1)}M` : undefined,
    summaryInsights: [
      `Overall compliance score: ${overallScore}%`,
      `${gaps.filter(g => g.severity === 'critical').length} critical gaps requiring immediate attention`,
      `${gaps.filter(g => g.severity === 'high').length} high-priority gaps to address within 30-60 days`,
      gaps.length > 0 ? 'Prioritized action plan provided in recommendations section' : 'Strong compliance posture with minor improvement opportunities',
    ],
  };

  return result;
}
