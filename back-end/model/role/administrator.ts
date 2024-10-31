import { User } from "../User";

export class Administrator extends User {
    constructor(userId: number, username: string, password: string) {
        super(userId, username, password, 'Administrator');
    }
}
