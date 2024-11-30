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

    constructor(order: {
        id: number;
        user: User;  
        status: string;
        creationDate: Date;
        products: Product[]; 
        shipments: Shipment[];
    }) {
        this.validate(order);
        
        this.id = order.id;
        this.user = order.user;
        this.status = order.status;
        this.creationDate = order.creationDate;
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

    validate(order: {
        user: User;
        status: string;
        creationDate: Date;
    }) {
        if (!order.user) {
            throw new Error("User required");
        }
        if (!order.status?.trim()) {
            throw new Error("Status is required");
        }
        if (!order.creationDate) {
            throw new Error("CreationDate is required");
        }
    }

    equals(order: Order): boolean {
        return (
            this.user === order.getUser() &&
            this.status === order.getStatus() &&
            this.creationDate === order.getCreationDate()
        );
    };
}
