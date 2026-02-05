import { SectionProps, FormField, Select, TextArea } from './FormComponents';

const YES_NO_OPTIONS = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
  { value: 'Partially', label: 'Partially' },
];

const TRACKING_METHODS = [
  { value: 'Computerized System', label: 'Computerized Calibration System' },
  { value: 'Spreadsheet', label: 'Spreadsheet/Excel' },
  { value: 'Calendar Reminders', label: 'Calendar Reminders' },
  { value: 'Manual Log', label: 'Manual Log/Paper' },
  { value: 'None', label: 'No Formal Tracking' },
];

const OVERDUE_STATUS = [
  { value: 'None', label: 'None - All Current' },
  { value: '1-3 Items', label: '1-3 Items Overdue' },
  { value: '4-10 Items', label: '4-10 Items Overdue' },
  { value: 'More than 10', label: 'More than 10 Items Overdue' },
  { value: 'Unknown', label: 'Unknown' },
];

const OOT_FREQUENCIES = [
  { value: 'Never', label: 'Never' },
  { value: 'Rarely', label: 'Rarely (1-2 times/year)' },
  { value: 'Occasionally', label: 'Occasionally (3-4 times/year)' },
  { value: 'Frequently', label: 'Frequently (5+ times/year)' },
  { value: 'Unknown', label: 'Unknown' },
];

export default function CalibrationSection({ data, updateData }: SectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        label="Calibration Program"
        helpText="Do you have a formal calibration program for tools and equipment?"
      >
        <Select
          value={data.calibrationProgram || ''}
          onChange={(value) => updateData({ ...data, calibrationProgram: value })}
          options={YES_NO_OPTIONS}
          placeholder="Select option"
        />
      </FormField>

      <FormField
        label="Calibration Tracking Method"
        helpText="How do you track calibration due dates and status?"
      >
        <Select
          value={data.calibrationTracking || ''}
          onChange={(value) => updateData({ ...data, calibrationTracking: value })}
          options={TRACKING_METHODS}
          placeholder="Select tracking method"
        />
      </FormField>

      <FormField
        label="Overdue Calibrations"
        helpText="How many items currently have overdue calibrations?"
      >
        <Select
          value={data.overdueCalibrations || ''}
          onChange={(value) => updateData({ ...data, overdueCalibrations: value })}
          options={OVERDUE_STATUS}
          placeholder="Select status"
        />
      </FormField>

      <FormField
        label="Out-of-Tolerance Frequency"
        helpText="How often do calibrations come back out-of-tolerance?"
      >
        <Select
          value={data.outOfToleranceFrequency || ''}
          onChange={(value) => updateData({ ...data, outOfToleranceFrequency: value })}
          options={OOT_FREQUENCIES}
          placeholder="Select frequency"
        />
      </FormField>

      <FormField
        label="Out-of-Tolerance Response"
        helpText="What is your process when tools are found out-of-tolerance?"
      >
        <TextArea
          value={data.outOfToleranceResponse || ''}
          onChange={(value) => updateData({ ...data, outOfToleranceResponse: value })}
          placeholder="Describe your process for handling out-of-tolerance findings, impact assessment, etc."
          rows={3}
        />
      </FormField>
    </div>
  );
}
