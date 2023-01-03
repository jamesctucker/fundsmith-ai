import { Parameter, Prisma } from "@prisma/client";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import InputQualityBar from "../content-type/InputQualityBar";

type ParameterProps = {
  parameters: Parameter[];
};

const ParameterForm = ({ parameters }: ParameterProps) => {
  const [characterCount, setCharacterCount] = useState<Record<string, number>>(
    {}
  );

  const {
    register,
    formState: { errors },
  } = useFormContext();

  // extract rules from parameter
  // TODO: explore a better way for fetching rules
  const getRules = (parameter: Parameter, rule: string) => {
    const rules = parameter?.rules as Prisma.JsonObject;
    const ruleValue = rules[rule];

    return JSON.parse(ruleValue as string);
  };

  // get character count for textareas
  // TODO: explore refactoring for better performance
  const getCharacterCount = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const currentCount = e.target.value.length;
    const countLabel = document.getElementById(
      `maxlength-${e.target.id}`
    ) as HTMLLabelElement;

    const maxLength = getRules(
      parameters.find((parameter) => parameter.name === e.target.id)!,
      "maxLength"
    );

    countLabel.innerText = `${currentCount}/${maxLength}`;

    setCharacterCount((prevState) => ({
      ...prevState,
      [e.target.id]: currentCount,
    }));
  };

  return (
    <div>
      {parameters.map((parameter) => (
        <div key={parameter.id}>
          <div className="flex justify-between items-center">
            <label className="label block text-sm" htmlFor={parameter.name}>
              {parameter.displayLabel}{" "}
              {parameter.isRequired && <span className="text-error">*</span>}
            </label>
            {getRules(parameter, "maxLength") && (
              <span
                className="text-sm text-gray-500"
                id={`maxlength-${parameter.name}`}
              />
            )}
          </div>
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
                maxLength={getRules(parameter, "maxLength")}
                onChange={getCharacterCount}
              />
              {errors[parameter.name]?.type === "required" && (
                <p
                  className="mt-1 text-sm text-error"
                  id={`${parameter.name}-error}`}
                >
                  This field is required.
                </p>
              )}
              <InputQualityBar
                parameterName={parameter.name}
                characterCount={characterCount[parameter.name]}
                maxLength={getRules(parameter, "maxLength")}
              />
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
                maxLength={getRules(parameter, "maxLength")}
                onChange={getCharacterCount}
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
