import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const documentsRouter = router({
  getDocument: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const document = await ctx.prisma.document.findUnique({
        where: {
          id: input.id,
        },
      });

      return document;
    }),
  createDocument: protectedProcedure
    .input(
      z.object({
        userEmail: z.string(),
        contentModelId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      //   create a document where owner is associated with the user and and contentModel is associated with the contentModel
      const document = await ctx.prisma.document.create({
        data: {
          contentModel: {
            connect: {
              id: input.contentModelId,
            },
          },
          owner: {
            connect: {
              email: input.userEmail,
            },
          },
        },
      });

      return document;
    }),
});
