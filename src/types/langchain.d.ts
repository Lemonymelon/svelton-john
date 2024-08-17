declare module 'langchain' {
    export class OpenAI {
        constructor(config: { apiKey: string });
        complete(params: { model: string; prompt: string; max_tokens: number }): Promise<{ choices: { text: string }[] }>;
    }
}
