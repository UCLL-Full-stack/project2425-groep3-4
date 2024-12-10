import {
    Order as OrderPrisma,
    User as UserPrisma,
    OrderDetail as OrderDetailPrisma
} from '@prisma/client'

import { OrderDetail } from './orderDetail';
import { Product } from './product';
import { Status } from '../types';
import { User } from './user';

export class Order {
    private id?: number;
    private user: User;   
    private status: Status;
    private creationDate: Date;
    private orderDetails: OrderDetail[];

    constructor(order: {
        id?: number;
        user: User;  
        status: Status;
        creationDate: Date;
        orderDetails: OrderDetail[];
    }) {
        this.validate(order);
        
        this.id = order.id;
        this.user = order.user;
        this.status = order.status;
        this.creationDate = order.creationDate;
        this.orderDetails = order.orderDetails;
    } 

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    getStatus(): Status {
        return this.status;
    }

    getCreationDate(): Date {
        return this.creationDate;
    }

    getOrderDetails(): OrderDetail[] {
        return this.orderDetails;
    }

    validate(order: {
        user: User;
        status: Status;
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


    static from({
        id,
        user,
        status,
        creationDate,
        orderDetails,
    }: OrderPrisma & {user: UserPrisma, orderDetails: OrderDetailPrisma[]}) {
        return new Order ({
            id,
            user: User.from(user),
            status: status as Status,
            creationDate,
            orderDetails: orderDetails.map((orderDetail) => OrderDetail.from(orderDetail)),
        });
    };
}
