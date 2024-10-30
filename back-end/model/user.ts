export class User {
    private userId: number;
    private username: string;
    private password: string;
    private role: string;

    constructor(userId: number, username: string, password: string, role: string) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public getUserId(): number {
        return this.userId;
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getRole(): string {
        return this.role;
    }

    public setRole(role: string): void {
        this.role = role;
    }
}
