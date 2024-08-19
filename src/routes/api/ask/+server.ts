import type { RequestHandler } from '@sveltejs/kit';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { OPENAI_API_KEY } from '$env/static/private';

const llm = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    openAIApiKey: OPENAI_API_KEY,
});

const promptTemplate = ChatPromptTemplate.fromMessages([
    [
        "system",
        `You are a helpful assistant that only responds to questions with appropriate Elton John lyrics. The response should be a rational response to the question. 
        Any lyric Elton John ever wrote is valid, do not just use famous examples. 
        Do not return any of the following lyrics: {good_lyrics}.
        Also avoid the following lyrics: {bad_lyrics}.
        The first list is ordered by decreasing appropriateness for the user's question, so consider that when selecting a new lyric.`,
    ],
    ["user", "{input}"],
]);

const outputParser = new StringOutputParser();

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { prompt, goodResponses, badResponses } = await request.json();
        const goodLyrics = goodResponses.map((r: { text: string }) => r.text).join(" | ");
        const badLyrics = badResponses.map((r: { text: string }) => r.text).join(" | ");

        const chain = promptTemplate.pipe(llm).pipe(outputParser);

        const response = await chain.invoke({
            good_lyrics: goodLyrics || "none",
            bad_lyrics: badLyrics || "none",
            input: prompt,
        });

        return new Response(JSON.stringify({ response: response.trim() }), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
};
