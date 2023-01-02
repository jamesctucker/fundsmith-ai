import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

type Choice = {
  text: string;
  index: 0;
  finish_reason: string;
};

export const promptsRouter = router({
  // TODO: figure out how to create reusable prompt templates that we can inject our inputs into
  generateVariants: protectedProcedure
    .input(
      z.object({
        content_type: z.string(),
        organization_name: z.string(),
        support_description: z.string(),
        supported_project: z.string(),
        tone: z.string(),
        // prompt: z.string(),
        max_tokens: z.number(),
        n: z.number(),
      })
    )
    .output(z.object({ variants: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      const {
        content_type,
        // prompt,
        max_tokens,
        n,
        organization_name,
        support_description,
        supported_project,
        tone,
      } = input;

      const finalPrompt = `You're assisting a fundraiser who works for a non-profit organization called ${organization_name}. 
                           You are tasked with writing a ${content_type} that will be sent to donors who have supported the organization.
                           Please use the following information to help you write the ${content_type}:

                           The project the donor supported: ${supported_project}
                           The type of support the donor provided (mention this in the email): ${support_description}

                           The tone of the ${content_type} should be ${tone}.

                           Please keep this under 300 words.`;

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
          temperature: 0.5,
          n: n,
          // we send this to Open AI so they can track users who abuse the API
          user: ctx.user.id,
        }),
      });
      const body = await res.json();
      console.log("body", body);

      // go through each choice and return the text
      const variants = body.choices.map((choice: Choice) => choice.text);

      return { variants: variants };
    }),
});
