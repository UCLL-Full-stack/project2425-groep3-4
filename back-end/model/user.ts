import { User as UserPrisma, Order as OrderPrisma } from '@prisma/client'
import { Order } from "./order";

export class User {
    private id?: number;
    private username: string;
    private email: string;
    private password: string;
    private role: Role;


    constructor(user: {
        id?: number;
        username: string;
        email: string;
        password: string;
        role: Role;
    }) {
        this.validate(user);
        
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getUsername(): string {
        return this.username;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getRole(): Role {
        return this.role;
    }

    validate(user: {
        username: string;
        email: string;
        password: string;
        role: Role;

    }) {
        if (!user.username?.trim()) {
            throw new Error("Username is Required");
        }
        if (!user.email?.trim()) {
            throw new Error("Email is required");
        }
        if (!user.password?.trim()) {
            throw new Error("Password is required");
        }
        if (!user.role) {
            throw new Error("Role is required");
        }
    }
    
    equals(user: User) : boolean {
        return (
            this.username === user.getUsername() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.role === user.getRole()  
        );
    };

    static from({
        id,
        username,
        email,
        password,
        role
    }: UserPrisma){
        return new User({
            id,
            username,
            email,
            password,
            role: role as Role,
        });
    };
}
