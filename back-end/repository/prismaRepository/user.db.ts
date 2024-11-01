import { PrismaClient } from '@prisma/client';
import { User } from '../../model/user';

export class UserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public async addUser(user: User): Promise<User> {
        const createdUser = await this.prisma.user.create({
            data: {
                userId: user.getUserId(),
                username: user.getUsername(),
                password: user.getPassword(),
                role: user.getRole(),
            },
        });
        return new User(createdUser.userId, createdUser.username, createdUser.password, createdUser.role);
    }

    public async getUserById(userId: number): Promise<User | undefined> {
        const foundUser = await this.prisma.user.findUnique({
            where: {
                userId: userId,
            },
        });
        return foundUser ? new User(foundUser.userId, foundUser.username, foundUser.password, foundUser.role) : undefined;
    }

    public async getAllUsers(): Promise<User[]> {
        const users = await this.prisma.user.findMany();
        return users.map((user: { userId: number; username: string; password: string; role: string }) => 
            new User(user.userId, user.username, user.password, user.role)
        );
    }

    public async updateUser(userId: number, updatedUser: { username?: string; password?: string; role?: string }): Promise<User | undefined> {
        const updated = await this.prisma.user.update({
            where: {
                userId: userId,
            },
            data: updatedUser,
        });
        return updated ? new User(updated.userId, updated.username, updated.password, updated.role) : undefined;
    }

    public async deleteUser(userId: number): Promise<boolean> {
        try {
            await this.prisma.user.delete({
                where: {
                    userId: userId,
                },
            });
            return true;
        } catch (error) {
            console.error('Error deleting user:', error);
            return false;
        }
    }
}
