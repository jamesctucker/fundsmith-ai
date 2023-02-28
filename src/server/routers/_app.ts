import { router } from "../trpc";
import { usersRouter } from "./user";
import { contentModelsRouter } from "./content_model";
import { promptsRouter } from "./prompt";
import { documentsRouter } from "./document";

export const appRouter = router({
  users: usersRouter,
  content_models: contentModelsRouter,
  prompts: promptsRouter,
  documents: documentsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
