import { ContentType } from "@prisma/client";
import Select from "../ui/Select";
import { variantOptions, toneOptions } from "@/constants/constants";
import { useState } from "react";
import { useContentTypeFormData } from "@/hooks/useContentTypeFormData";
import handler from "../../pages/api/hello";

type ContentTypeProps = {
  data: ContentType;
};

type Option = {
  id: number;
  label: string;
  value: string | number;
};

const DefaultFields = ({ data }: ContentTypeProps) => {
  const { handleUpdateFormData } = useContentTypeFormData();

  return (
    <div>
      <label className="label text-sm" htmlFor="name">
        Give your document a name
      </label>
      <input
        type="text"
        name="name"
        className="input input-bordered w-full"
        placeholder="e.g. 'Thank you letter for Peter Kreft'"
        onChange={handleUpdateFormData}
      />
      <div className="flex space-x-4 w-full mt-3">
        {/* Number of variants selection */}
        <Select
          label="Number of variants"
          options={variantOptions}
          onChange={handleUpdateFormData}
        />
        {/* Tone Selection */}
        <Select
          label="Tone"
          options={toneOptions}
          onChange={handleUpdateFormData}
        />
      </div>
    </div>
  );
};

export default DefaultFields;
