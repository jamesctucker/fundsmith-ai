import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const workspacesRouter = router({
  createWorkspace: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        ownerId: z.string(),
      })
    )
    .mutation(({ input }) => {
      return {
        name: input.name,
        description: input.description,
        ownerId: input.ownerId,
      };
    }),
});
