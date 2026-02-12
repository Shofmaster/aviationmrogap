import { SectionProps, FormField, Select, CheckboxGroup, TextInput, TextArea } from './FormComponents';

const AIRCRAFT_CATEGORIES = [
  'Light Jets',
  'Midsize Jets',
  'Heavy Jets',
  'Turboprops',
  'Helicopters',
  'Pistons',
  'Commercial Airliners',
  'Military Aircraft'
];

const SERVICES_OFFERED = [
  'Scheduled Maintenance',
  'Unscheduled Repairs',
  'Modifications & Upgrades',
  'Avionics Installation',
  'Interior Refurbishment',
  'Paint & Exterior',
  'Engine Overhaul',
  'Component Overhaul',
  'NDT Services',
  'Aircraft Storage',
  'Pre-Buy Inspections'
];

const MECHANIC_COUNT_OPTIONS = [
  { value: '1-5', label: '1–5 Mechanics' },
  { value: '6-15', label: '6–15 Mechanics' },
  { value: '16-30', label: '16–30 Mechanics' },
  { value: '31-50', label: '31–50 Mechanics' },
  { value: '51-100', label: '51–100 Mechanics' },
  { value: '100+', label: '100+ Mechanics' },
];

const SPECIAL_CAPABILITIES = [
  'AOG Support',
  'Mobile Repair Teams',
  '24/7 Operations',
  'Composite Repair',
  'Advanced NDT',
  'Engineering Services',
  'FAA DER Services'
];

export default function AircraftServicesSection({ data, updateData }: SectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        label="Aircraft Categories Serviced"
        helpText="Select all categories you service"
      >
        <CheckboxGroup
          values={data.aircraftCategories || []}
          onChange={(values) => updateData({ ...data, aircraftCategories: values })}
          options={AIRCRAFT_CATEGORIES}
        />
      </FormField>

      <FormField
        label="Specific Aircraft Types"
        helpText="List specific makes/models (e.g., G650, Citation X, King Air 350)"
      >
        <TextArea
          value={data.specificAircraftTypes || ''}
          onChange={(value) => updateData({ ...data, specificAircraftTypes: value })}
          placeholder="Enter specific aircraft types..."
          rows={3}
        />
      </FormField>

      <FormField
        label="Services Offered"
        helpText="Select all services you provide"
      >
        <CheckboxGroup
          values={data.servicesOffered || []}
          onChange={(values) => updateData({ ...data, servicesOffered: values })}
          options={SERVICES_OFFERED}
        />
      </FormField>

      <FormField
        label="Number of Mechanics"
        helpText="Select the range that best describes your workforce size"
      >
        <Select
          value={data.mechanicCount || ''}
          onChange={(value) => updateData({ ...data, mechanicCount: value })}
          options={MECHANIC_COUNT_OPTIONS}
          placeholder="Select mechanic count range"
        />
      </FormField>

      <FormField
        label="Hangar Capabilities"
        helpText="Describe your hangar facilities, capacity, and any special infrastructure"
      >
        <TextArea
          value={data.hangarCapabilities || ''}
          onChange={(value) => updateData({ ...data, hangarCapabilities: value })}
          placeholder="e.g., 2 hangars, 30,000 sq ft total, can accommodate up to Gulfstream G650..."
          rows={3}
        />
      </FormField>

      <FormField
        label="OEM Authorizations"
        helpText="List any OEM service center authorizations"
      >
        <TextInput
          value={data.oemAuthorizations?.join(', ') || ''}
          onChange={(value) => updateData({ ...data, oemAuthorizations: value.split(',').map(s => s.trim()) })}
          placeholder="e.g., Gulfstream, Bombardier, Textron"
        />
      </FormField>

      <FormField
        label="Special Capabilities"
        helpText="Select all that apply"
      >
        <CheckboxGroup
          values={data.specialCapabilities || []}
          onChange={(values) => updateData({ ...data, specialCapabilities: values })}
          options={SPECIAL_CAPABILITIES}
        />
      </FormField>
    </div>
  );
}
