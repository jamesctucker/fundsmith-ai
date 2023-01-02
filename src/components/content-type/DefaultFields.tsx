import Select from "../ui/Select";
import { variantOptions, toneOptions } from "@/constants/constants";
import { useFormContext } from "react-hook-form";

const DefaultFields = () => {
  const { register } = useFormContext();

  return (
    <div>
      <label className="label text-sm" htmlFor="name">
        Give your document a name
      </label>
      <input
        type="text"
        className="input input-bordered w-full"
        placeholder="e.g. 'Thank you letter for Peter Kreft'"
        {...register("name", { required: true })}
      />
      <div className="flex space-x-4 w-full mt-3">
        {/* Number of variants selection */}
        <Select
          label="Number of variants"
          options={variantOptions}
          {...register("numberOfVariants")}
        />
        {/* Tone Selection */}
        <Select label="Tone" options={toneOptions} {...register("tone")} />
      </div>
    </div>
  );
};

export default DefaultFields;
