import type { RequestHandler } from '@sveltejs/kit';
import { createConversation, getConversationsByUserId } from '../../../controllers/conversationController';

export const POST: RequestHandler = async ({ request }) => {
    const { userId, prompt } = await request.json();
    const conversation = await createConversation(userId, prompt);
    return new Response(JSON.stringify(conversation), { status: 201 });
};

export const GET: RequestHandler = async ({ url }) => {
    const userId = url.searchParams.get('userId');
    if (!userId) {
        return new Response('User ID is required', { status: 400 });
    }
    const conversations = await getConversationsByUserId(Number(userId));
    return new Response(JSON.stringify(conversations), { status: 200 });
};
