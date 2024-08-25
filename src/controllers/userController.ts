import { AppDataSource } from '../ormconfig';
import { User } from '../entity/User';

export async function createUser(email: string, password: string) {
    const user = new User();
    user.email_address = email;
    user.password = password;
    return await AppDataSource.getRepository(User).save(user);
}

export async function getUserByEmail(email: string) {
    return await AppDataSource.getRepository(User).findOneBy({ email_address: email });
}
