import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const contentModelsRouter = router({
  //   query that returns the entire list of active content types
  getContentModels: publicProcedure.query(async ({ ctx }) => {
    const contentModels = await ctx.prisma.contentModel.findMany({
      where: {
        active: true,
      },
    });

    return contentModels;
  }),
  // get the parameters for a specific content type
  getContentModelParameters: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const contentModel = await ctx.prisma.contentModel.findFirst({
        where: {
          name: input.name,
        },
        include: {
          parameters: true,
        },
      });

      return contentModel;
    }),
});
