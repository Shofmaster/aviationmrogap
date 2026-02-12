import { SectionProps, FormField, Select, TextInput, MultiSelectDropdown } from './FormComponents';

const TRAINING_PROGRAMS = [
  // FAA / Regulatory Programs
  { value: 'FAA Part 147 A&P School', label: 'FAA Part 147 A&P School' },
  { value: 'FAA Part 65 IA Training', label: 'FAA Part 65 IA Authorization Training' },
  { value: 'FAA AMT Awards Program', label: 'FAA AMT Awards / PACE Program' },
  { value: 'FAA Safety Team (FAASTeam)', label: 'FAA Safety Team (FAASTeam)' },
  // EASA Programs
  { value: 'EASA Part 66 Type Training', label: 'EASA Part 66 Type Training' },
  { value: 'EASA Part 145 Continuation Training', label: 'EASA Part 145 Continuation Training' },
  // OEM Training Programs
  { value: 'Boeing OEM Training', label: 'Boeing OEM Training' },
  { value: 'Airbus OEM Training', label: 'Airbus OEM Training' },
  { value: 'Bombardier OEM Training', label: 'Bombardier OEM Training' },
  { value: 'Embraer OEM Training', label: 'Embraer OEM Training' },
  { value: 'Gulfstream OEM Training', label: 'Gulfstream OEM Training' },
  { value: 'Dassault OEM Training', label: 'Dassault OEM Training' },
  { value: 'Textron Aviation OEM Training', label: 'Textron Aviation (Cessna/Beechcraft) OEM Training' },
  { value: 'Pratt & Whitney Engine Training', label: 'Pratt & Whitney Engine Training' },
  { value: 'GE Aviation Engine Training', label: 'GE Aviation Engine Training' },
  { value: 'Rolls-Royce Engine Training', label: 'Rolls-Royce Engine Training' },
  { value: 'Honeywell Training', label: 'Honeywell Aerospace Training' },
  { value: 'Collins Aerospace Training', label: 'Collins Aerospace Training' },
  // Industry Training Providers
  { value: 'FlightSafety International', label: 'FlightSafety International' },
  { value: 'CAE Training', label: 'CAE Training' },
  { value: 'AOPA Training', label: 'AOPA Training Programs' },
  { value: 'ARSA Training', label: 'ARSA (Aeronautical Repair Station Association) Training' },
  { value: 'SAE International Training', label: 'SAE International Training' },
  { value: 'ATA/ATEC Training', label: 'ATA/ATEC (Aviation Technician Education Council)' },
  // Quality & Standards Training
  { value: 'AS9100 / AS9110 Training', label: 'AS9100 / AS9110 Quality System Training' },
  { value: 'ISO 9001 Training', label: 'ISO 9001 Quality Management Training' },
  { value: 'Human Factors / MRM Training', label: 'Human Factors / MRM (Maintenance Resource Management)' },
  { value: 'SMS Training', label: 'Safety Management System (SMS) Training' },
  { value: 'OSHA Safety Training', label: 'OSHA Safety Training' },
  { value: 'Hazmat / DG Training', label: 'Hazmat / Dangerous Goods Training' },
  { value: 'NDT / NDE Training', label: 'NDT / NDE (Non-Destructive Testing) Training' },
  { value: 'Lean / Six Sigma Training', label: 'Lean / Six Sigma Training' },
  // Specialized / Other
  { value: 'Avionics Systems Training', label: 'Avionics Systems Training' },
  { value: 'Composites Repair Training', label: 'Composites Repair Training' },
  { value: 'Corrosion Prevention Training', label: 'Corrosion Prevention & Control Training' },
  { value: 'Fuel Tank Safety (CDCCL) Training', label: 'Fuel Tank Safety (CDCCL) Training' },
  { value: 'EWIS Training', label: 'EWIS (Electrical Wiring Interconnection System) Training' },
  { value: 'RII Training', label: 'RII (Required Inspection Items) Training' },
  { value: 'ESD Training', label: 'ESD (Electrostatic Discharge) Training' },
  { value: 'FOD Prevention Training', label: 'FOD Prevention Training' },
  { value: 'In-House / Proprietary Program', label: 'In-House / Proprietary Program' },
];

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
        label="Training Programs Used"
        helpText="Select all training programs your organization participates in"
      >
        <MultiSelectDropdown
          values={data.trainingPrograms || []}
          onChange={(values) => updateData({ ...data, trainingPrograms: values })}
          options={TRAINING_PROGRAMS}
          placeholder="Select training programs"
        />
      </FormField>

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
