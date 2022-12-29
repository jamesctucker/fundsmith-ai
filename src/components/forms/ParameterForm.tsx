import { Parameter } from "@prisma/client";

type ParameterProps = {
  parameters: Parameter[];
};

const ParameterForm = ({ parameters }: ParameterProps) => {
  return (
    <>
      {parameters.map((parameter) => (
        <div key={parameter.id}>
          <label className="label" htmlFor={parameter.name}>
            {parameter.displayLabel}
          </label>
          {parameter.displayType === "TEXTAREA" && (
            <textarea
              className="textarea textarea-bordered w-full"
              id={parameter.name}
              name={parameter.name}
              rows={5}
              placeholder={parameter.placeholder!}
            />
          )}
          {parameter.displayType === "TEXT" && (
            <input
              className="input input-bordered w-full"
              id={parameter.name}
              name={parameter.name}
              placeholder={parameter.placeholder!}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default ParameterForm;
