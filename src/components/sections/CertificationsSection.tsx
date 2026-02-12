import { SectionProps, FormField, GroupedCheckboxGroup, Select } from './FormComponents';
import type { CheckboxGroupItem } from './FormComponents';

const CERTIFICATION_GROUPS: CheckboxGroupItem[] = [
  {
    group: 'FAA Regulatory',
    options: [
      'FAA Part 145',
      'FAA Part 121',
      'FAA Part 135',
      'FAA Part 91',
      'FAA Part 43',
      'FAA Part 21',
      'FAA Part 147',
      'FAA DER/DAR',
      'FAA TSOA',
      'FAA PMA',
    ],
  },
  {
    group: 'EASA Regulatory',
    options: [
      'EASA Part 145',
      'EASA Part M',
      'EASA Part 147',
      'EASA Part 21',
      'EASA Part 66',
    ],
  },
  {
    group: 'International Civil Aviation Authorities',
    options: [
      'TCCA CAR 573 (AMO)',
      'TCCA CAR 561',
      'ANAC (Brazil)',
      'CAAC (China)',
      'DGCA (India)',
      'JCAB (Japan)',
      'CASA (Australia)',
      'CAA (UK)',
      'GCAA (UAE)',
      'GACA (Saudi Arabia)',
      'SACAA (South Africa)',
      'CAAS (Singapore)',
    ],
  },
  {
    group: 'Quality Management Standards',
    options: [
      'AS9100',
      'AS9110',
      'AS9120',
      'ISO 9001',
      'ISO 14001',
      'ISO 45001',
      'ISO 17025',
      'Nadcap',
    ],
  },
  {
    group: 'Safety & Audit Programs',
    options: [
      'IS-BAO',
      'IOSA (IATA)',
      'ISAGO (IATA)',
      'Wyvern Wingman',
      'ARGUS',
      'IBAC IS-BAH',
      'ICAO Annex 19 SMS',
      'CAA SMS Approval',
    ],
  },
  {
    group: 'Military & Government',
    options: [
      'DCMA (Defense Contract Mgmt)',
      'NATO AQAP',
      'AC 00-56B (VASIP)',
    ],
  },
  {
    group: 'Industry / Supply Chain Standards',
    options: [
      'CASE (Coordinating Agency for Supplier Evaluation)',
      'SAE AS6081 (Counterfeit Parts)',
      'SAE AS6171 (Test Methods - Counterfeit)',
      'ATA Spec 106 (eCommerce)',
      'ATA iSpec 2200',
    ],
  },
  {
    group: 'Other',
    options: ['None'],
  },
];

const AS9100_REVISIONS = [
  { value: 'Rev D', label: 'Revision D (Current)' },
  { value: 'Rev C', label: 'Revision C' },
  { value: 'N/A', label: 'Not Applicable' },
];

const ARGUS_LEVELS = [
  { value: 'Platinum', label: 'Platinum' },
  { value: 'Gold', label: 'Gold' },
  { value: 'Gold Plus', label: 'Gold Plus' },
  { value: 'Silver', label: 'Silver' },
  { value: 'N/A', label: 'Not Applicable' },
];

const ISBAO_STAGES = [
  { value: 'Stage 1', label: 'Stage 1 - Foundation' },
  { value: 'Stage 2', label: 'Stage 2 - Implementation' },
  { value: 'Stage 3', label: 'Stage 3 - Continual Improvement' },
  { value: 'N/A', label: 'Not Applicable' },
];

const WYVERN_LEVELS = [
  { value: 'Wingman', label: 'Wingman' },
  { value: 'Registered', label: 'Registered' },
  { value: 'N/A', label: 'Not Applicable' },
];

export default function CertificationsSection({ data, updateData }: SectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        label="Current Certifications & Standards"
        helpText="Select all that apply to your organization"
      >
        <GroupedCheckboxGroup
          values={data.certifications || []}
          onChange={(values) => updateData({ ...data, certifications: values })}
          groups={CERTIFICATION_GROUPS}
          renderAfterGroup={{
            'Quality Management Standards': (
              <div className="mt-3 pl-1">
                <FormField label="AS9100 Revision" helpText="If applicable">
                  <Select
                    value={data.as9100Rev || ''}
                    onChange={(value) => updateData({ ...data, as9100Rev: value })}
                    options={AS9100_REVISIONS}
                    placeholder="Select AS9100 revision"
                  />
                </FormField>
              </div>
            ),
            'Safety & Audit Programs': (
              <div className="mt-3 pl-1 grid md:grid-cols-2 gap-x-6">
                <FormField label="IS-BAO Audit Stage" helpText="If applicable">
                  <Select
                    value={data.isbaoStage || ''}
                    onChange={(value) => updateData({ ...data, isbaoStage: value })}
                    options={ISBAO_STAGES}
                    placeholder="Select IS-BAO stage"
                  />
                </FormField>
                <FormField label="Wyvern Rating" helpText="If applicable">
                  <Select
                    value={data.wyvernLevel || ''}
                    onChange={(value) => updateData({ ...data, wyvernLevel: value })}
                    options={WYVERN_LEVELS}
                    placeholder="Select Wyvern rating"
                  />
                </FormField>
                <FormField label="ARGUS Audit Level" helpText="If applicable">
                  <Select
                    value={data.argusLevel || ''}
                    onChange={(value) => updateData({ ...data, argusLevel: value })}
                    options={ARGUS_LEVELS}
                    placeholder="Select ARGUS level"
                  />
                </FormField>
              </div>
            ),
          }}
        />
      </FormField>
    </div>
  );
}
