import { User } from '../user';

export class Magazijnmanager extends User {
    constructor(userId: number, username: string, password: string) {
        super(userId, username, password, 'Magazijnmanager');
    }
}
