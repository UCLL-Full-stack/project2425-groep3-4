import { PrismaClient } from '@prisma/client';
import { User } from '../model/user';
import database from '../util/database';
import { UserInput } from '../types';


const getAllUser = async(): Promise<User[]> => {
    try {
        const userPrisma = await database.user.findMany();
        return userPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.log(error);
        throw new Error("Database Error. See server log for details.");
    }
}

const getUserById = async({id}: {id: number}): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.log(error);
        throw new Error("Database Error. See server log for details.");
    }
}

const getUserByUserName = async({username}: {username: string}) => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { username }
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.log(error);
        throw new Error("Database Error. See server log for details.");
    }
}

// const getUsersByUserName = async({username}: {username: string}): Promise<User[]> => {
//     try {
//         const userPrisma = await database.user.findMany({
//             where: { username }
//         });
//         return userPrisma.map((users) => User.from(users));
//     } catch (error) {
//         console.log(error);
//         throw new Error("Database Error. See server log for details.");
//     }
// }

const createUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data:{ 
                username: user.getUsername(), 
                email: user.getEmail(), 
                password: user.getPassword(), 
                role: user.getRole(),
            }
        });
        return User.from(userPrisma);
    } catch (error) {
        console.log(error);
        throw new Error("Database Error. See server log for details.");
    }
}


const updateUser = async (id: number, users: UserInput): Promise<User | null> => {
    try {
        const updatedUser: Partial<UserInput> = { ...users };
        const userPrisma = await database.user.update({
            where: { id },
            data: updatedUser,
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.log(error);
        throw new Error("Database Error. See server log for details.");
    }
}

const deleteUser = async(id: number) => {
    try {
        const userPrisma = await database.user.delete({
            where: { id }
        });
        return User.from(userPrisma);
    } catch (error) {
        console.log(error);
        throw new Error("Database Error. See server log for details.");
    }
}

export default {
    getAllUser,
    getUserById,
    getUserByUserName,
    // getUsersByUserName,
    createUser,
    updateUser,
    deleteUser
}
