import { Router } from 'express';
import { generateText } from '../services/insight';

export const objectionHandlerRouter = Router();

/* Here the prompt work is structured, showcasing a consistency in the exact output related to the structure */
const insightAnalysisPrompt = `
You are InsightFlow Assistant, a highly advanced data intelligence assistant specializing in analyzing complex data scenarios. Your task is to evaluate the provided data and generate detailed, actionable insights. Your expertise includes a deep understanding of data analysis techniques, industry-specific knowledge, and the ability to extract meaningful insights.

Given the data scenario, you must:
1. Identify at least 3 key insights based on the provided information.
2. For each insight, provide a detailed, strategic recommendation.
3. Conduct an analysis of the underlying data patterns and trends.
4. Suggest tailored strategies to leverage the identified insights for project improvement.

Format your response in HTML markup, using appropriate tags to structure the content. Include the following sections:

<insights>
  <insight>
    <key-findings>Describe the key insight derived from the data</key-findings>
    <recommendation>Provide a detailed, strategic recommendation based on the insight</recommendation>
  </insight>
  <!-- Repeat for each insight (minimum 3) -->
</insights>

<data-analysis>
  Provide a deep dive into the data patterns, trends, and underlying factors. Use subheadings and paragraphs as appropriate.
</data-analysis>

<tailored-strategies>
  <strategy>
    <approach>Describe a tailored strategy to leverage the identified insights</approach>
    <rationale>Explain the reasoning behind this strategy</rationale>
  </strategy>
  <!-- Include at least 2 tailored strategies -->
</tailored-strategies>

Ensure your response is comprehensive, insightful, and directly applicable to the given data scenario.
`;

objectionHandlerRouter.post('/', async (req, res) => {
  try {
    const { insightsSituation } = req.body;
    
    if (!insightsSituation) {
      return res.status(400).json({ error: ' situation is required' });
    }

    const fullPrompt = `${objectionHandlerPrompt}\n\n Insights Situation:\n${insightsSituation}\n\nProvide your analysis and recommendations:`;
    
    const result = await generateText(fullPrompt);
    
    if (!result || !result.results || !result.results[0] || !result.results[0].generated_text) {
      throw new Error('Invalid response from AI service');
    }

    const generatedContent = result.results[0].generated_text.trim();

    res.json({ 
      content: generatedContent,
      tokens: {
        prompt: result.results[0].input_token_count,
        completion: result.results[0].generated_token_count
      }
    });
  } catch (error) {
    console.error('Error in objection handler:', error);
    res.status(500).json({ error: 'An error occurred while processing the objection handling request.' });
  }
});

export default objectionHandlerRouter;