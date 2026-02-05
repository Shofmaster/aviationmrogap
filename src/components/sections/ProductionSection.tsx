import { SectionProps, FormField, CheckboxGroup, Select, TextInput } from './FormComponents';

const WORK_ORDER_SYSTEMS = [
  { value: 'Computerized MRO System', label: 'Computerized MRO System' },
  { value: 'ERP System', label: 'ERP System' },
  { value: 'Spreadsheet', label: 'Spreadsheet/Excel' },
  { value: 'Paper Based', label: 'Paper Based' },
  { value: 'Hybrid', label: 'Hybrid System' },
];

const SCHEDULE_ADHERENCE = [
  { value: '90-100%', label: '90-100% On-Time' },
  { value: '75-89%', label: '75-89% On-Time' },
  { value: '60-74%', label: '60-74% On-Time' },
  { value: 'Below 60%', label: 'Below 60% On-Time' },
  { value: 'Unknown', label: 'Unknown' },
];

const BOTTLENECK_OPTIONS = [
  'Parts Availability',
  'Inspection Delays',
  'Engineering Support',
  'Technician Availability',
  'Tooling/Equipment',
  'Customer Approvals',
  'Documentation',
  'Third-Party Vendors',
  'None Identified'
];

const WIP_VISIBILITY = [
  { value: 'Real-time Dashboard', label: 'Real-time Dashboard' },
  { value: 'Daily Reports', label: 'Daily Reports' },
  { value: 'Manual Updates', label: 'Manual Updates' },
  { value: 'Weekly Reviews', label: 'Weekly Reviews' },
  { value: 'Poor Visibility', label: 'Poor Visibility' },
];

const CAPACITY_UTILIZATION = [
  { value: '90-100%', label: '90-100% Utilized' },
  { value: '75-89%', label: '75-89% Utilized' },
  { value: '60-74%', label: '60-74% Utilized' },
  { value: 'Below 60%', label: 'Below 60% Utilized' },
  { value: 'Over Capacity', label: 'Over Capacity' },
];

const PLANNING_METHODS = [
  { value: 'Formal Scheduling System', label: 'Formal Scheduling System' },
  { value: 'Weekly Planning Meetings', label: 'Weekly Planning Meetings' },
  { value: 'Whiteboard/Manual', label: 'Whiteboard/Manual' },
  { value: 'First Come First Served', label: 'First Come, First Served' },
  { value: 'Ad Hoc', label: 'Ad Hoc/No Formal Process' },
];

export default function ProductionSection({ data, updateData }: SectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        label="Work Order System"
        helpText="How do you manage work orders and job tracking?"
      >
        <Select
          value={data.workOrderSystem || ''}
          onChange={(value) => updateData({ ...data, workOrderSystem: value })}
          options={WORK_ORDER_SYSTEMS}
          placeholder="Select work order system"
        />
      </FormField>

      <FormField
        label="Schedule Adherence"
        helpText="What percentage of jobs are completed on schedule?"
      >
        <Select
          value={data.scheduleAdherence || ''}
          onChange={(value) => updateData({ ...data, scheduleAdherence: value })}
          options={SCHEDULE_ADHERENCE}
          placeholder="Select adherence rate"
        />
      </FormField>

      <FormField
        label="Production Bottlenecks"
        helpText="What are your primary production bottlenecks? Select all that apply"
      >
        <CheckboxGroup
          values={data.productionBottlenecks || []}
          onChange={(values) => updateData({ ...data, productionBottlenecks: values })}
          options={BOTTLENECK_OPTIONS}
        />
      </FormField>

      <FormField
        label="Work-in-Progress Visibility"
        helpText="How do you track work-in-progress status?"
      >
        <Select
          value={data.wipVisibility || ''}
          onChange={(value) => updateData({ ...data, wipVisibility: value })}
          options={WIP_VISIBILITY}
          placeholder="Select visibility method"
        />
      </FormField>

      <div className="border-t border-white/10 pt-6 mt-6">
        <h3 className="text-lg font-semibold mb-4 text-sky-blue">Typical Turnaround Times</h3>

        <div className="grid md:grid-cols-3 gap-6">
          <FormField label="Routine Inspection (Days)">
            <TextInput
              value={data.routineInspectionDays || ''}
              onChange={(value) => updateData({ ...data, routineInspectionDays: value })}
              placeholder="e.g., 3-5"
            />
          </FormField>

          <FormField label="Typical Repair (Days)">
            <TextInput
              value={data.typicalRepairDays || ''}
              onChange={(value) => updateData({ ...data, typicalRepairDays: value })}
              placeholder="e.g., 7-10"
            />
          </FormField>

          <FormField label="Major Overhaul (Days)">
            <TextInput
              value={data.majorOverhaulDays || ''}
              onChange={(value) => updateData({ ...data, majorOverhaulDays: value })}
              placeholder="e.g., 30-45"
            />
          </FormField>
        </div>
      </div>

      <FormField
        label="Capacity Utilization"
        helpText="What is your current capacity utilization?"
      >
        <Select
          value={data.capacityUtilization || ''}
          onChange={(value) => updateData({ ...data, capacityUtilization: value })}
          options={CAPACITY_UTILIZATION}
          placeholder="Select utilization"
        />
      </FormField>

      <FormField
        label="Production Planning Method"
        helpText="How do you plan and schedule production?"
      >
        <Select
          value={data.productionPlanning || ''}
          onChange={(value) => updateData({ ...data, productionPlanning: value })}
          options={PLANNING_METHODS}
          placeholder="Select planning method"
        />
      </FormField>
    </div>
  );
}
