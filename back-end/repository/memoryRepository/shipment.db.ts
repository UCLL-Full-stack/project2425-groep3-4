import { Shipment } from '../../model/shipment';
import { Order } from '../../model/order';
import { User } from '../../model/user';

export class ShipmentRepository {
    private shipments: Shipment[] = [
        new Shipment(1, new Order(1, new User(1, 'johan', 'password123', 'admin'), [], 'Pending', new Date('2023-01-01')), 'Shipped', new Date('2023-01-10')),
        new Shipment(2, new Order(2, new User(2, 'rijesh', 'password123', 'manager'), [], 'Shipped', new Date('2023-02-01')), 'In Transit', new Date('2023-02-12')),
        new Shipment(3, new Order(3, new User(3, 'bingshen', 'password123', 'user'), [], 'Delivered', new Date('2023-03-01')), 'Delivered', new Date('2023-03-15')),
    ];
    
    public async addShipment(shipment: Shipment): Promise<Shipment> {
        this.shipments.push(shipment);
        return shipment;
    }

    public async getShipmentById(shipmentId: number): Promise<Shipment | undefined> {
        return this.shipments.find(shipment => shipment.getShipmentId() === shipmentId);
    }

    public async getAllShipments(): Promise<Shipment[]> {
        return this.shipments;
    }

    public async updateShipmentStatus(shipmentId: number, status: string): Promise<Shipment | undefined> {
        const shipment = await this.getShipmentById(shipmentId);
        if (shipment) {
            shipment.setStatus(status);
        }
        return shipment;
    }

    public async deleteShipment(shipmentId: number): Promise<boolean> {
        const initialLength = this.shipments.length;
        this.shipments = this.shipments.filter(shipment => shipment.getShipmentId() !== shipmentId);
        return this.shipments.length < initialLength;
    }
}
