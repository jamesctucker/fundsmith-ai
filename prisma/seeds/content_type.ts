import { parameters } from "../seeds/parameter";

export const contentTypes = [
  {
    name: "appeal-test",
    displayName: "Appeal Test",
    description: "write a test appeal",
    position: 0,
    rules: {},
    isLive: true,
    parameters: {
      connectOrCreate: {
        where: {
          name: "Description",
        },
        create: parameters.description,
      },
    },
  },
  {
    name: "appeal-test-2",
    displayName: "Appeal Test 2",
    description: "write a test appeal",
    position: 0,
    rules: {},
    isLive: true,
    parameters: {
      connectOrCreate: {
        where: {
          name: "Description",
        },
        create: parameters.description,
      },
    },
  },
  {
    name: "appeal-test-3",
    displayName: "Appeal Test 3",
    description: "write a test appeal",
    position: 0,
    rules: {},
    isLive: true,
    parameters: {
      connectOrCreate: {
        where: {
          name: "Description",
        },
        create: parameters.description,
      },
    },
  },
];
