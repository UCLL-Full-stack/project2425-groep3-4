import { OrderDetail as OrderDetailPrisma, Product as ProductPrisma, User as UserPrisma, Order as OrderPrisma } from '@prisma/client';
import { Role, Status } from '../types'; 
import { User } from './user'; 
import { Order } from './order'; 

export class OrderDetail {
    private id?: number;
    private orderId: number; 
    private productId: number; 
    private quantity: number;

    constructor(orderDetail: {
        id?: number;
        orderId: number;
        productId: number;
        quantity: number;
    }) {
        this.validate(orderDetail);
        this.id = orderDetail.id;
        this.orderId = orderDetail.orderId;  
        this.productId = orderDetail.productId;
        this.quantity = orderDetail.quantity;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getOrderId(): number {
        return this.orderId;
    }

    public getProductId(): number {
        return this.productId;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    validate(orderDetail: {
        orderId: number;
        productId: number;
        quantity: number;
    }) {
        if (!orderDetail.productId) {
            throw new Error("Product ID is required");
        }
        if (!orderDetail.orderId) {
            throw new Error("OrderId is required");
        }
        if (!orderDetail.quantity || orderDetail.quantity <= 0) {
            throw new Error("Quantity must be greater than 0");
        }
    }

    equals(orderDetail: OrderDetail): boolean {
        return (
            this.productId === orderDetail.getProductId() &&
            this.quantity === orderDetail.getQuantity()
        );
    }

    static from({
        id,
        orderId,
        productId,
        quantity,
        product,  
    }: OrderDetailPrisma & { product?: ProductPrisma }) {
        return new OrderDetail({
            id,
            orderId,
            productId,
            quantity,
        });
    }
}
