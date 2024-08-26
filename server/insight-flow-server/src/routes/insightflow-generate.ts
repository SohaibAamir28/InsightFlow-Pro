import { Router } from 'express';
import { generateText } from '../services/insight';
import { selectPersona } from '../utils/personaSelector';

export const xinsightGeneratorRouter = Router();


const createPrompt = (persona: string, dataInfo: any, type: string, additionalInfo: string) => `
You are InsightFlow Assistant, an expert AI model embodying the perspective of ${persona}. Your task is to generate ${type} content based on the analysis of the provided data. Create a unique and insightful narrative that will resonate with the project's objectives and its stakeholders.

Data Information:
${JSON.stringify(dataInfo, null, 2)}

Additional Information:
${additionalInfo}

Instructions:
1. Analyze the data information and additional details provided.
2. Develop a distinct analytical voice that aligns with the project's industry, goals, and target audience.
3. Generate ${type} content that reflects this analytical voice and addresses the specific scenario.
4. Ensure the content is insightful, informative, and tailored to the project's needs.
5. Incorporate industry-specific language and trends where appropriate.
6. Keep the tone professional yet accessible, striking a balance between technical depth and clarity.

Generate the ${type} content:
`;


xinsightGeneratorRouter.post('/outreach', async (req, res) => {
  try {
    const { companyInfo, recipient } = req.body;
    const { persona } = selectPersona();
    const additionalInfo = `Recipient: ${recipient || 'Not specified'}`;
    const prompt = createPrompt(persona, companyInfo, 'outreach email', additionalInfo);
    const result = await generateText(prompt);
    res.json({ content: result.results[0].generated_text.trim() });
  } catch (error) {
    console.error('Error generating outreach content:', error);
    res.status(500).json({ error: 'An error occurred while generating the outreach content.' });
  }
});

xinsightGeneratorRouter.post('/agenda', async (req, res) => {
  try {
    const { companyInfo, callInfo } = req.body;
    const { persona } = selectPersona();
    const additionalInfo = `Call Information: ${callInfo}`;
    const prompt = createPrompt(persona, companyInfo, 'meeting agenda', additionalInfo);
    const result = await generateText(prompt);
    res.json({ content: result.results[0].generated_text.trim() });
  } catch (error) {
    console.error('Error generating agenda content:', error);
    res.status(500).json({ error: 'An error occurred while generating the agenda content.' });
  }
});

xinsightGeneratorRouter.post('/follow-up', async (req, res) => {
  try {
    const { companyInfo, caseInfo } = req.body;
    const { persona } = selectPersona();
    const additionalInfo = `Case/Situation Information: ${caseInfo}`;
    const prompt = createPrompt(persona, companyInfo, 'follow-up email', additionalInfo);
    const result = await generateText(prompt);
    res.json({ content: result.results[0].generated_text.trim() });
  } catch (error) {
    console.error('Error generating follow-up content:', error);
    res.status(500).json({ error: 'An error occurred while generating the follow-up content.' });
  }
});