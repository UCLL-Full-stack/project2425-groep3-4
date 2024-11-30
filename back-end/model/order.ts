import { Product } from './product';
import { Shipment } from './shipment';
import { User } from './user';

export class Order {
    readonly id?: number;
    readonly user: User;   
    readonly status: string;
    readonly creationDate: Date;
    readonly products: Product[];
    readonly shipments: Shipment[];

    constructor(id: number, user: User, products: Product[], status: string, creationDate: Date, shipments: Shipment[]) {
        this.id = id;
        this.user = user;
        this.status = status;
        this.creationDate = creationDate;
        this.products = [];
        this.shipments = [];
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
