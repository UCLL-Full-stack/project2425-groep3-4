import { Order } from './order';

export class Shipment {
    readonly id?: number;
    readonly status: string;
    readonly shippedDate: Date;
    readonly order: Order;

    constructor(shipment: {
        id?: number;
        status: string;
        shippedDate: Date;
        order: Order;
    }) {
        this.validate(shipment);
        this.id = shipment.id;
        this.status = shipment.status;
        this.shippedDate = shipment.shippedDate;
        this.order = shipment.order;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getOrder(): Order {
        return this.order;
    }

    public getStatus(): string {
        return this.status;
    }

    public getShippedDate(): Date {
        return this.shippedDate;
    }

    validate(shipment: {
        status: string;
        shippedDate: Date;
        order: Order;
    }) {
        const now = new Date();
        if (this.shippedDate < now) {
            throw new Error("Shipped Date can't be in the past")
        }
        if (!shipment.status?.trim()) {
            throw new Error("Status is required")
        }
        if (!shipment.order) {
            throw new Error("Order is required")
        }
    }

    equals(shipment : Shipment): boolean {
        return (
            this.status === shipment.getStatus() &&
            this.shippedDate === shipment.getShippedDate() &&
            this.order === shipment.getOrder()
        );
    };
}
