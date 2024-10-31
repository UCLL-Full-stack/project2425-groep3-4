import { Shipment } from '../../model/shipment';
import { Order } from '../../model/order';

export class ShipmentRepository {
    private shipments: Shipment[] = []; 

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
