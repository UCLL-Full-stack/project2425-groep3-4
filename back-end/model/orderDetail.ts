export class OrderDetail {
    private orderId: number;
    private productId: number;
    private quantity: number;

    constructor(orderId: number, productId: number, quantity: number) {
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
    }

    public getOrderId(): number {
        return this.orderId;
    }

    public setOrderId(orderId: number): void {
        this.orderId = orderId;
    }

    public getProductId(): number {
        return this.productId;
    }

    public setProductId(productId: number): void {
        this.productId = productId;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    }
}
