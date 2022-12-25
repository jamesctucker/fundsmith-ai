import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import * as trpc from "@trpc/server";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { User } from "@clerk/nextjs/dist/api";
global.atob = require("atob");

import { prisma } from "@/server/db/client";

interface contextData {
  user: User | null;
  req: any;
  res: any;
}

export const createContextInner = async ({ user, req, res }: contextData) => {
  return { user, req, res, prisma };
};

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  const getUser = async () => {
    const { userId } = await getAuth(req);
    const user = userId ? await clerkClient.users.getUser(userId) : null;

    return user;
  };

  const user = await getUser();

  return await createContextInner({ user, req, res });
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
