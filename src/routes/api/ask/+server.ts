// src/routes/api/ask.ts
import type { RequestHandler } from '@sveltejs/kit';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { OPENAI_API_KEY } from '$env/static/private';

if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not defined');
}

const llm = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    apiKey: OPENAI_API_KEY,
});

const prompt = ChatPromptTemplate.fromMessages([
    [
        "system",
        "You are an assistant that responds with the most appropriate Elton John lyric.",
    ],
    ["user", "{input}"],
]);

const outputParser = new StringOutputParser();

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { prompt: userPrompt } = await request.json();

        if (!userPrompt) {
            return new Response(JSON.stringify({ error: 'Prompt is required' }), { status: 400 });
        }

        const chain = prompt.pipe(llm).pipe(outputParser);

        const response = await chain.invoke({
            input: userPrompt,
        });

        return new Response(JSON.stringify({ response: response.trim() }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
};
