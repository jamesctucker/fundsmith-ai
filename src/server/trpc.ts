import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { type Context } from "@/server/context";
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  errorFormatter({ shape }) {
    return shape;
  },
  transformer: superjson,
});

// Base router and procedure helpers
export const router = t.router;
// procedure for unprotected routes
export const publicProcedure = t.procedure;

// procedure for protected routes
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user || ctx.user.role !== "authenticated") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      // infers that `user` is non-nullable to downstream resolvers
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
