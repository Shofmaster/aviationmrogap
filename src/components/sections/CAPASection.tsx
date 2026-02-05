import { SectionProps, FormField, Select } from './FormComponents';

const CAPA_STATUS = [
  { value: 'Fully Implemented', label: 'Fully Implemented & Effective' },
  { value: 'Implemented', label: 'Implemented, Needs Improvement' },
  { value: 'Partially Implemented', label: 'Partially Implemented' },
  { value: 'In Development', label: 'In Development' },
  { value: 'None', label: 'No Formal CAPA System' },
];

const TRACKING_METHODS = [
  { value: 'CAPA Software', label: 'Dedicated CAPA Software' },
  { value: 'Quality Management System', label: 'Quality Management System' },
  { value: 'Spreadsheet', label: 'Spreadsheet/Excel' },
  { value: 'Paper Based', label: 'Paper Based' },
  { value: 'None', label: 'No Formal Tracking' },
];

const CLOSURE_TIMES = [
  { value: 'Under 30 days', label: 'Under 30 days' },
  { value: '30-60 days', label: '30-60 days' },
  { value: '60-90 days', label: '60-90 days' },
  { value: 'Over 90 days', label: 'Over 90 days' },
  { value: 'Varies Widely', label: 'Varies Widely' },
];

const FREQUENCY_OPTIONS = [
  { value: 'Never', label: 'Never/Rarely' },
  { value: 'Occasionally', label: 'Occasionally' },
  { value: 'Frequently', label: 'Frequently' },
  { value: 'Very Frequently', label: 'Very Frequently' },
  { value: 'Unknown', label: 'Unknown' },
];

const AUTHORITY_LEVELS = [
  { value: 'Quality Manager', label: 'Quality Manager' },
  { value: 'Accountable Manager', label: 'Accountable Manager' },
  { value: 'Department Managers', label: 'Department Managers' },
  { value: 'Quality Team', label: 'Quality Team' },
  { value: 'Not Defined', label: 'Not Clearly Defined' },
];

export default function CAPASection({ data, updateData }: SectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        label="CAPA System Status"
        helpText="What is the status of your Corrective and Preventive Action system?"
      >
        <Select
          value={data.capaSystemStatus || ''}
          onChange={(value) => updateData({ ...data, capaSystemStatus: value })}
          options={CAPA_STATUS}
          placeholder="Select CAPA status"
        />
      </FormField>

      <FormField
        label="Discrepancy Tracking"
        helpText="How do you track discrepancies and non-conformances?"
      >
        <Select
          value={data.discrepancyTracking || ''}
          onChange={(value) => updateData({ ...data, discrepancyTracking: value })}
          options={TRACKING_METHODS}
          placeholder="Select tracking method"
        />
      </FormField>

      <FormField
        label="Average CAPA Closure Time"
        helpText="On average, how long does it take to close a CAPA?"
      >
        <Select
          value={data.capaClosureTime || ''}
          onChange={(value) => updateData({ ...data, capaClosureTime: value })}
          options={CLOSURE_TIMES}
          placeholder="Select closure time"
        />
      </FormField>

      <FormField
        label="Repeat Discrepancies"
        helpText="How often do you see the same discrepancies recurring?"
      >
        <Select
          value={data.repeatDiscrepancies || ''}
          onChange={(value) => updateData({ ...data, repeatDiscrepancies: value })}
          options={FREQUENCY_OPTIONS}
          placeholder="Select frequency"
        />
      </FormField>

      <FormField
        label="CAPA Authority"
        helpText="Who has the authority to open and close CAPAs?"
      >
        <Select
          value={data.capaAuthority || ''}
          onChange={(value) => updateData({ ...data, capaAuthority: value })}
          options={AUTHORITY_LEVELS}
          placeholder="Select authority level"
        />
      </FormField>
    </div>
  );
}
