import { SectionProps, FormField, Select } from './FormComponents';

const INVENTORY_METHODS = [
  { value: 'Computerized System', label: 'Computerized Inventory System' },
  { value: 'Spreadsheet', label: 'Spreadsheet/Excel' },
  { value: 'Manual/Paper', label: 'Manual/Paper Based' },
  { value: 'Hybrid', label: 'Hybrid System' },
  { value: 'None', label: 'No Formal System' },
];

const TRACKING_SYSTEMS = [
  { value: 'Barcode', label: 'Barcode System' },
  { value: 'RFID', label: 'RFID System' },
  { value: 'Serial Number', label: 'Serial Number Tracking' },
  { value: 'Manual', label: 'Manual Tracking' },
  { value: 'None', label: 'No Tracking' },
];

const ACCURACY_LEVELS = [
  { value: '95-100%', label: '95-100% Accurate' },
  { value: '85-94%', label: '85-94% Accurate' },
  { value: '75-84%', label: '75-84% Accurate' },
  { value: 'Below 75%', label: 'Below 75% Accurate' },
  { value: 'Unknown', label: 'Unknown' },
];

const YES_NO_OPTIONS = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
  { value: 'Partially', label: 'Partially' },
];

export default function PartsInventorySection({ data, updateData }: SectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        label="Parts Inventory Method"
        helpText="How do you manage your parts inventory?"
      >
        <Select
          value={data.partsInventoryMethod || ''}
          onChange={(value) => updateData({ ...data, partsInventoryMethod: value })}
          options={INVENTORY_METHODS}
          placeholder="Select inventory method"
        />
      </FormField>

      <FormField
        label="Parts Tracking System"
        helpText="What system do you use to track parts?"
      >
        <Select
          value={data.partsTrackingSystem || ''}
          onChange={(value) => updateData({ ...data, partsTrackingSystem: value })}
          options={TRACKING_SYSTEMS}
          placeholder="Select tracking system"
        />
      </FormField>

      <FormField
        label="Inventory Accuracy"
        helpText="What is your estimated inventory accuracy rate?"
      >
        <Select
          value={data.inventoryAccuracy || ''}
          onChange={(value) => updateData({ ...data, inventoryAccuracy: value })}
          options={ACCURACY_LEVELS}
          placeholder="Select accuracy level"
        />
      </FormField>

      <FormField
        label="Shelf Life Tracking"
        helpText="Do you track shelf life and expiration dates for parts?"
      >
        <Select
          value={data.shelfLifeTracking || ''}
          onChange={(value) => updateData({ ...data, shelfLifeTracking: value })}
          options={YES_NO_OPTIONS}
          placeholder="Select option"
        />
      </FormField>
    </div>
  );
}
