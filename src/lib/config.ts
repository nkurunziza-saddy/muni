export const PROMPT_URL = import.meta.env.PROMPT_API_URL;

export function generateLLMPrompt(page: string) {
  return `Please research and analyze this page: ${page} so I can ask you questions about it. Once you have read it, prompt me with any questions I have. Do not post content from the page in your response. Any of my follow up questions must reference the site I gave you.`;
}
