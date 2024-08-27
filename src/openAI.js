import OpenAI from "openai";

const client = new OpenAI({
  apiKey: `${import.meta.env.VITE_OPENAI_API_KEY}`,
  dangerouslyAllowBrowser: true,
});

const sendMsgToGpt = async (messages) => {
  const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0].text;
  // we won't be able to generate anything, since no CREDIT CARD
};

export { sendMsgToGpt };
