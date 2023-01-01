import React, { Fragment, ReactEventHandler, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Option = {
  id: number;
  label: string;
  value: string | number;
};

type SelectProps = {
  options: Option[];
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function CustomSelect(
  { options, label, onChange }: SelectProps,
  ref: React.Ref<HTMLSelectElement>
) {
  return (
    <div className="flex flex-col flex-1">
      <label
        htmlFor="location"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        id={label}
        name={label}
        className="relative mt-2 w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
        defaultValue={options[0]!.value}
        onChange={onChange}
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

const Select = React.forwardRef(CustomSelect);

export default Select;
