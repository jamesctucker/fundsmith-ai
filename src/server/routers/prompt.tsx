import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const promptsRouter = router({
  //   send params to OpenAI as part of a prompt and get back variants
  generateVariants: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        numberOfVariants: z.number(),
        tone: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const contentType = await ctx.prisma.contentType.findFirst({
        where: {
          name: input.name,
        },
        include: {
          parameters: true,
        },
      });

      return contentType;
    }),
});
