import Select from "../ui/Select";
import { variantOptions, toneOptions } from "@/constants/constants";
import { useFormContext } from "react-hook-form";
import { Document } from "@prisma/client";

type Props = {
  documentData?: Document | null;
};

const DefaultFields = ({ documentData }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label className="label block text-sm" htmlFor="name">
        Give your document a name <span className="text-error">*</span>
      </label>
      <div>
        <input
          type="text"
          className="input input-bordered bg-base-200 w-full"
          placeholder="e.g. 'Thank you letter for Peter Kreft'"
          {...register("documentName", { required: true })}
          defaultValue={documentData?.name}
        />
        {errors.documentName?.type === "required" && (
          <p className="mt-1 text-sm text-error" id="document-name-error">
            This field is required.
          </p>
        )}
      </div>
      <div className="flex space-x-4 w-full mt-3">
        {/* Number of variants selection */}
        <div>
          <Select
            label="Number of variants"
            options={variantOptions}
            {...register("numberOfVariants", { required: true })}
          />
          {errors.numberOfVariants?.type === "required" && (
            <p
              className="mt-1 text-sm text-error"
              id="number-of-variants-error"
            >
              This field is required.
            </p>
          )}
        </div>
        {/* Tone Selection */}
        <Select
          label="Tone"
          options={toneOptions}
          {...register("tone", { required: true })}
        />
        {errors.tone?.type === "required" && (
          <p className="mt-1 text-sm text-error" id="tone-error">
            This field is required.
          </p>
        )}
      </div>
    </div>
  );
};

export default DefaultFields;
