export class User {
    readonly id: number;
    readonly username: string;
    readonly password: string;
    readonly role: string;

    constructor(id: number, username: string, password: string, role: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getUsername(): string {
        return this.username;
    }

    public getPassword(): string {
        return this.password;
    }

    public getRole(): string {
        return this.role;
    }

}
