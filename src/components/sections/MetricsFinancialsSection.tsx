import { SectionProps, FormField, TextInput, TextArea } from './FormComponents';

export default function MetricsFinancialsSection({ data, updateData }: SectionProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-6">
        <h3 className="text-lg font-semibold mb-4 text-sky-blue">Quality Metrics</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            label="First Pass Rate (%)"
            helpText="Percentage of work completed correctly the first time"
          >
            <TextInput
              value={data.firstPassRate || ''}
              onChange={(value) => updateData({ ...data, firstPassRate: value })}
              placeholder="e.g., 85%, 90-95%, Unknown"
            />
          </FormField>

          <FormField
            label="Warranty Rate (%)"
            helpText="Percentage of jobs with warranty claims"
          >
            <TextInput
              value={data.warrantyRate || ''}
              onChange={(value) => updateData({ ...data, warrantyRate: value })}
              placeholder="e.g., 2%, 5-7%, Unknown"
            />
          </FormField>

          <FormField
            label="Repeat Maintenance Rate (%)"
            helpText="Percentage of aircraft returning for same issue"
          >
            <TextInput
              value={data.repeatMaintenanceRate || ''}
              onChange={(value) => updateData({ ...data, repeatMaintenanceRate: value })}
              placeholder="e.g., 3%, 8-10%, Unknown"
            />
          </FormField>

          <FormField
            label="Rework Rate (%)"
            helpText="Percentage of work requiring rework"
          >
            <TextInput
              value={data.reworkRate || ''}
              onChange={(value) => updateData({ ...data, reworkRate: value })}
              placeholder="e.g., 5%, 10-15%, Unknown"
            />
          </FormField>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6">
        <h3 className="text-lg font-semibold mb-4 text-sky-blue">Financial Metrics</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            label="Average Job Margin (%)"
            helpText="Average profit margin on maintenance jobs"
          >
            <TextInput
              value={data.jobMargin || ''}
              onChange={(value) => updateData({ ...data, jobMargin: value })}
              placeholder="e.g., 15%, 20-25%, Unknown"
            />
          </FormField>

          <FormField
            label="Revenue per Technician"
            helpText="Annual revenue generated per technician"
          >
            <TextInput
              value={data.revenuePerTech || ''}
              onChange={(value) => updateData({ ...data, revenuePerTech: value })}
              placeholder="e.g., $200K, $250-300K, Unknown"
            />
          </FormField>

          <FormField
            label="Scrap & Rework Cost (% of Revenue)"
            helpText="Annual cost of scrap and rework as percentage of revenue"
          >
            <TextInput
              value={data.scrapReworkCost || ''}
              onChange={(value) => updateData({ ...data, scrapReworkCost: value })}
              placeholder="e.g., 2%, 5-7%, Unknown"
            />
          </FormField>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6">
        <h3 className="text-lg font-semibold mb-4 text-sky-blue">Wait Times & Delays</h3>

        <div className="grid md:grid-cols-3 gap-6">
          <FormField
            label="Parts Wait Time (Days)"
            helpText="Average time waiting for parts"
          >
            <TextInput
              value={data.partsWaitDays || ''}
              onChange={(value) => updateData({ ...data, partsWaitDays: value })}
              placeholder="e.g., 2-3 days"
            />
          </FormField>

          <FormField
            label="Inspection Wait (Hours)"
            helpText="Average time waiting for inspection"
          >
            <TextInput
              value={data.inspectionWaitHours || ''}
              onChange={(value) => updateData({ ...data, inspectionWaitHours: value })}
              placeholder="e.g., 4-6 hours"
            />
          </FormField>

          <FormField
            label="Approval Turnaround (Days)"
            helpText="Average time for customer approvals"
          >
            <TextInput
              value={data.approvalTurnaroundDays || ''}
              onChange={(value) => updateData({ ...data, approvalTurnaroundDays: value })}
              placeholder="e.g., 1-2 days"
            />
          </FormField>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6">
        <h3 className="text-lg font-semibold mb-4 text-sky-blue">Other Metrics</h3>

        <FormField
          label="Employee Turnover Rate (%)"
          helpText="Annual employee turnover percentage"
        >
          <TextInput
            value={data.turnoverRate || ''}
            onChange={(value) => updateData({ ...data, turnoverRate: value })}
            placeholder="e.g., 10%, 15-20%, Unknown"
          />
        </FormField>

        <FormField
          label="Specific Concerns or Additional Information"
          helpText="Any other metrics, concerns, or information you'd like to share"
        >
          <TextArea
            value={data.specificConcerns || ''}
            onChange={(value) => updateData({ ...data, specificConcerns: value })}
            placeholder="Share any additional concerns, goals, or information that would help us understand your operation..."
            rows={4}
          />
        </FormField>
      </div>
    </div>
  );
}
