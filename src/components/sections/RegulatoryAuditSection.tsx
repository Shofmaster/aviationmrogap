import { SectionProps, FormField, CheckboxGroup, Select, TextInput, TextArea } from './FormComponents';

const SURVEILLANCE_TIMEFRAMES = [
  { value: 'Within 3 months', label: 'Within 3 months' },
  { value: '3-6 months ago', label: '3-6 months ago' },
  { value: '6-12 months ago', label: '6-12 months ago' },
  { value: 'Over 1 year ago', label: 'Over 1 year ago' },
  { value: 'Never', label: 'Never' },
];

const FINDING_COUNTS = [
  { value: 'None', label: 'None (0)' },
  { value: '1-3', label: '1-3 Findings' },
  { value: '4-6', label: '4-6 Findings' },
  { value: '7-10', label: '7-10 Findings' },
  { value: 'More than 10', label: 'More than 10 Findings' },
];

const SEVERITY_LEVELS = [
  { value: 'Level 1 (Most Severe)', label: 'Level 1 (Most Severe)' },
  { value: 'Level 2', label: 'Level 2' },
  { value: 'Level 3', label: 'Level 3' },
  { value: 'Level 4 (Minor)', label: 'Level 4 (Minor)' },
  { value: 'Mix of Levels', label: 'Mix of Levels' },
  { value: 'N/A', label: 'Not Applicable' },
];

const YES_NO_OPTIONS = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
  { value: 'Some', label: 'Some Recurring' },
];

const CLOSURE_STATUS = [
  { value: 'All Closed', label: 'All Closed' },
  { value: 'Mostly Closed', label: 'Mostly Closed' },
  { value: 'Some Open', label: 'Some Still Open' },
  { value: 'Many Open', label: 'Many Still Open' },
  { value: 'N/A', label: 'Not Applicable' },
];

const CERTIFICATE_ACTIONS = [
  'Warning Notice',
  'Letter of Investigation',
  'Civil Penalty',
  'Certificate Suspension',
  'Emergency Revocation',
  'None'
];

export default function RegulatoryAuditSection({ data, updateData }: SectionProps) {
  const selectedCertifications = data.certifications || [];
  const auditSurveillance = data.auditSurveillance || {};
  const hasSelectedCertifications = selectedCertifications.some((cert) => cert !== 'None');

  const updateAuditSurveillance = (cert: string, value: string) => {
    updateData({
      ...data,
      auditSurveillance: {
        ...auditSurveillance,
        [cert]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      {hasSelectedCertifications ? (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-200 border-b border-white/10 pb-2">
            Last Audit / Surveillance by Certification
          </h3>
          <p className="text-xs text-gray-400">
            Based on your selected certifications, when was your last audit or surveillance for each?
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {selectedCertifications.filter(c => c !== 'None').map((cert) => (
              <FormField
                key={cert}
                label={`${cert}`}
                helpText={`Last audit/surveillance for ${cert}`}
              >
                <Select
                  value={auditSurveillance[cert] || ''}
                  onChange={(value) => updateAuditSurveillance(cert, value)}
                  options={SURVEILLANCE_TIMEFRAMES}
                  placeholder="Select timeframe"
                />
              </FormField>
            ))}
          </div>
        </div>
      ) : (
        <FormField
          label="Last FAA Surveillance"
          helpText="When was your last FAA surveillance/inspection?"
        >
          <Select
            value={data.lastFAASurveillance || ''}
            onChange={(value) => updateData({ ...data, lastFAASurveillance: value })}
            options={SURVEILLANCE_TIMEFRAMES}
            placeholder="Select timeframe"
          />
        </FormField>
      )}

      <FormField
        label="Audit Findings Count"
        helpText="How many findings were issued during your last audit?"
      >
        <Select
          value={data.auditFindingsCount || ''}
          onChange={(value) => updateData({ ...data, auditFindingsCount: value })}
          options={FINDING_COUNTS}
          placeholder="Select count"
        />
      </FormField>

      <FormField
        label="Finding Severity"
        helpText="What was the severity level of findings?"
      >
        <Select
          value={data.findingSeverity || ''}
          onChange={(value) => updateData({ ...data, findingSeverity: value })}
          options={SEVERITY_LEVELS}
          placeholder="Select severity"
        />
      </FormField>

      <FormField
        label="Recurring Findings"
        helpText="Have you had recurring findings across multiple audits?"
      >
        <Select
          value={data.recurringFindings || ''}
          onChange={(value) => updateData({ ...data, recurringFindings: value })}
          options={YES_NO_OPTIONS}
          placeholder="Select option"
        />
      </FormField>

      <FormField
        label="Finding Closure Status"
        helpText="What is the status of closing audit findings?"
      >
        <Select
          value={data.findingClosureStatus || ''}
          onChange={(value) => updateData({ ...data, findingClosureStatus: value })}
          options={CLOSURE_STATUS}
          placeholder="Select status"
        />
      </FormField>

      <FormField
        label="Certificate Actions"
        helpText="Have you received any certificate actions? Select all that apply"
      >
        <CheckboxGroup
          values={data.certificateActions || []}
          onChange={(values) => updateData({ ...data, certificateActions: values })}
          options={CERTIFICATE_ACTIONS}
        />
      </FormField>

      <FormField
        label="Audit History Summary"
        helpText="Briefly describe your audit history over the past 2-3 years"
      >
        <TextArea
          value={data.auditHistory || ''}
          onChange={(value) => updateData({ ...data, auditHistory: value })}
          placeholder="Summarize audit frequency, common findings, trends, etc."
          rows={3}
        />
      </FormField>

      <FormField
        label="Upcoming Audits"
        helpText="List any scheduled or expected audits in the next 6 months"
      >
        <TextInput
          value={data.upcomingAudits || ''}
          onChange={(value) => updateData({ ...data, upcomingAudits: value })}
          placeholder="e.g., FAA surveillance in Q2, EASA audit in May"
        />
      </FormField>
    </div>
  );
}
