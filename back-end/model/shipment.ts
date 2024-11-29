import { Order } from './order';

export class Shipment {
    readonly id: number;
    readonly order: Order;
    readonly status: string;
    readonly shippedDate: Date;

    constructor(shipmentId: number, order: Order, status: string, shippedDate: Date) {
        this.id = shipmentId;
        this.order = order;
        this.status = status;
        this.shippedDate = shippedDate;
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
}
