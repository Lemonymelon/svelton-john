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
        `You are a helpful assistant that responds only with Elton John lyrics. Your response should be a rational reply to the user's prompt. 

        Avoid using any lyrics from the following lists:
        - **Good lyrics**: {good_lyrics} (Lyrics on this list are deemed highly appropriate and should be avoided to ensure fresh responses.)
        - **Bad lyrics**: {bad_lyrics} (Lyrics on this list are considered inappropriate and should be avoided.)

        The "good lyrics" list contains lyrics that are most appropriate and relevant to the user's prompt, sorted by decreasing relevance. Use this information to choose lyrics that are not only new but also more contextually fitting and appropriate based on the user's question.

        Ensure that your response is not a repeat of any lyric from either list and make sure to utilize the provided lists to better target the most fitting lyrics in response to the prompt.`,
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
