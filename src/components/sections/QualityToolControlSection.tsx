import { SectionProps, FormField, CheckboxGroup, Select, TextArea } from './FormComponents';

const QUALITY_METHODOLOGIES = [
  'Six Sigma',
  'Lean Manufacturing',
  '5S',
  'Kaizen',
  'Root Cause Analysis',
  'Statistical Process Control',
  'Total Quality Management',
  'None'
];

const YES_NO_OPTIONS = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
  { value: 'In Development', label: 'In Development' },
];

const TOOL_CONTROL_METHODS = [
  { value: 'Shadow Boards', label: 'Shadow Boards' },
  { value: 'Tool Cribs', label: 'Tool Cribs with Check-out System' },
  { value: 'Barcode System', label: 'Barcode/RFID System' },
  { value: 'Manual Tracking', label: 'Manual Tracking' },
  { value: 'None', label: 'No Formal System' },
];

const ERROR_FREQUENCIES = [
  { value: 'Never', label: 'Never' },
  { value: 'Rarely', label: 'Rarely (1-2 times/year)' },
  { value: 'Occasionally', label: 'Occasionally (quarterly)' },
  { value: 'Frequently', label: 'Frequently (monthly)' },
  { value: 'Very Frequently', label: 'Very Frequently (weekly or more)' },
];

export default function QualityToolControlSection({ data, updateData }: SectionProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-6">
        <h3 className="text-lg font-semibold mb-4 text-sky-blue">Quality Systems</h3>

        <FormField
          label="Quality Methodologies Used"
          helpText="Select all quality improvement methodologies you currently use"
        >
          <CheckboxGroup
            values={data.qualityMethodologies || []}
            onChange={(values) => updateData({ ...data, qualityMethodologies: values })}
            options={QUALITY_METHODOLOGIES}
          />
        </FormField>

        <FormField
          label="Continuous Improvement Program"
          helpText="Do you have an active continuous improvement program?"
        >
          <Select
            value={data.continuousImprovementActive || ''}
            onChange={(value) => updateData({ ...data, continuousImprovementActive: value })}
            options={YES_NO_OPTIONS}
            placeholder="Select option"
          />
        </FormField>
      </div>

      <div className="border-t border-white/10 pt-6">
        <h3 className="text-lg font-semibold mb-4 text-sky-blue">Tool Control</h3>

        <FormField
          label="Tool Control Method"
          helpText="How do you control and track tools?"
        >
          <Select
            value={data.toolControlMethod || ''}
            onChange={(value) => updateData({ ...data, toolControlMethod: value })}
            options={TOOL_CONTROL_METHODS}
            placeholder="Select tool control method"
          />
        </FormField>

        <FormField
          label="Tool Control Description"
          helpText="Describe your tool control procedures and processes"
        >
          <TextArea
            value={data.toolControlDescription || ''}
            onChange={(value) => updateData({ ...data, toolControlDescription: value })}
            placeholder="Describe your tool control system, procedures for missing tools, etc."
            rows={3}
          />
        </FormField>

        <FormField
          label="Tool Control Errors"
          helpText="Have you experienced missing/lost tool incidents?"
        >
          <Select
            value={data.toolControlErrors || ''}
            onChange={(value) => updateData({ ...data, toolControlErrors: value })}
            options={YES_NO_OPTIONS}
            placeholder="Select option"
          />
        </FormField>

        <FormField
          label="Error Frequency"
          helpText="If yes, how often do tool control errors occur?"
        >
          <Select
            value={data.toolControlErrorFrequency || ''}
            onChange={(value) => updateData({ ...data, toolControlErrorFrequency: value })}
            options={ERROR_FREQUENCIES}
            placeholder="Select frequency"
          />
        </FormField>
      </div>
    </div>
  );
}
