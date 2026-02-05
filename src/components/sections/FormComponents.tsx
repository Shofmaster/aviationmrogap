import { AssessmentData } from '../../types/assessment';

interface FormFieldProps {
  label: string;
  required?: boolean;
  helpText?: string;
  children: React.ReactNode;
}

export function FormField({ label, required, helpText, children }: FormFieldProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold mb-2 text-gray-200">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
      {helpText && <p className="text-xs text-gray-400 mt-1">{helpText}</p>}
    </div>
  );
}

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'email' | 'tel' | 'number';
}

export function TextInput({ value, onChange, placeholder, type = 'text' }: TextInputProps) {
  return (
    <input
      type={type}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-transparent"
    />
  );
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({ value, onChange, options, placeholder = 'Select an option' }: SelectProps) {
  return (
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-transparent"
    >
      <option value="" className="bg-navy-900">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value} className="bg-navy-900">
          {option.label}
        </option>
      ))}
    </select>
  );
}

interface CheckboxGroupProps {
  values: string[];
  onChange: (values: string[]) => void;
  options: string[];
}

export function CheckboxGroup({ values, onChange, options }: CheckboxGroupProps) {
  const toggleOption = (option: string) => {
    if (values?.includes(option)) {
      onChange(values.filter((v) => v !== option));
    } else {
      onChange([...(values || []), option]);
    }
  };

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={values?.includes(option) || false}
            onChange={() => toggleOption(option)}
            className="w-4 h-4 rounded border-white/20 bg-white/5 text-sky-blue focus:ring-sky-blue focus:ring-offset-0"
          />
          <span className="text-gray-300 group-hover:text-white transition-colors">{option}</span>
        </label>
      ))}
    </div>
  );
}

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export function TextArea({ value, onChange, placeholder, rows = 4 }: TextAreaProps) {
  return (
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-transparent resize-none"
    />
  );
}

export interface SectionProps {
  data: Partial<AssessmentData>;
  updateData: (data: Partial<AssessmentData>) => void;
}
