import { DisplayType } from "@prisma/client";

// TODO: think about how to make this better organized/more scalable
// how can we organize this by content type?
export const testParameters = [
  {
    name: "description",
    displayLabel: "Description",
    placeholder: "Tell us about your requirements",
    required: true,
    displayType: DisplayType.TEXTAREA,
    position: 0,
    rules: { minLength: 10, maxLength: 1000 },
  },
];

export const thankYouLetterParameters = [
  {
    name: "organization_name",
    displayLabel: "Organization Name",
    placeholder: "What is your organization's name?",
    required: true,
    displayType: DisplayType.TEXT,
    position: 0,
    rules: { minLength: 10, maxLength: 100 },
  },
  {
    name: "supported_project",
    displayLabel: "Supported Project",
    placeholder: "What project or program did they support?",
    required: true,
    displayType: DisplayType.TEXTAREA,
    position: 0,
    rules: { minLength: 10, maxLength: 250 },
  },
  {
    name: "support_description",
    displayLabel: "Support Description",
    placeholder: "What are you thanking them for?",
    required: true,
    displayType: DisplayType.TEXTAREA,
    position: 0,
    rules: { minLength: 10, maxLength: 250 },
  },
];
