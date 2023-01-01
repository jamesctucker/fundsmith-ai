import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const contentTypesRouter = router({
  //   query that returns the entire list of active content types
  getContentTypes: publicProcedure.query(async ({ ctx }) => {
    const contentTypes = await ctx.prisma.contentType.findMany({
      where: {
        isLive: true,
      },
    });

    return contentTypes;
  }),
  // get the parameters for a specific content type
  getContentTypeParameters: publicProcedure
    .input(
      z.object({
        name: z.string(),
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
