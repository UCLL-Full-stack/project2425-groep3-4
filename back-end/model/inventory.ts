import { Product } from './product';

export class Inventory {
    private product: Product;
    private quantity: number;

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }

    public getProduct(): Product {
        return this.product;
    }

    public setProduct(product: Product): void {
        this.product = product;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    }
}
