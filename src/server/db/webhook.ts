// Prisma queries and mutations used for Clerk webhook events
import { prisma } from "./client";

type PrismaUser = {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
};

export const upsertNewUser = async (user: PrismaUser) => {
  await prisma.user.upsert({
    where: {
      userId: user.userId,
    },
    update: user,
    create: user,
  });
};

export const createDefaultWorkspace = async (
  userId: string,
  firstName: string
) => {
  await prisma.workspaces.create({
    data: {
      name: `${firstName}'s Default Workspace`,
      ownerId: userId,
      isDefault: true,
    },
  });
};
