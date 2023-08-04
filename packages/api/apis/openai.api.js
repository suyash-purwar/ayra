import { Configuration, OpenAIApi } from "openai";

const classifier = async (query) => {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_ACCESS_TOKEN,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: process.env.OPENAI_MODEL_NAME,
      prompt: `${query} ->`,
      max_tokens: 1,
      temperature: 0,
      logprobs: 2,
    });
    return {
      intent: +response.data.choices[0].text.trim(),
      logprobs: response.data.choices[0].logprobs.token_logprobs[0],
    };
  } catch (e) {
    switch (e.message) {
      default:
        console.log(e.message);
        console.log(e);
        throw new Error("OPENAI_SERVICE_DOWN");
    }
  }
};

export default classifier;
