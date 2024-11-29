import { Product } from "./product";

export class OrderDetail {
    readonly id: number;
    readonly productsId: Product;
    readonly quantity: number;

    constructor(id: number, productsId: Product, quantity: number) {
        this.id = id;
        this.productsId = productsId;
        this.quantity = quantity;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getProductId(): Product {
        return this.productsId;
    }

    public getQuantity(): number {
        return this.quantity;
    }
}
