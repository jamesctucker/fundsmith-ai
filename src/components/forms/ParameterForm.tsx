import { Parameter } from "@prisma/client";
import { useFormContext } from "react-hook-form";

type ParameterProps = {
  parameters: Parameter[];
};

const ParameterForm = ({ parameters }: ParameterProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      {parameters.map((parameter) => (
        <div key={parameter.id}>
          <label className="label block text-sm" htmlFor={parameter.name}>
            {/* add red required asterisk */}
            {parameter.displayLabel}{" "}
            {parameter.isRequired && <span className="text-error">*</span>}
          </label>
          {parameter.displayType === "TEXTAREA" && (
            <>
              <textarea
                className="textarea textarea-bordered w-full"
                id={parameter.name}
                rows={5}
                placeholder={parameter.placeholder!}
                {...register(parameter.name, {
                  required: parameter.isRequired,
                })}
              />
              {errors[parameter.name]?.type === "required" && (
                <p
                  className="mt-1 text-sm text-error"
                  id={`${parameter.name}-error}`}
                >
                  This field is required.
                </p>
              )}
            </>
          )}
          {parameter.displayType === "TEXT" && (
            <>
              <input
                className="input input-bordered w-full"
                id={parameter.name}
                placeholder={parameter.placeholder!}
                {...register(parameter.name, {
                  required: parameter.isRequired,
                })}
              />
              {errors[parameter.name]?.type === "required" && (
                <p
                  className="mt-1 text-sm text-error"
                  id={`${parameter.name}-error}`}
                >
                  This field is required.
                </p>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ParameterForm;
