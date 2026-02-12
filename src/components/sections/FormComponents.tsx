import { cloneElement, isValidElement, useId, useState, useRef, useEffect } from 'react';
import { AssessmentData } from '../../types/assessment';

interface FormFieldProps {
  label: string;
  required?: boolean;
  helpText?: string;
  children: React.ReactNode;
}

export function FormField({ label, required, helpText, children }: FormFieldProps) {
  const fieldId = useId();
  const labelId = `${fieldId}-label`;
  const helpId = helpText ? `${fieldId}-help` : undefined;

  const enhancedChild = isValidElement(children)
    ? cloneElement(children, {
        id: fieldId,
        labelledById: labelId,
        describedById: helpId,
        required,
      } as Record<string, unknown>)
    : children;

  return (
    <div className="mb-6">
      <label
        id={labelId}
        htmlFor={fieldId}
        className="block text-sm font-semibold mb-2 text-gray-200"
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {enhancedChild}
      {helpText && (
        <p id={helpId} className="text-xs text-gray-400 mt-1">
          {helpText}
        </p>
      )}
    </div>
  );
}

interface TextInputProps {
  id?: string;
  labelledById?: string;
  describedById?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'email' | 'tel' | 'number';
  name?: string;
  autoComplete?: string;
}

export function TextInput({
  id,
  labelledById,
  describedById,
  value,
  onChange,
  placeholder,
  required,
  type = 'text',
  name,
  autoComplete,
}: TextInputProps) {
  return (
    <input
      id={id}
      name={name}
      autoComplete={autoComplete}
      type={type}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      aria-labelledby={labelledById}
      aria-describedby={describedById}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-transparent"
    />
  );
}

interface SelectProps {
  id?: string;
  labelledById?: string;
  describedById?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  name?: string;
}

export function Select({
  id,
  labelledById,
  describedById,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  required,
  name,
}: SelectProps) {
  return (
    <select
      id={id}
      name={name}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      aria-labelledby={labelledById}
      aria-describedby={describedById}
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
  id?: string;
  labelledById?: string;
  describedById?: string;
  values: string[];
  onChange: (values: string[]) => void;
  options: string[];
}

export function CheckboxGroup({ id, labelledById, describedById, values, onChange, options }: CheckboxGroupProps) {
  const toggleOption = (option: string) => {
    if (values?.includes(option)) {
      onChange(values.filter((v) => v !== option));
    } else {
      onChange([...(values || []), option]);
    }
  };

  return (
    <div
      id={id}
      role="group"
      aria-labelledby={labelledById}
      aria-describedby={describedById}
      className="space-y-2"
    >
      {options.map((option, index) => (
        <label key={option} className="flex items-center gap-3 cursor-pointer group">
          <input
            id={id ? `${id}-${index}` : undefined}
            name={id}
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

export interface CheckboxGroupItem {
  group: string;
  options: string[];
}

interface GroupedCheckboxGroupProps {
  id?: string;
  labelledById?: string;
  describedById?: string;
  values: string[];
  onChange: (values: string[]) => void;
  groups: CheckboxGroupItem[];
  renderAfterGroup?: Record<string, React.ReactNode>;
}

export function GroupedCheckboxGroup({
  id,
  labelledById,
  describedById,
  values,
  onChange,
  groups,
  renderAfterGroup,
}: GroupedCheckboxGroupProps) {
  const toggleOption = (option: string) => {
    if (values?.includes(option)) {
      onChange(values.filter((v) => v !== option));
    } else {
      onChange([...(values || []), option]);
    }
  };

  return (
    <div
      id={id}
      role="group"
      aria-labelledby={labelledById}
      aria-describedby={describedById}
      className="space-y-5"
    >
      {groups.map((group, groupIndex) => (
        <div key={group.group}>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-sky-blue mb-2 border-b border-white/10 pb-1">
            {group.group}
          </h4>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 pl-1">
            {group.options.map((option, optionIndex) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer group">
                <input
                  id={id ? `${id}-${groupIndex}-${optionIndex}` : undefined}
                  name={id}
                  type="checkbox"
                  checked={values?.includes(option) || false}
                  onChange={() => toggleOption(option)}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-sky-blue focus:ring-sky-blue focus:ring-offset-0"
                />
                <span className="text-gray-300 group-hover:text-white transition-colors text-sm">{option}</span>
              </label>
            ))}
          </div>
          {renderAfterGroup?.[group.group]}
        </div>
      ))}
    </div>
  );
}

interface TextAreaProps {
  id?: string;
  labelledById?: string;
  describedById?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  name?: string;
}

export function TextArea({
  id,
  labelledById,
  describedById,
  value,
  onChange,
  placeholder,
  rows = 4,
  required,
  name,
}: TextAreaProps) {
  return (
    <textarea
      id={id}
      name={name}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      required={required}
      aria-labelledby={labelledById}
      aria-describedby={describedById}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-transparent resize-none"
    />
  );
}

interface MultiSelectDropdownProps {
  id?: string;
  labelledById?: string;
  describedById?: string;
  values: string[];
  onChange: (values: string[]) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}

export function MultiSelectDropdown({
  id,
  labelledById,
  describedById,
  values,
  onChange,
  options,
  placeholder = 'Select options',
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (value: string) => {
    if (values?.includes(value)) {
      onChange(values.filter((v) => v !== value));
    } else {
      onChange([...(values || []), value]);
    }
  };

  const selectedLabels = options
    .filter((o) => values?.includes(o.value))
    .map((o) => o.label);

  return (
    <div ref={containerRef} className="relative" id={id}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-labelledby={labelledById}
        aria-describedby={describedById}
        aria-expanded={isOpen}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-left text-white focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-transparent flex items-center justify-between"
      >
        <span className={selectedLabels.length ? 'text-white' : 'text-gray-500'}>
          {selectedLabels.length ? selectedLabels.join(', ') : placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-navy-900 border border-white/10 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-white/5 transition-colors"
            >
              <input
                type="checkbox"
                checked={values?.includes(option.value) || false}
                onChange={() => toggleOption(option.value)}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-sky-blue focus:ring-sky-blue focus:ring-offset-0"
              />
              <span className="text-gray-300 text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export interface SectionProps {
  data: Partial<AssessmentData>;
  updateData: (data: Partial<AssessmentData>) => void;
}
