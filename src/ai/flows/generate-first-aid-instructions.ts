'use server';
/**
 * @fileOverview A Genkit flow for generating step-by-step first aid instructions based on an emergency type.
 *
 * - generateFirstAidInstructions - A function that handles the first aid instruction generation process.
 * - FirstAidInstructionInput - The input type for the generateFirstAidInstructions function.
 * - FirstAidInstructionOutput - The return type for the generateFirstAidInstructions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FirstAidInstructionInputSchema = z.object({
  emergencyType: z.string().describe('The type of emergency for which to generate first aid instructions (e.g., bleeding, fainting, burns).'),
});
export type FirstAidInstructionInput = z.infer<typeof FirstAidInstructionInputSchema>;

const FirstAidInstructionOutputSchema = z.object({
  title: z.string().describe('A concise title for the first aid instructions.'),
  steps: z.array(z.string()).describe('A list of step-by-step first aid instructions.'),
  disclaimer: z.string().describe('A disclaimer stating that this information is not a substitute for professional medical advice.'),
});
export type FirstAidInstructionOutput = z.infer<typeof FirstAidInstructionOutputSchema>;

export async function generateFirstAidInstructions(input: FirstAidInstructionInput): Promise<FirstAidInstructionOutput> {
  return generateFirstAidInstructionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'firstAidInstructionPrompt',
  input: {schema: FirstAidInstructionInputSchema},
  output: {schema: FirstAidInstructionOutputSchema},
  prompt: `You are an AI assistant specialized in providing clear, concise, and accurate first aid instructions. You will receive an emergency type and must generate step-by-step instructions.

Instructions:
- Provide a title for the instructions.
- List the steps sequentially and clearly.
- Include a disclaimer that this information is not a substitute for professional medical advice.

Emergency Type: {{{emergencyType}}}`, 
});

const generateFirstAidInstructionsFlow = ai.defineFlow(
  {
    name: 'generateFirstAidInstructionsFlow',
    inputSchema: FirstAidInstructionInputSchema,
    outputSchema: FirstAidInstructionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
