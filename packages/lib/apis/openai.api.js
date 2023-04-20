import { Configuration, OpenAIApi } from 'openai';
import loadConfig from '../utils/config.js';
loadConfig();

const classifier = async (query) => {
  try {
    const configuration = new Configuration({ apiKey: process.env.OPENAI_ACCESS_TOKEN });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: 'ada:ft-personal-2023-04-20-00-40-20',
      prompt: `${query} ->`,
      max_tokens: 1,
      temperature: .7,
    });
    console.log(response.data.choices[0])
    return +response.data.choices[0].text.trim();
  } catch (e) {
    switch (e.message) {
      default:
        console.log(e.message);
        console.log(e);
        throw new Error('OPENAI_SERVICE_DOWN');
    }
  }
};

export default classifier;