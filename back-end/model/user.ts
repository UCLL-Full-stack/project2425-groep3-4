import { Order } from "./order";

export class User {
    readonly id: number;
    readonly username: string;
    readonly password: string;
    readonly role: string;
    readonly order: Order[];


    constructor(user: {

    }) {
        this.validate(user);
        

    }


    /*
    constructor(id: number, username: string, password: string, role: string, order: Order[]) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.order = [];
    }
        */

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

    public getOrder(): Order[] {
        return this.order;
    }

    validate(user: {
        username: string;
        password: string;
        role: 
    })

}
