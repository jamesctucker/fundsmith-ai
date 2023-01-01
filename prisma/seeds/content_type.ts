import { testParameters, thankYouLetterParameters } from "../seeds/parameter";

// connectOrCreate for each parameter
const loopThroughParameters = (parameters: any) => {
  const connectOrCreate = [];
  for (const parameter of parameters) {
    connectOrCreate.push({
      create: parameter,
      where: { name: parameter.name },
    });
  }
  return connectOrCreate;
};

export const contentTypes = [
  {
    name: "appeal-test",
    displayName: "Appeal Test",
    description: "write a test appeal",
    position: 0,
    rules: {},
    isLive: true,
    parameters: {
      connectOrCreate: loopThroughParameters(testParameters),
    },
  },
  {
    name: "thank-you-letter",
    displayName: "Thank You L etter",
    description:
      "Craft a heartfelt message expressing your gratitude for your donors/supporters and the impact of their support",
    position: 0,
    rules: {},
    isLive: true,
    parameters: {
      connectOrCreate: loopThroughParameters(thankYouLetterParameters),
    },
  },
];
