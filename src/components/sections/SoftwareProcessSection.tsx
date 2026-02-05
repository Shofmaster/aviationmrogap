import { SectionProps, FormField, TextInput, Select } from './FormComponents';

const SATISFACTION_LEVELS = [
  { value: 'Very Satisfied', label: 'Very Satisfied' },
  { value: 'Satisfied', label: 'Satisfied' },
  { value: 'Neutral', label: 'Neutral' },
  { value: 'Dissatisfied', label: 'Dissatisfied' },
  { value: 'Very Dissatisfied', label: 'Very Dissatisfied' },
];

const YES_NO_OPTIONS = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
  { value: 'Partially', label: 'Partially' },
];

const EFFECTIVENESS_LEVELS = [
  { value: 'Very Effective', label: 'Very Effective' },
  { value: 'Effective', label: 'Effective' },
  { value: 'Somewhat Effective', label: 'Somewhat Effective' },
  { value: 'Not Effective', label: 'Not Effective' },
  { value: 'Unknown', label: 'Unknown' },
];

export default function SoftwareProcessSection({ data, updateData }: SectionProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-6">
        <h3 className="text-lg font-semibold mb-4 text-sky-blue">Software & Tracking Systems</h3>

        <FormField
          label="Maintenance Tracking Software"
          helpText="What system do you use for tracking maintenance activities?"
        >
          <TextInput
            value={data.maintenanceTrackingSoftware || ''}
            onChange={(value) => updateData({ ...data, maintenanceTrackingSoftware: value })}
            placeholder="e.g., CORRIDOR, ENVISION, Camp Systems, Excel, etc."
          />
        </FormField>

        <FormField
          label="Software Satisfaction"
          helpText="How satisfied are you with your current tracking software?"
        >
          <Select
            value={data.softwareSatisfaction || ''}
            onChange={(value) => updateData({ ...data, softwareSatisfaction: value })}
            options={SATISFACTION_LEVELS}
            placeholder="Select satisfaction level"
          />
        </FormField>
      </div>

      <div className="border-t border-white/10 pt-6">
        <h3 className="text-lg font-semibold mb-4 text-sky-blue">Process Management</h3>

        <FormField
          label="Defined Maintenance Processes"
          helpText="Do you have clearly defined maintenance processes?"
        >
          <Select
            value={data.hasDefinedProcess || ''}
            onChange={(value) => updateData({ ...data, hasDefinedProcess: value })}
            options={YES_NO_OPTIONS}
            placeholder="Select option"
          />
        </FormField>

        <FormField
          label="Process Documentation"
          helpText="Are your processes documented (procedures, work instructions)?"
        >
          <Select
            value={data.processDocumented || ''}
            onChange={(value) => updateData({ ...data, processDocumented: value })}
            options={YES_NO_OPTIONS}
            placeholder="Select option"
          />
        </FormField>

        <FormField
          label="Process Adherence"
          helpText="Are documented processes consistently followed by staff?"
        >
          <Select
            value={data.processFollowed || ''}
            onChange={(value) => updateData({ ...data, processFollowed: value })}
            options={YES_NO_OPTIONS}
            placeholder="Select option"
          />
        </FormField>

        <FormField
          label="Process Effectiveness"
          helpText="How effective are your current processes?"
        >
          <Select
            value={data.processEffectiveness || ''}
            onChange={(value) => updateData({ ...data, processEffectiveness: value })}
            options={EFFECTIVENESS_LEVELS}
            placeholder="Select effectiveness level"
          />
        </FormField>
      </div>
    </div>
  );
}
