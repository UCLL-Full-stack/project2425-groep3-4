import { User } from '../../model/user';

export class UserRepository {
    private users: User[] = [
        new User(1, 'johan', 'password123', 'admin'),
        new User(2, 'rijesh', 'password123', 'manager'),
        new User(3, 'bingshen', 'password123', 'user')
    ];
    

    public async addUser(user: User): Promise<User> {
        this.users.push(user);
        return user;
    }

    public async getUserById(userId: number): Promise<User | undefined> {
        return this.users.find(user => user.getUserId() === userId);
    }

    public async getAllUsers(): Promise<User[]> {
        console.log('Current users:', this.users);
        return this.users;
    }

    public async updateUser(userId: number, updatedUser: { username?: string; password?: string; role?: string }): Promise<User | undefined> {
        const user = await this.getUserById(userId);
        if (user) {
            if (updatedUser.username !== undefined) user.setUsername(updatedUser.username);
            if (updatedUser.password !== undefined) user.setPassword(updatedUser.password);
            if (updatedUser.role !== undefined) user.setRole(updatedUser.role);
        }
        return user;
    }
    

    public async deleteUser(userId: number): Promise<boolean> {
        const initialLength = this.users.length;
        this.users = this.users.filter(user => user.getUserId() !== userId);
        return this.users.length < initialLength;
    }
}
