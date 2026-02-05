import { SectionProps, FormField, TextInput } from './FormComponents';

export default function CompanyInfoSection({ data, updateData }: SectionProps) {
  return (
    <div className="space-y-6">
      <FormField label="Company Name" required>
        <TextInput
          value={data.companyName || ''}
          onChange={(value) => updateData({ ...data, companyName: value })}
          placeholder="Enter your company name"
        />
      </FormField>

      <FormField label="Location (City, State/Country)" required>
        <TextInput
          value={data.location || ''}
          onChange={(value) => updateData({ ...data, location: value })}
          placeholder="e.g., Miami, FL or Paris, France"
        />
      </FormField>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField label="Number of Employees">
          <TextInput
            value={data.employeeCount || ''}
            onChange={(value) => updateData({ ...data, employeeCount: value })}
            placeholder="e.g., 50-100"
          />
        </FormField>

        <FormField label="Annual Revenue (Optional)">
          <TextInput
            value={data.annualRevenue || ''}
            onChange={(value) => updateData({ ...data, annualRevenue: value })}
            placeholder="e.g., $5M-$10M"
          />
        </FormField>
      </div>

      <div className="border-t border-white/10 pt-6 mt-8">
        <h3 className="text-lg font-semibold mb-4 text-sky-blue">Contact Information</h3>

        <FormField label="Contact Name" required>
          <TextInput
            value={data.contactName || ''}
            onChange={(value) => updateData({ ...data, contactName: value })}
            placeholder="Your full name"
          />
        </FormField>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField label="Email" required>
            <TextInput
              type="email"
              value={data.contactEmail || ''}
              onChange={(value) => updateData({ ...data, contactEmail: value })}
              placeholder="your@email.com"
            />
          </FormField>

          <FormField label="Phone Number">
            <TextInput
              type="tel"
              value={data.contactPhone || ''}
              onChange={(value) => updateData({ ...data, contactPhone: value })}
              placeholder="+1 (555) 123-4567"
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}
