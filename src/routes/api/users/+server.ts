import type { RequestHandler } from '@sveltejs/kit';
import { createUser, getUserByEmail } from '../../../controllers/userController';

export const POST: RequestHandler = async ({ request }) => {
    const { email, password } = await request.json();
    const user = await createUser(email, password);
    return new Response(JSON.stringify(user), { status: 201 });
};

export const GET: RequestHandler = async ({ url }) => {
    const email = url.searchParams.get('email');
    if (!email) {
        return new Response('Email is required', { status: 400 });
    }
    const user = await getUserByEmail(email);
    if (user) {
        return new Response(JSON.stringify(user), { status: 200 });
    } else {
        return new Response('User not found', { status: 404 });
    }
};
