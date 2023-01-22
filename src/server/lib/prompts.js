// TODO: this prompt could be improved if the AI had an understanding of the organization's mission and values
const thankYouLetter = ({ responses }) => {
  const output = `You're a writing assistant working at a non-profit organization called ${responses.organization_name}. 
        You are tasked with writing your supporters a letter thanking them for their contributions.
        Here is some context for the letter:
        
        The project the donor supported: ${responses.supported_project}
        The type of support the donor provided (mention this in the email): ${responses.support_description}
        
        The tone of the thank you letter should be ${responses.tone}.
        
        Please keep this under 250 words and be as concise as possible.`;

  return output;
};

const contentRewriter = ({ responses }) => {
  const output = `Rewrite the following content to be more ${responses.tone}. Every version should be unique:

                  ${responses.content}`;

  return output;
};

export const prompts = {
  "thank-you-letter": thankYouLetter,
  "content-rewriter": contentRewriter,
};
