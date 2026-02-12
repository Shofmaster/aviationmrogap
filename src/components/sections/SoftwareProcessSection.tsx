import { SectionProps, FormField, MultiSelectDropdown, Select } from './FormComponents';

const MRO_SOFTWARE_OPTIONS = [
  { value: 'CORRIDOR', label: 'CORRIDOR' },
  { value: 'CAMP Systems', label: 'CAMP Systems' },
  { value: 'Traxxall', label: 'Traxxall' },
  { value: 'ENVISION', label: 'ENVISION' },
  { value: 'Quantum MX', label: 'Quantum MX' },
  { value: 'Ramco Aviation', label: 'Ramco Aviation' },
  { value: 'Swiss AviationSoftware AMOS', label: 'Swiss AviationSoftware AMOS' },
  { value: 'Rusada ENVISION', label: 'Rusada ENVISION' },
  { value: 'Maintenix', label: 'Maintenix' },
  { value: 'AvSight', label: 'AvSight' },
  { value: 'Flightdocs', label: 'Flightdocs' },
  { value: 'ATP Aviation Hub', label: 'ATP Aviation Hub' },
  { value: 'WinAir', label: 'WinAir' },
  { value: 'EmpowerMX', label: 'EmpowerMX' },
  { value: 'Aircraft Maintenance Systems (AMS)', label: 'Aircraft Maintenance Systems (AMS)' },
  { value: 'QAV', label: 'QAV' },
  { value: 'Excel / Spreadsheets', label: 'Excel / Spreadsheets' },
  { value: 'Paper-Based', label: 'Paper-Based' },
  { value: 'Custom / In-House', label: 'Custom / In-House' },
  { value: 'None', label: 'None' },
];

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
          helpText="Select all software systems you use for tracking maintenance activities."
        >
          <MultiSelectDropdown
            values={data.maintenanceTrackingSoftware || []}
            onChange={(values) => updateData({ ...data, maintenanceTrackingSoftware: values })}
            options={MRO_SOFTWARE_OPTIONS}
            placeholder="Select software systems..."
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
