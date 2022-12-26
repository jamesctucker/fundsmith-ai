import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const usersRouter = router({
  upsertUser: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
      })
    )
    .mutation(({ input }) => {
      return {
        userId: input.userId,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
      };
    }),
});
