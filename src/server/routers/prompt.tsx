import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { prompts } from "../lib/prompts";

type Choice = {
  text: string;
  index: 0;
  finish_reason: string;
};

export const promptsRouter = router({
  generateVariantsByContentModelName: protectedProcedure
    .input(
      z.object({
        content_model_name: z.string(),
        // TODO: figure out how to dynamically type this according to the prompt name
        responses: z.any(),
        tone: z.string(),
        max_tokens: z.number(),
        n: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // find the prompt template in the prompts object
      const { content_model_name, responses, tone, max_tokens, n } = input;
      const prompt = prompts[content_model_name as keyof typeof prompts];

      // inject the responses into the prompt template
      const finalPrompt = prompt({
        responses: responses,
        tone: tone,
        content_model_name: content_model_name,
      });

      const res = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: finalPrompt,
          max_tokens: max_tokens,
          temperature: 0.4,
          n: n,
          // we send this to Open AI so they can track users who abuse the API
          user: ctx.user.id,
        }),
      });
      const body = await res.json();

      const variants = body.choices.map((choice: Choice) => choice.text);

      return { variants: variants };
    }),
});
