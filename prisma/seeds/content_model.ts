import {
  testParameters,
  thankYouLetterParameters,
  contentRewriterParameters,
} from "./parameter";

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

export const contentModels = [
  {
    name: "appeal-test",
    displayName: "Test Appeal",
    description: "write a test appeal",
    position: 0,
    rules: {
      maxTokens: 1000,
    },
    active: true,
    parameters: {
      connectOrCreate: loopThroughParameters(testParameters),
    },
  },
  {
    name: "thank-you-letter",
    displayName: "Thank You Letter",
    description:
      "Craft a heartfelt message expressing your gratitude for your donors/supporters and the impact of their support",
    position: 0,
    rules: {
      maxTokens: 1000,
    },
    active: true,
    parameters: {
      connectOrCreate: loopThroughParameters(thankYouLetterParameters),
    },
  },
  {
    name: "content-rewriter",
    displayName: "Content Rewriter",
    description:
      "Grasp your readers' attention by increasing the readibility of your content",
    position: 0,
    rules: {
      maxTokens: 1000,
    },
    active: true,
    parameters: {
      connectOrCreate: loopThroughParameters(contentRewriterParameters),
    },
  },
];
