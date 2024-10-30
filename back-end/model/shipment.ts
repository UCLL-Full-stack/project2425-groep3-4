import { Order } from './order';

export class Shipment {
    private shipmentId: number;
    private order: Order;
    private status: string;
    private shippedDate: Date;

    constructor(shipmentId: number, order: Order, status: string, shippedDate: Date) {
        this.shipmentId = shipmentId;
        this.order = order;
        this.status = status;
        this.shippedDate = shippedDate;
    }

    public getShipmentId(): number {
        return this.shipmentId;
    }

    public getOrder(): Order {
        return this.order;
    }

    public setOrder(order: Order): void {
        this.order = order;
    }

    public getStatus(): string {
        return this.status;
    }

    public setStatus(status: string): void {
        this.status = status;
    }

    public getShippedDate(): Date {
        return this.shippedDate;
    }

    public setShippedDate(shippedDate: Date): void {
        this.shippedDate = shippedDate;
    }
}
