import { User } from '../user';

export class Magazijnmedewerker extends User {
    constructor(userId: number, username: string, password: string) {
        super(userId, username, password, 'Magazijnmedewerker');
    }
}