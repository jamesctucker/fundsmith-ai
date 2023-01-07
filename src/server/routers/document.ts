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
  updateDocument: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        savedVariants: z.array(z.string()).optional(),
        // TODO: this shoud be an array of objects with a specific shape and properties
        savedResponses: z.record(z.any()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const document = await ctx.prisma.document.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          savedVariants: input.savedVariants,
          savedResponses: input.savedResponses,
        },
      });

      return document;
    }),
});
