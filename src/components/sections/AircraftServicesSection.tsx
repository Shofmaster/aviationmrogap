import { SectionProps, FormField, CheckboxGroup, TextInput, TextArea } from './FormComponents';

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
        label="Operations Scope"
        helpText="Describe your operational capabilities and capacity"
      >
        <TextArea
          value={data.operationsScope || ''}
          onChange={(value) => updateData({ ...data, operationsScope: value })}
          placeholder="e.g., 5 hangars, 20 technicians, can handle up to 10 aircraft simultaneously..."
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
