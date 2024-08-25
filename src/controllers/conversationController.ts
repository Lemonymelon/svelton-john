import { AppDataSource } from '../ormconfig';
import { User } from '../entity/User';
import { Conversation } from '../entity/Conversation';

export async function createConversation(userId: number, prompt: string) {
    const userRepository = AppDataSource.getRepository(User);
    const conversationRepository = AppDataSource.getRepository(Conversation);

    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
        throw new Error('User not found');
    }

    const conversation = new Conversation();
    conversation.user = user;
    conversation.prompt = prompt;
    conversation.good_responses = {};
    conversation.bad_responses = {};

    return await conversationRepository.save(conversation);
}

export async function getConversationsByUserId(userId: number) {
    const conversationRepository = AppDataSource.getRepository(Conversation);

    const conversations = await conversationRepository.find({
        where: { user: { id: userId } },
        relations: ['user'],
    });

    if (!conversations.length) {
        throw new Error('No conversations found for this user.');
    }

    return conversations;
}
