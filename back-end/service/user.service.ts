import { User } from '../model/user';
import * as dotenv from 'dotenv';
import userDb from '../repository/user.db';
dotenv.config();


const getAllUser = async(): Promise<User[]> => userDb.getAllUser();

const getUserById = async({id}: {id: number}): Promise<User | null> => {
    const user = await userDb.getUserById({id}); 
    if(!user) throw new Error(`User with id: ${id} does not exist.`);
    return user;
}

const getUserByUserName = async({username}: {username: string}): Promise<User[]> => {
    const userName = await userDb.getUserByUserName({username});
    if(!userName) throw new Error(`Username: ${username} does not exist.`)
    return userName;
}

const createUser = async({
    username,
    email,
    password,
    role,
}: UserInput): Promise<User> => {
    const user = new User({
        username,
        email,
        password,
        role,
    })


}


export class UserService {
    private userRepository: any;

    constructor() {
        if (process.env.NODE_ENV === 'local') {
            this.userRepository = new (require('../repository/memoryRepository/user.db').UserRepository)();
        } else if (process.env.NODE_ENV === 'dev') {
            this.userRepository = new (require('../repository/prismaRepository/user.db').UserRepository)();
        } else {
            this.userRepository = new (require('../repository/memoryRepository/user.db').UserRepository)();
        }
    }

    public async addUser(user: User): Promise<User> {
        return await this.userRepository.addUser(user);
    }

    public async getUserById(userId: number): Promise<User | undefined> {
        return await this.userRepository.getUserById(userId);
    }

    public async getAllUsers(): Promise<User[]> {
        return await this.userRepository.getAllUsers();
    }

    public async updateUser(userId: number, updatedUser: { username?: string; password?: string; role?: string }): Promise<User | undefined> {
        return await this.userRepository.updateUser(userId, updatedUser);
    }

    public async deleteUser(userId: number): Promise<boolean> {
        return await this.userRepository.deleteUser(userId);
    }
}
