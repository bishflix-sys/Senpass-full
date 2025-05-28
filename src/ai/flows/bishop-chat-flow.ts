
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
// Removed incorrect explicit generics; types are inferred from inputSchema and outputSchema.
const bishopChatFlow = ai.defineFlow(
  {
    name: 'bishopChatFlow',
    inputSchema: BishopChatInputSchema,
    outputSchema: BishopChatOutputSchema,
  },
  async (input) => { // input is now correctly typed as BishopChatInput
    // Call the defined prompt with the user's input
    const { output } = await bishopChatPrompt(input);

    // Ensure output is not null or undefined before returning
    if (!output) {
        console.error("Bishop chat flow received null output from the prompt.");
        return { response: "Je suis désolé, une erreur interne s'est produite. Veuillez réessayer." };
    }

    return output;
  }
);
