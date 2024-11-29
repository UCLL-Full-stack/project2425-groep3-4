import { Product } from './product';
import { User } from './user';

export class Order {
    readonly id: number;
    readonly user: User;  
    readonly products: Product[]; 
    readonly status: string;
    readonly creationDate: Date;

    constructor(id: number, user: User, products: Product[], status: string, creationDate: Date) {
        this.id = id;
        this.user = user;
        this.products = products;
        this.status = status;
        this.creationDate = creationDate;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    getProducts(): Product[] {
        return this.products;
    }

    getStatus(): string {
        return this.status;
    }

    getCreationDate(): Date {
        return this.creationDate;
    }
}
