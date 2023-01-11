import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const usersRouter = router({
  upsertUser: protectedProcedure
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
