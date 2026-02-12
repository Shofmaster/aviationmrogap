import type { AssessmentData } from '../types/assessment';

type AssessmentField = keyof AssessmentData;

// Fields that belong to each section, used to calculate completion/progress.
const SECTION_FIELDS: Record<number, AssessmentField[]> = {
  0: ['companyName', 'location', 'employeeCount', 'annualRevenue', 'contactName', 'contactEmail', 'contactPhone'],
  1: ['certifications', 'as9100Rev', 'argusLevel', 'isbaoStage', 'wyvernLevel'],
  2: ['aircraftCategories', 'specificAircraftTypes', 'servicesOffered', 'mechanicCount', 'hangarCapabilities', 'oemAuthorizations', 'specialCapabilities'],
  3: ['maintenanceTrackingSoftware', 'softwareSatisfaction', 'hasDefinedProcess', 'processDocumented', 'processFollowed', 'processEffectiveness'],
  4: ['partsInventoryMethod', 'partsTrackingSystem', 'inventoryAccuracy', 'shelfLifeTracking'],
  5: ['qualityMethodologies', 'continuousImprovementActive', 'toolControlMethod', 'toolControlDescription', 'toolControlErrors', 'toolControlErrorFrequency'],
  6: ['hasSMS', 'smsProgram', 'smsMaturity', 'challenges'],
  7: ['trainingProgramType', 'trainingTracking', 'initialTrainingDuration', 'recurrentTrainingFrequency', 'competencyVerification', 'timeToCompetency'],
  8: ['calibrationProgram', 'calibrationTracking', 'overdueCalibrations', 'outOfToleranceFrequency', 'outOfToleranceResponse'],
  9: ['capaSystemStatus', 'discrepancyTracking', 'capaClosureTime', 'repeatDiscrepancies', 'capaAuthority'],
  10: ['lastFAASurveillance', 'auditSurveillance', 'auditFindingsCount', 'findingSeverity', 'recurringFindings', 'findingClosureStatus', 'certificateActions', 'auditHistory', 'upcomingAudits'],
  11: ['workOrderSystem', 'scheduleAdherence', 'productionBottlenecks', 'wipVisibility', 'routineInspectionDays', 'typicalRepairDays', 'majorOverhaulDays', 'capacityUtilization', 'productionPlanning'],
  12: ['firstPassRate', 'warrantyRate', 'repeatMaintenanceRate', 'reworkRate', 'jobMargin', 'revenuePerTech', 'scrapReworkCost', 'partsWaitDays', 'inspectionWaitHours', 'approvalTurnaroundDays', 'turnoverRate', 'specificConcerns'],
};

export function isFieldFilled(value: unknown): boolean {
  if (value === undefined || value === null || value === '') return false;
  if (Array.isArray(value)) return value.some((item) => isFieldFilled(item));
  if (typeof value === 'object') return Object.keys(value as object).length > 0;
  return true;
}

function getRelevantSectionFields(data: Partial<AssessmentData>, sectionId: number): AssessmentField[] {
  const fields = SECTION_FIELDS[sectionId];
  if (!fields || fields.length === 0) return [];

  switch (sectionId) {
    case 1: {
      const selectedCertifications = (data.certifications || []).filter((cert) => cert !== 'None');

      return fields.filter((field) => {
        if (field === 'as9100Rev') return selectedCertifications.includes('AS9100');
        if (field === 'argusLevel') return selectedCertifications.includes('ARGUS');
        if (field === 'isbaoStage') return selectedCertifications.includes('IS-BAO');
        if (field === 'wyvernLevel') return selectedCertifications.includes('Wyvern Wingman');
        return true;
      });
    }
    case 5: {
      if (data.toolControlErrors === 'Yes') return fields;
      return fields.filter((field) => field !== 'toolControlErrorFrequency');
    }
    case 6: {
      const showSmsDetails = data.hasSMS === 'Yes' || data.hasSMS === 'In Development';
      if (showSmsDetails) return fields;
      return fields.filter((field) => field !== 'smsProgram' && field !== 'smsMaturity');
    }
    case 10: {
      const selectedCertifications = (data.certifications || []).filter((cert) => cert !== 'None');
      const hasSelectedCertifications = selectedCertifications.length > 0;

      return fields.filter((field) => {
        if (field === 'auditSurveillance') return hasSelectedCertifications;
        if (field === 'lastFAASurveillance') return !hasSelectedCertifications;
        return true;
      });
    }
    default:
      return fields;
  }
}

function isAuditSurveillanceFilled(data: Partial<AssessmentData>): boolean {
  const selectedCertifications = (data.certifications || []).filter((cert) => cert !== 'None');
  if (selectedCertifications.length === 0) return false;

  const auditSurveillance: Record<string, string> = data.auditSurveillance ?? {};
  return selectedCertifications.every((cert) => isFieldFilled(auditSurveillance[cert]));
}

function isFieldFilledForProgress(data: Partial<AssessmentData>, field: AssessmentField): boolean {
  if (field === 'auditSurveillance') return isAuditSurveillanceFilled(data);
  return isFieldFilled(data[field]);
}

export function calculateSectionCompletion(data: Partial<AssessmentData>, sectionId: number): number {
  const fields = getRelevantSectionFields(data, sectionId);
  if (fields.length === 0) return 0;
  const filled = fields.filter((field) => isFieldFilledForProgress(data, field)).length;
  return filled / fields.length;
}

export function calculateOverallProgress(data: Partial<AssessmentData>): number {
  const sectionIds = Object.keys(SECTION_FIELDS).map((key) => Number.parseInt(key, 10));
  const allRelevantFields = sectionIds.flatMap((sectionId) => getRelevantSectionFields(data, sectionId));
  if (allRelevantFields.length === 0) return 0;

  const filledFields = allRelevantFields.filter((field) => isFieldFilledForProgress(data, field)).length;
  return (filledFields / allRelevantFields.length) * 100;
}

export const __internal = {
  SECTION_FIELDS,
  getRelevantSectionFields,
};

