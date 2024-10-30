import { Product } from './product';
import { User } from './user';

export class Order {
    private orderId: number;
    private user: User;  
    private products: Product[]; 
    private status: string;
    private creationDate: Date;

    constructor(orderId: number, user: User, products: Product[], status: string, creationDate: Date) {
        this.orderId = orderId;
        this.user = user;
        this.products = products;
        this.status = status;
        this.creationDate = creationDate;
    }

    public getOrderId(): number {
        return this.orderId;
    }

    public setOrderId(orderId: number): void {
        this.orderId = orderId;
    }

    public getUser(): User {
        return this.user;
    }

    public setUser(user: User): void {
        this.user = user;
    }

    public getProducts(): Product[] {
        return this.products;
    }

    public setProducts(products: Product[]): void {
        this.products = products;
    }

    public addProduct(product: Product): void {
        this.products.push(product);
    }

    public removeProduct(product: Product): void {
        this.products = this.products.filter(p => p !== product);
    }

    public getStatus(): string {
        return this.status;
    }

    public setStatus(status: string): void {
        this.status = status;
    }

    public getCreationDate(): Date {
        return this.creationDate;
    }

    public setCreationDate(creationDate: Date): void {
        this.creationDate = creationDate;
    }
}
