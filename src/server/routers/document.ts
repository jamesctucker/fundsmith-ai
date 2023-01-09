import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const documentsRouter = router({
  getDocument: protectedProcedure
    .input(
      z.object({
        id: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!input.id) {
        return;
      }

      const document = await ctx.prisma.document.findUnique({
        where: {
          id: input.id,
        },
      });

      return document;
    }),
  getDocumentsBySearch: protectedProcedure
    .input(
      z.object({
        searchText: z.string().optional(),
        userEmail: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!input.userEmail) {
        return;
      }

      if (!input.searchText) {
        const documents = await ctx.prisma.document.findMany({
          where: {
            owner: {
              email: input.userEmail,
            },
          },
          orderBy: {
            contentModel: {
              name: "asc",
            },
          },
          include: {
            contentModel: true,
          },
        });
        return documents;
      }
      // if a name is provided, return all documents for the user that are associated with that contentModel
      if (input.searchText) {
        const documents = await ctx.prisma.document.findMany({
          where: {
            name: {
              search: input.searchText,
              mode: "insensitive",
            },
            owner: {
              email: input.userEmail,
            },
          },
          orderBy: {
            contentModel: {
              name: "asc",
            },
          },
          include: {
            contentModel: true,
          },
        });
        return documents;
      }
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
  getDocuments: protectedProcedure
    .input(
      z.object({
        userEmail: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const documents = await ctx.prisma.document.findMany({
        where: {
          owner: {
            email: input.userEmail,
          },
        },
        include: {
          contentModel: true,
        },
      });

      return documents;
    }),
  deleteDocument: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const document = await ctx.prisma.document.delete({
        where: {
          id: input.id,
        },
      });

      return document;
    }),
});
