import { SectionProps, FormField, CheckboxGroup, Select } from './FormComponents';

const YES_NO_OPTIONS = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
  { value: 'In Development', label: 'In Development' },
];

const SMS_PROGRAMS = [
  { value: 'IS-BAO', label: 'IS-BAO' },
  { value: 'FAA SMS', label: 'FAA SMS' },
  { value: 'ICAO SMS', label: 'ICAO SMS' },
  { value: 'Custom Program', label: 'Custom Program' },
  { value: 'None', label: 'None' },
  { value: 'N/A', label: 'Not Applicable' },
];

const MATURITY_LEVELS = [
  { value: 'Level 4 - Continual Improvement', label: 'Level 4 - Continual Improvement' },
  { value: 'Level 3 - Proactive', label: 'Level 3 - Proactive' },
  { value: 'Level 2 - Reactive', label: 'Level 2 - Reactive' },
  { value: 'Level 1 - Pathological', label: 'Level 1 - Pathological' },
  { value: 'Unknown', label: 'Unknown' },
  { value: 'N/A', label: 'Not Applicable' },
];

const CHALLENGE_OPTIONS = [
  'Staff Buy-in',
  'Resource Constraints',
  'Data Collection',
  'Hazard Identification',
  'Risk Assessment',
  'Documentation',
  'Management Commitment',
  'Training',
  'None'
];

export default function SMSSection({ data, updateData }: SectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        label="Safety Management System (SMS)"
        helpText="Do you have a formal Safety Management System?"
      >
        <Select
          value={data.hasSMS || ''}
          onChange={(value) => updateData({ ...data, hasSMS: value })}
          options={YES_NO_OPTIONS}
          placeholder="Select option"
        />
      </FormField>

      <FormField
        label="SMS Program Type"
        helpText="If yes, which SMS program/standard do you follow?"
      >
        <Select
          value={data.smsProgram || ''}
          onChange={(value) => updateData({ ...data, smsProgram: value })}
          options={SMS_PROGRAMS}
          placeholder="Select SMS program"
        />
      </FormField>

      <FormField
        label="SMS Maturity Level"
        helpText="What is your organization's SMS maturity level?"
      >
        <Select
          value={data.smsMaturity || ''}
          onChange={(value) => updateData({ ...data, smsMaturity: value })}
          options={MATURITY_LEVELS}
          placeholder="Select maturity level"
        />
      </FormField>

      <FormField
        label="SMS Challenges"
        helpText="What challenges do you face with SMS implementation or maintenance?"
      >
        <CheckboxGroup
          values={data.challenges || []}
          onChange={(values) => updateData({ ...data, challenges: values })}
          options={CHALLENGE_OPTIONS}
        />
      </FormField>
    </div>
  );
}
