
'use server';
/**
 * @fileOverview A restricted AI chat agent named BISHOP.
 *
 * - askBishop - A function that handles the chat interaction.
 * - BishopChatInput - The input type for the askBishop function.
 * - BishopChatOutput - The return type for the askBishop function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

// Define the input schema for the chat flow
const BishopChatInputSchema = z.object({
  message: z.string().describe('The user\'s message to the chatbot.'),
});
export type BishopChatInput = z.infer<typeof BishopChatInputSchema>;

// Define the output schema for the chat flow
const BishopChatOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s response.'),
});
export type BishopChatOutput = z.infer<typeof BishopChatOutputSchema>;

/**
 * Sends a message to the BISHOP AI assistant and gets a response.
 * @param input The user's message input.
 * @returns A promise resolving to the chatbot's response.
 */
export async function askBishop(input: BishopChatInput): Promise<BishopChatOutput> {
  return bishopChatFlow(input);
}

// Define the prompt for the BISHOP chatbot
const bishopChatPrompt = ai.definePrompt({
  name: 'bishopChatPrompt',
  input: {
    schema: BishopChatInputSchema,
  },
  output: {
    schema: BishopChatOutputSchema,
  },
  // System instruction to define the AI's persona and restrictions
  system: `You are BISHOP, a helpful AI assistant for the digital identity platform of Senegal.
Your knowledge is strictly restricted to the platform's features, usage, related administrative processes in Senegal accessible through it, and general information about digital identity concepts within the Senegalese context.
Do not answer questions outside this scope. If a question is outside your scope, politely state that you can only help with inquiries related to the platform.
Be concise, helpful, and professional.`,
  // The main prompt template using Handlebars
  prompt: `User message: {{{message}}}

Assistant response:`,
});

// Define the Genkit flow that uses the prompt
const bishopChatFlow = ai.defineFlow(
  {
    name: 'bishopChatFlow',
    inputSchema: BishopChatInputSchema,
    outputSchema: BishopChatOutputSchema,
  },
  async (input: BishopChatInput): Promise<BishopChatOutput> => {
    try {
      const { output } = await bishopChatPrompt(input);

      if (!output) {
        // This case means the LLM call might have succeeded but returned an empty/invalid structure
        // that didn't match BishopChatOutputSchema or was just null.
        console.error("Bishop chat flow: Prompt executed but returned null or undefined output. Input was:", JSON.stringify(input));
        return { response: "Je suis désolé, la réponse de l'assistant est invalide (code: NUL_OUT). Veuillez réessayer." };
      }
      // 'output' should conform to BishopChatOutputSchema due to definePrompt's output.schema.
      // If it doesn't, Zod parsing (handled by Genkit internally for prompts) would likely throw an error
      // which would be caught by the catch block below.
      return output;

    } catch (error: any) {
      // This catches errors during the bishopChatPrompt execution (e.g., API key, network, Google API internal error)
      // or Zod parsing errors if the LLM output doesn't match the schema.
      console.error("Bishop chat flow: An error occurred during prompt execution or output parsing. Input was:", JSON.stringify(input), "Error:", error.message, "Stack:", error.stack);
      
      let clientMessage = "Je suis désolé, une erreur technique est survenue avec l'assistant (code: FLW_ERR). Veuillez réessayer plus tard.";
      
      if (error.message) {
        const lowerErrorMessage = error.message.toLowerCase();
        if (lowerErrorMessage.includes('api key not valid') || lowerErrorMessage.includes('api_key_invalid')) {
            clientMessage = "Erreur de configuration de l'assistant (code: API_KEY). Veuillez contacter le support.";
        } else if (lowerErrorMessage.includes('quota') || lowerErrorMessage.includes('resource_exhausted')) {
            clientMessage = "L'assistant est temporairement surchargé (code: QUOTA). Veuillez réessayer plus tard.";
        } else if (lowerErrorMessage.includes('billing') || lowerErrorMessage.includes('account not configured')) {
            clientMessage = "Problème de configuration du service IA (code: BILLING). Veuillez contacter le support.";
        } else if (lowerErrorMessage.includes('safety settings') || lowerErrorMessage.includes('blocked')) {
            clientMessage = "La demande n'a pas pu être traitée en raison des filtres de sécurité (code: SAFETY).";
        }
      }
      
      // Always return a valid BishopChatOutput structure
      return { response: clientMessage };
    }
  }
);
