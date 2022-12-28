// import { z } from "zod";
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
});
