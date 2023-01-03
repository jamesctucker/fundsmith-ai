import { Parameter, Prisma } from "@prisma/client";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

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

  const getRules = (parameter: Parameter, rule: string) => {
    const rules = parameter?.rules as Prisma.JsonObject;
    const ruleValue = rules[rule];

    return JSON.parse(ruleValue as string);
  };

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

  const getQuality = (id: string) => {
    const maxLength = getRules(
      parameters.find((parameter) => parameter.name === id)!,
      "maxLength"
    );

    if (!characterCount[id]) {
      return;
    }

    const percentage = (characterCount[id]! / maxLength) * 100;

    return (
      <div>
        {percentage < 10 && (
          <div
            className="h-2 rounded-full bg-error"
            style={{ width: "33.3%" }}
          />
        )}
        {percentage >= 10 && percentage < 25 && (
          <div
            className="h-2 rounded-full bg-warning"
            style={{ width: "66.6%" }}
          />
        )}
        {percentage >= 25 && (
          <div
            className="h-2 rounded-full bg-success"
            style={{ width: "100%" }}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      {parameters.map((parameter) => (
        <div key={parameter.id}>
          <div className="flex justify-between items-center">
            <label className="label block text-sm" htmlFor={parameter.name}>
              {/* add red required asterisk */}
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
              <div className="input-quality-status-bar mt-2" aria-hidden="true">
                <div className="overflow-hidden rounded-full bg-gray-200">
                  {getQuality(parameter.name)}
                </div>
                {/* <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
                  <div className="text-left text-error">Weak</div>
                  <div className="text-center text-warning">Good</div>
                  <div className="text-right text-success">Great!</div>
                </div> */}
              </div>
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
