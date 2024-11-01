import { User } from '../model/user';
import * as dotenv from 'dotenv';
dotenv.config();
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
