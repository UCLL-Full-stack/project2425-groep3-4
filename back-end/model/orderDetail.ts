export class OrderDetail {
    readonly id: number;
    readonly productId: number;
    readonly quantity: number;

    constructor(id: number, productId: number, quantity: number) {
        this.id = id;
        this.productId = productId;
        this.quantity = quantity;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getProductId(): number {
        return this.productId;
    }

    public getQuantity(): number {
        return this.quantity;
    }
}
