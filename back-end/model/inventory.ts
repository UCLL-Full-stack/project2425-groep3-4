import { Product } from './product';

export class Inventory {
    readonly id: number;
    readonly product: Product;
    readonly quantity: number;

    constructor(id: number, product: Product, quantity: number) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;
    }

    getId(): number | undefined {
        return this.id;
    }

    getProduct(): Product {
        return this.product;
    }

    getQuantity(): number {
        return this.quantity;
    }
}
