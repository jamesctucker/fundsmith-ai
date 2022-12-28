import { DisplayType } from "@prisma/client";

export const parameters = {
  description: {
    name: "Description",
    displayLabel: "Description",
    placeholder: "Tell us about your requirements",
    isRequired: true,
    displayType: DisplayType.TEXTAREA,
    position: 0,
    rules: [{ minLength: 10, maxLength: 1000 }],
  },
};
