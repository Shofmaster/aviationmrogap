import { SectionProps, FormField, Select, TextInput } from './FormComponents';

const TRAINING_TYPES = [
  { value: 'Formal Program', label: 'Formal Structured Program' },
  { value: 'OJT Only', label: 'On-the-Job Training Only' },
  { value: 'Hybrid', label: 'Hybrid (Formal + OJT)' },
  { value: 'External Training', label: 'External Training Providers' },
  { value: 'Minimal', label: 'Minimal/As Needed' },
];

const TRACKING_METHODS = [
  { value: 'Training Management System', label: 'Training Management System' },
  { value: 'Spreadsheet', label: 'Spreadsheet/Excel' },
  { value: 'Paper Records', label: 'Paper Records' },
  { value: 'Learning Management System', label: 'Learning Management System (LMS)' },
  { value: 'None', label: 'No Formal Tracking' },
];

const VERIFICATION_METHODS = [
  { value: 'Written Tests', label: 'Written Tests' },
  { value: 'Practical Evaluation', label: 'Practical Evaluation' },
  { value: 'Both', label: 'Both Written & Practical' },
  { value: 'Manager Sign-off', label: 'Manager Sign-off Only' },
  { value: 'None', label: 'No Formal Verification' },
];

export default function TrainingSection({ data, updateData }: SectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        label="Training Program Type"
        helpText="What type of training program do you have?"
      >
        <Select
          value={data.trainingProgramType || ''}
          onChange={(value) => updateData({ ...data, trainingProgramType: value })}
          options={TRAINING_TYPES}
          placeholder="Select training type"
        />
      </FormField>

      <FormField
        label="Training Tracking Method"
        helpText="How do you track training completion and currency?"
      >
        <Select
          value={data.trainingTracking || ''}
          onChange={(value) => updateData({ ...data, trainingTracking: value })}
          options={TRACKING_METHODS}
          placeholder="Select tracking method"
        />
      </FormField>

      <FormField
        label="Initial Training Duration"
        helpText="How long is initial training for new technicians?"
      >
        <TextInput
          value={data.initialTrainingDuration || ''}
          onChange={(value) => updateData({ ...data, initialTrainingDuration: value })}
          placeholder="e.g., 2 weeks, 1 month, 90 days"
        />
      </FormField>

      <FormField
        label="Recurrent Training Frequency"
        helpText="How often is recurrent/refresher training conducted?"
      >
        <TextInput
          value={data.recurrentTrainingFrequency || ''}
          onChange={(value) => updateData({ ...data, recurrentTrainingFrequency: value })}
          placeholder="e.g., Annual, Biannual, As needed"
        />
      </FormField>

      <FormField
        label="Competency Verification Method"
        helpText="How do you verify technician competency?"
      >
        <Select
          value={data.competencyVerification || ''}
          onChange={(value) => updateData({ ...data, competencyVerification: value })}
          options={VERIFICATION_METHODS}
          placeholder="Select verification method"
        />
      </FormField>

      <FormField
        label="Time to Competency"
        helpText="On average, how long until a new hire is fully competent?"
      >
        <TextInput
          value={data.timeToCompetency || ''}
          onChange={(value) => updateData({ ...data, timeToCompetency: value })}
          placeholder="e.g., 3 months, 6 months, 1 year"
        />
      </FormField>
    </div>
  );
}
