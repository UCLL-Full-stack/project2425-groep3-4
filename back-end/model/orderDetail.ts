import { OrderDetail as OrderDetailPrisma, Order as OrderPrisma, Product as ProductPrisma } from '@prisma/client'; 

import { Product } from "./product";
import { Order } from "./order";

export class OrderDetail {
    readonly id: number;
    readonly quantity: number;
    
    constructor(orderDetail: {
        id: number;
        quantity: number;
    }) {
        this.validate(orderDetail)
        this.id = orderDetail.id;
        this.quantity = orderDetail.quantity;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    validate(orderDetail: {
        quantity: number;
    }) {
        if (!orderDetail.quantity) {
            throw new Error("Quantity is required");
        }
    }

    equals(orderDetail: OrderDetail): boolean {
        return (
            this.quantity === orderDetail.getQuantity()
        );
    };

    static from({
        id,
        quantity
    }: OrderDetailPrisma) {
        return new OrderDetail({
            id,
            quantity
        });
    };
}
