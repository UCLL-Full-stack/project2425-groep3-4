import { User } from '../User';

export class Verzendmedewerker extends User {
    constructor(userId: number, username: string, password: string) {
        super(userId, username, password, 'Verzendmedewerker');
    }
}
