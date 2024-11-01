import { PrismaClient } from '@prisma/client';
import { OrderDetail } from '../../model/orderDetail';

export class PrismaOrderDetailRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public async addOrderDetail(orderDetail: OrderDetail): Promise<OrderDetail> {
        const createdOrderDetail = await this.prisma.orderDetail.create({
            data: {
                orderId: orderDetail.getOrderId(),
                productId: orderDetail.getProductId(),
                quantity: orderDetail.getQuantity(),
            },
        });
        return new OrderDetail(createdOrderDetail.orderId, createdOrderDetail.productId, createdOrderDetail.quantity);
    }

    public async findOrderDetailsByOrderId(orderId: number): Promise<OrderDetail[]> {
        const orderDetails = await this.prisma.orderDetail.findMany({
            where: {
                orderId: orderId,
            },
        });

        return orderDetails.map(detail => new OrderDetail(detail.orderId, detail.productId, detail.quantity));
    }

    public async updateOrderDetail(orderId: number, productId: number, quantity: number): Promise<OrderDetail | undefined> {
        const updatedOrderDetail = await this.prisma.orderDetail.updateMany({
            where: {
                AND: [
                    { orderId: orderId },
                    { productId: productId },
                ],
            },
            data: {
                quantity: quantity,
            },
        });

        if (updatedOrderDetail.count > 0) {
            return new OrderDetail(orderId, productId, quantity);
        }
        return undefined;
    }

    public async deleteOrderDetail(orderId: number, productId: number): Promise<boolean> {
        const deletedOrderDetail = await this.prisma.orderDetail.deleteMany({
            where: {
                AND: [
                    { orderId: orderId },
                    { productId: productId },
                ],
            },
        });

        return deletedOrderDetail.count > 0;
    }
}
