import { Parameter, Document, Prisma } from "@prisma/client";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import InputQualityBar from "../content-model/InputQualityBar";

type ParameterProps = {
  parameters: Parameter[];
  documentData?: Document | null;
};

const ParameterForm = ({ parameters, documentData }: ParameterProps) => {
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
  // Idea: run this only when a user has paused typing for a certain amount of time - might include a debouncer
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

  // get savedResponses from documentData if it exists and map it to the related fields/parameters
  const savedResponses = documentData?.savedResponses as Prisma.JsonObject;
  const savedResponsesMap = Object.entries(savedResponses).map(
    ([key, value]) => ({
      [key]: value,
    })
  );
  // find saved response for a given parameter
  const findSavedResponse = (parameterName: string) => {
    const savedResponse = savedResponsesMap.find(
      (response) => Object.keys(response)[0] === parameterName
    );

    return savedResponse ? Object.values(savedResponse)[0] : "";
  };

  return (
    <div>
      {parameters.map((parameter) => (
        <div key={parameter.id}>
          <div className="flex justify-between items-center">
            <label className="label block text-sm" htmlFor={parameter.name}>
              {parameter.displayLabel}{" "}
              {parameter.required && <span className="text-error">*</span>}
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
                className="textarea textarea-bordered bg-base-200 w-full"
                id={parameter.name}
                rows={5}
                placeholder={parameter.placeholder!}
                {...register(parameter.name, {
                  required: parameter.required,
                })}
                maxLength={getRules(parameter, "maxLength")}
                onChange={getCharacterCount}
                defaultValue={
                  (findSavedResponse(parameter.name) as string) || ""
                }
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
                characterCount={characterCount[parameter.name]}
                maxLength={getRules(parameter, "maxLength")}
              />
            </>
          )}
          {parameter.displayType === "TEXT" && (
            <>
              <input
                className="input input-bordered bg-base-200 w-full"
                id={parameter.name}
                placeholder={parameter.placeholder!}
                {...register(parameter.name, {
                  required: parameter.required,
                })}
                maxLength={getRules(parameter, "maxLength")}
                onChange={getCharacterCount}
                defaultValue={
                  (findSavedResponse(parameter.name) as string) || ""
                }
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
