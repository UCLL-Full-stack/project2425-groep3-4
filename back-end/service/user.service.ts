import { User } from '../model/user';
import { UserInput, AuthenticationResponse } from '../types';
import * as dotenv from 'dotenv';
import userDb from '../repository/user.db';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';
import orderDb from '../repository/order.db';
dotenv.config();


const getAllUser = async(): Promise<User[]> => userDb.getAllUser();

const getUserById = async({id}: {id: number}): Promise<User | null> => {
    const user = await userDb.getUserById({id}); 
    if(!user) throw new Error(`User with id: ${id} does not exist.`);
    return user;
}

const getUserByUserName = async({username}: {username: string}): Promise<User> => {
    const userName = await userDb.getUserByUserName({username});
    if(!userName) throw new Error(`Username: ${username} does not exist.`)
    return userName;
}

const authenticate = async({username, password}: UserInput):Promise<AuthenticationResponse> => {
    const user = await getUserByUserName({ username });
    const isValidpassword = await bcrypt.compare(password, user.getPassword());
    if(!isValidpassword) throw new Error('Incorrect password');
    return {
        token: generateJwtToken({ username, role: user.getRole() }),
        username: username,
        role: user.getRole(),
    }
}

const createUser = async({
    username,
    email,
    password,
    role,
}: UserInput): Promise<User> => {
    const existingUser = await userDb.getUserByUserName({username});
    if(!existingUser)throw new Error (`User with username: ${username} is already registered`);

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        email,
        password: hashedPassword,
        role,
    })
    return await userDb.createUser(user);
}

const updateUser = async (id: number, users: UserInput): Promise<User | null> => {
    const userU = await userDb.getUserById({id});
    if(!userU) throw new Error(`User with id: ${users.id} not found`);
    return userDb.updateUser(id, users);

}

const deleteUser = async(id: number): Promise<null | void> => {
    const userD = await userDb.getUserById({id});
    if (!userD) {
        throw new Error(`User with user id: ${userD} not found.`);
    } else {
        userDb.deleteUser(id);
    }

}

export default {
    getAllUser,
    getUserById,
    getUserByUserName,
    authenticate,
    createUser,
    updateUser,
    deleteUser
}
