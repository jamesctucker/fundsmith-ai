import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { workspacesRouter } from "./workspace";
import { usersRouter } from "./user";
import { contentModelsRouter } from "./content_model";
import { promptsRouter } from "./prompt";
import { documentsRouter } from "./document";

export const appRouter = router({
  workspaces: workspacesRouter,
  users: usersRouter,
  content_models: contentModelsRouter,
  prompts: promptsRouter,
  documents: documentsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
