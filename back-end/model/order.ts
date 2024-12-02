import {
    Order as OrderPrisma,
    User as UserPrisma,
    Shipment as ShipmentPrisma,
    OrderDetail as OrderDetailPrisma
} from '@prisma/client'

import { OrderDetail } from './orderDetail';
import { Product } from './product';
import { Shipment } from './shipment';
import { User } from './user';

export class Order {
    readonly id?: number;
    readonly user: User;   
    readonly status: Status;
    readonly creationDate: Date;
    readonly orderDetail: OrderDetail[];
    readonly shipment: Shipment[];

    constructor(order: {
        id: number;
        user: User;  
        status: Status;
        creationDate: Date;
        orderDetail: OrderDetail[];
        shipment: Shipment[];
    }) {
        this.validate(order);
        
        this.id = order.id;
        this.user = order.user;
        this.status = order.status;
        this.creationDate = order.creationDate;
        this.orderDetail = [];
        this.shipment = [];
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

    getOrderDetail(): OrderDetail[] {
        return this.orderDetail;
    }

    getShipment(): Shipment[] {
        return this.shipment;
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
        orderDetail,
        shipment
    }: OrderPrisma & {orderDetail: OrderDetailPrisma[], shipment: ShipmentPrisma[]}) {
        return new Order ({
            id,
            user,
            status: status as Status,
            creationDate,
            orderDetail: orderDetail.map((orderDetail) => OrderDetail.from(orderDetail)),
            shipment: shipment.map((shipment) => Shipment.from(shipment))
        });
    };
}
