import { SectionProps, FormField, CheckboxGroup, Select } from './FormComponents';

const CERTIFICATION_OPTIONS = [
  'FAA Part 145',
  'EASA Part 145',
  'CAAC',
  'TCCA',
  'AS9100',
  'IS-BAO',
  'ISO 9001',
  'None'
];

const AS9100_REVISIONS = [
  { value: 'Rev D', label: 'Revision D' },
  { value: 'Rev C', label: 'Revision C' },
  { value: 'N/A', label: 'Not Applicable' },
];

const ARGUS_LEVELS = [
  { value: 'Platinum', label: 'Platinum' },
  { value: 'Gold', label: 'Gold' },
  { value: 'Gold Plus', label: 'Gold Plus' },
  { value: 'Silver', label: 'Silver' },
  { value: 'N/A', label: 'Not Applicable' },
];

export default function CertificationsSection({ data, updateData }: SectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        label="Current Certifications & Standards"
        helpText="Select all that apply to your organization"
      >
        <CheckboxGroup
          values={data.certifications || []}
          onChange={(values) => updateData({ ...data, certifications: values })}
          options={CERTIFICATION_OPTIONS}
        />
      </FormField>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField label="AS9100 Revision" helpText="If applicable">
          <Select
            value={data.as9100Rev || ''}
            onChange={(value) => updateData({ ...data, as9100Rev: value })}
            options={AS9100_REVISIONS}
            placeholder="Select AS9100 revision"
          />
        </FormField>

        <FormField label="ARGUS Audit Level" helpText="If applicable">
          <Select
            value={data.argusLevel || ''}
            onChange={(value) => updateData({ ...data, argusLevel: value })}
            options={ARGUS_LEVELS}
            placeholder="Select ARGUS level"
          />
        </FormField>
      </div>
    </div>
  );
}
