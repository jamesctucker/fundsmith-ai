const thankYouLetter = ({ responses, content_model_name }) => {
  const output = `You're assisting a fundraiser who works for a non-profit organization called ${responses.organization_name}. 
        You are tasked with writing a ${content_model_name} that will be sent to donors who have supported the organization.
        Please use the following information to help you write the ${content_model_name}:
        
        The project the donor supported: ${responses.supported_project}
        The type of support the donor provided (mention this in the email): ${responses.support_description}
        
        The tone of the ${content_model_name} should be ${responses.tone}.
        
        Please keep this under 300 words.`;

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
