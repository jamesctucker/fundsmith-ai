import { Parameter } from "@prisma/client";
import { useContentTypeFormData } from "@/hooks/useContentTypeFormData";

type ParameterProps = {
  parameters: Parameter[];
};

const ParameterForm = ({ parameters }: ParameterProps) => {
  const { handleUpdateFormData } = useContentTypeFormData();

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
              name={parameter.name}
              rows={5}
              placeholder={parameter.placeholder!}
              onChange={handleUpdateFormData}
            />
          )}
          {parameter.displayType === "TEXT" && (
            <input
              className="input input-bordered w-full"
              id={parameter.name}
              name={parameter.name}
              placeholder={parameter.placeholder!}
              onChange={handleUpdateFormData}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ParameterForm;
