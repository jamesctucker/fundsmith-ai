import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const contentModelsRouter = router({
  getContentModels: protectedProcedure.query(async ({ ctx }) => {
    const contentModels = await ctx.prisma.contentModel.findMany({
      where: {
        active: true,
      },
    });

    return contentModels;
  }),
  getContentModel: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const contentModel = await ctx.prisma.contentModel.findFirst({
        where: {
          id: input.id,
        },
        include: {
          parameters: true,
        },
      });

      return contentModel;
    }),
  // TODO: this should probably be moved to a new "parameters" router
  getContentModelParametersByName: protectedProcedure
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
