import { ShipmentRepository } from '../repository/memoryRepository/shipment.db';
import { Shipment } from '../model/shipment';
import { Order } from '../model/order';

export class ShipmentService {
    private shipmentRepository: any;

    constructor() {
        if (process.env.NODE_ENV === 'local') {
            this.shipmentRepository = new (require('../repository/memoryRepository/shipment.db').ShipmentRepository)();
        } else if (process.env.NODE_ENV === 'dev') {
            this.shipmentRepository = new (require('../repository/prismaRepository/shipment.db').ShipmentRepository)();
        } else {
            this.shipmentRepository = new (require('../repository/memoryRepository/shipment.db').ShipmentRepository)();
        }
    }
    public async addShipment(shipment: Shipment): Promise<Shipment> {
        return await this.shipmentRepository.addShipment(shipment);
    }

    public async getShipmentById(shipmentId: number): Promise<Shipment | undefined> {
        return await this.shipmentRepository.getShipmentById(shipmentId);
    }

    public async getAllShipments(): Promise<Shipment[]> {
        return await this.shipmentRepository.getAllShipments();
    }

    public async updateShipmentStatus(shipmentId: number, status: string): Promise<Shipment | undefined> {
        return await this.shipmentRepository.updateShipmentStatus(shipmentId, status);
    }

    public async deleteShipment(shipmentId: number): Promise<boolean> {
        return await this.shipmentRepository.deleteShipment(shipmentId);
    }
}
