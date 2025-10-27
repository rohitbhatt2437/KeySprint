'use server';

/**
 * @fileOverview Dynamically adjusts the text difficulty based on the user's performance to provide a personalized typing challenge.
 *
 * - adaptiveTextGeneration - A function that generates text adjusted to the user's skill level.
 * - AdaptiveTextGenerationInput - The input type for the adaptiveTextGeneration function.
 * - AdaptiveTextGenerationOutput - The return type for the adaptiveTextGeneration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptiveTextGenerationInputSchema = z.object({
  wpm: z.number().describe('The user\'s current typing speed in words per minute.'),
  accuracy: z.number().describe('The user\'s current typing accuracy (0-100).'),
  previousText: z.string().optional().describe('The text the user previously typed.'),
});
export type AdaptiveTextGenerationInput = z.infer<typeof AdaptiveTextGenerationInputSchema>;

const AdaptiveTextGenerationOutputSchema = z.object({
  text: z.string().describe('The generated text adjusted to the user\'s skill level.'),
});
export type AdaptiveTextGenerationOutput = z.infer<typeof AdaptiveTextGenerationOutputSchema>;

export async function adaptiveTextGeneration(input: AdaptiveTextGenerationInput): Promise<AdaptiveTextGenerationOutput> {
  return adaptiveTextGenerationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adaptiveTextGenerationPrompt',
  input: {schema: AdaptiveTextGenerationInputSchema},
  output: {schema: AdaptiveTextGenerationOutputSchema},
  prompt: `You are a typing test text generator that adapts to the user's skill level.

  Based on the user's Words Per Minute (WPM) of {{wpm}} and Accuracy of {{accuracy}}%, generate a new text snippet for them to type.

  The text should be challenging but not discouraging. If the WPM is high and the accuracy is high, provide more complex sentences and vocabulary. If the WPM is low or the accuracy is low, provide simpler sentences and vocabulary.

  Previous text: {{previousText}}

  Ensure the generated text is suitable for a typing test and contains a variety of common English words.
  The generated text must be at least 70 words long.
  Do not include any title or numbering in the generated text.
  Output only the generated text.
  `,
});

const adaptiveTextGenerationFlow = ai.defineFlow(
  {
    name: 'adaptiveTextGenerationFlow',
    inputSchema: AdaptiveTextGenerationInputSchema,
    outputSchema: AdaptiveTextGenerationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
