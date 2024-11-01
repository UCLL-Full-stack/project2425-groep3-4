import { PrismaClient } from '@prisma/client';
import { Shipment } from '../../model/shipment';
import { Order } from '../../model/order';
import { User } from '../../model/user';

export class PrismaShipmentRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public async addShipment(shipment: Shipment): Promise<Shipment> {
        const createdShipment = await this.prisma.shipment.create({
            data: {
                orderId: shipment.getOrder().getOrderId(),
                status: shipment.getStatus(),
                shippedDate: shipment.getShippedDate(),
            },
            include: {
                order: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        return new Shipment(
            createdShipment.shipmentId,
            new Order(
                createdShipment.order.orderId,
                new User(
                    createdShipment.order.user.userId,
                    createdShipment.order.user.username,
                    createdShipment.order.user.password,
                    createdShipment.order.user.role
                ),
                [],
                createdShipment.order.status,
                createdShipment.order.creationDate
            ),
            createdShipment.status,
            createdShipment.shippedDate
        );
    }

    public async getShipmentById(shipmentId: number): Promise<Shipment | undefined> {
        const foundShipment = await this.prisma.shipment.findUnique({
            where: { shipmentId },
            include: {
                order: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        return foundShipment
            ? new Shipment(
                  foundShipment.shipmentId,
                  new Order(
                      foundShipment.order.orderId,
                      new User(
                          foundShipment.order.user.userId,
                          foundShipment.order.user.username,
                          foundShipment.order.user.password,
                          foundShipment.order.user.role
                      ),
                      [],
                      foundShipment.order.status,
                      foundShipment.order.creationDate
                  ),
                  foundShipment.status,
                  foundShipment.shippedDate
              )
            : undefined;
    }

    public async getAllShipments(): Promise<Shipment[]> {
        const shipments = await this.prisma.shipment.findMany({
            include: {
                order: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        return shipments.map(shipment =>
            new Shipment(
                shipment.shipmentId,
                new Order(
                    shipment.order.orderId,
                    new User(
                        shipment.order.user.userId,
                        shipment.order.user.username,
                        shipment.order.user.password,
                        shipment.order.user.role
                    ),
                    [],
                    shipment.order.status,
                    shipment.order.creationDate
                ),
                shipment.status,
                shipment.shippedDate
            )
        );
    }

    public async updateShipmentStatus(shipmentId: number, status: string): Promise<Shipment | undefined> {
        const updatedShipment = await this.prisma.shipment.update({
            where: { shipmentId },
            data: { status },
            include: {
                order: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        return updatedShipment
            ? new Shipment(
                  updatedShipment.shipmentId,
                  new Order(
                      updatedShipment.order.orderId,
                      new User(
                          updatedShipment.order.user.userId,
                          updatedShipment.order.user.username,
                          updatedShipment.order.user.password,
                          updatedShipment.order.user.role
                      ),
                      [],
                      updatedShipment.order.status,
                      updatedShipment.order.creationDate
                  ),
                  updatedShipment.status,
                  updatedShipment.shippedDate
              )
            : undefined;
    }

    public async deleteShipment(shipmentId: number): Promise<boolean> {
        try {
            await this.prisma.shipment.delete({
                where: { shipmentId },
            });
            return true;
        } catch (error) {
            console.error('Error deleting shipment:', error);
            return false;
        }
    }
}
