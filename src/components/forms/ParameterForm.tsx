import { Parameter } from "@prisma/client";
import { useFormContext } from "react-hook-form";

type ParameterProps = {
  parameters: Parameter[];
};

const ParameterForm = ({ parameters }: ParameterProps) => {
  const { register } = useFormContext();

  return (
    <div className="space-y-3">
      {parameters.map((parameter) => (
        <div key={parameter.id}>
          <label className="label text-sm" htmlFor={parameter.name}>
            {parameter.displayLabel}
          </label>
          {parameter.displayType === "TEXTAREA" && (
            <textarea
              className="textarea textarea-bordered w-full"
              id={parameter.name}
              rows={5}
              placeholder={parameter.placeholder!}
              {...register(parameter.name)}
            />
          )}
          {parameter.displayType === "TEXT" && (
            <input
              className="input input-bordered w-full"
              id={parameter.name}
              placeholder={parameter.placeholder!}
              {...register(parameter.name)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ParameterForm;
