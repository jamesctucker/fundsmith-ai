import { parameters } from "../seeds/parameter";

export const contentTypes = [
  {
    name: "Appeal Test",
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
