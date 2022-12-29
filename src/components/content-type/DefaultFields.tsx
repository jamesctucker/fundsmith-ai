import { ContentType } from "@prisma/client";
import Select from "../ui/Select";
import { variantOptions, toneOptions } from "@/constants/constants";

type ContentTypeProps = {
  data: ContentType;
};

type Option = {
  id: number;
  label: string;
  value: string | number;
};

const DefaultFields = ({ data }: ContentTypeProps) => {
  const handleOnChange = (option: Option) => {
    console.log(option);
  };

  return (
    <>
      <label className="label" htmlFor="name">
        Document Name
      </label>
      <input
        type="text"
        name="name"
        className="input input-bordered"
        placeholder={data.name}
      />
      {/* Number of variants selection */}
      <Select
        label="Number of variants"
        options={variantOptions}
        onChange={handleOnChange}
      />
      {/* Tone Selection */}
      <Select label="Tone" options={toneOptions} onChange={handleOnChange} />
    </>
  );
};

export default DefaultFields;
