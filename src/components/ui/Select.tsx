import React from "react";

type Option = {
  id: number;
  label: string;
  value: string | number;
};

type SelectProps = {
  options: Option[];
  label?: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
};

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, label, name, onChange, onBlur }, ref) => {
    return (
      <div className="flex flex-col flex-1">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <select
          id={name}
          name={name}
          className="relative mt-2 w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
        >
          {options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default Select;
