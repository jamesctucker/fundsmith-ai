import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { workspacesRouter } from "./workspace";
import { usersRouter } from "./user";
import { contentTypesRouter } from "./content_type";
import { promptsRouter } from "./prompt";

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),
  workspaces: workspacesRouter,
  users: usersRouter,
  content_types: contentTypesRouter,
  prompts: promptsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
