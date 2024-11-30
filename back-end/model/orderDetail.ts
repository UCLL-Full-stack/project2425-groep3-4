import { Product } from "./product";
import { Order } from "./order";

export class OrderDetail {
    readonly id: number;
    readonly quantity: number;
    readonly order: Order;
    readonly product: Product;
    
    constructor(orderDetail: {
        id: number;
        quantity: number;
        order: Order;
        product: Product;
    }) {
        this.validate(orderDetail)
        this.id = orderDetail.id;
        this.quantity = orderDetail.quantity;
        this.order = orderDetail.order;
        this.product = orderDetail.product;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public getOrder(): Order {
        return this.order;
    }

    public getProduct(): Product {
        return this.product;
    }

    validate(orderDetail: {
        quantity: number;
        order: Order;
        product: Product;
    }) {
        if (!orderDetail.quantity) {
            throw new Error("Quantity is required");
        }
        if (!orderDetail.order) {
            throw new Error("Order is required");
        }
        if (!orderDetail.product) {
            throw new Error("Product is required")
        }
    }

    equals(orderDetail: OrderDetail): boolean {
        return (
            this.quantity === orderDetail.getQuantity() &&
            this.order === orderDetail.getOrder() &&
            this.product === orderDetail.getProduct()
        );
    };
}
