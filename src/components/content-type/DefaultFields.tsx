import { ContentType } from "@prisma/client";
import Select from "../ui/Select";
import { variantOptions, toneOptions } from "@/constants/constants";
import { useState } from "react";

type ContentTypeProps = {
  data: ContentType;
};

type Option = {
  id: number;
  label: string;
  value: string | number;
};

const DefaultFields = ({ data }: ContentTypeProps) => {
  // only store the option's value
  const [numberofVariants, setNumberOfVariants] = useState<Option | null>(null);
  const [tone, setTone] = useState<Option | null>(null);

  const handleOnChange = (option: Option) => {
    //  if option.value is found in variantOptions, set numberofVariants
    if (variantOptions.find((variant) => variant.value === option.value)) {
      setNumberOfVariants(option);
    }

    if (toneOptions.find((tone) => tone.value === option.value)) {
      setTone(option);
    }
  };

  return (
    <div className="space-y-3">
      <label className="label text-sm" htmlFor="name">
        Document Name
      </label>
      <input
        type="text"
        name="name"
        className="input input-bordered w-full"
        placeholder={data.name}
      />
      <div className="flex space-x-4 w-full">
        {/* Number of variants selection */}
        <Select
          label="Number of variants"
          options={variantOptions}
          onChange={handleOnChange}
        />
        {/* Tone Selection */}
        <Select label="Tone" options={toneOptions} onChange={handleOnChange} />
      </div>
    </div>
  );
};

export default DefaultFields;
