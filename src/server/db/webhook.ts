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
