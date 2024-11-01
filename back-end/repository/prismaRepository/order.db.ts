import { PrismaClient } from '@prisma/client';
import { Order } from '../../model/order';
import { User } from '../../model/user';
import { Product } from '../../model/product';

export class PrismaOrderRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public async createOrder(order: Order): Promise<Order> {
        const createdOrder = await this.prisma.order.create({
            data: {
                userId: order.getUser().getUserId(),
                status: order.getStatus(),
                creationDate: order.getCreationDate(),
                products: {
                    connect: order.getProducts().map(product => ({ productId: product.getProductId() })),
                },
            },
            include: {
                user: true,
                products: true,
            },
        });

        return new Order(
            createdOrder.orderId,
            new User(createdOrder.user.userId, createdOrder.user.username, createdOrder.user.password, createdOrder.user.role),
            createdOrder.products.map(p => new Product(p.productId, p.name, p.description, p.location)),
            createdOrder.status,
            createdOrder.creationDate
        );
    }

    public async getOrderById(orderId: number): Promise<Order | undefined> {
        const foundOrder = await this.prisma.order.findUnique({
            where: { orderId },
            include: {
                user: true,
                products: true,
            },
        });

        return foundOrder
            ? new Order(
                  foundOrder.orderId,
                  new User(foundOrder.user.userId, foundOrder.user.username, foundOrder.user.password, foundOrder.user.role),
                  foundOrder.products.map(p => new Product(p.productId, p.name, p.description, p.location)),
                  foundOrder.status,
                  foundOrder.creationDate
              )
            : undefined;
    }

    public async getAllOrders(): Promise<Order[]> {
        const orders = await this.prisma.order.findMany({
            include: {
                user: true,
                products: true,
            },
        });

        return orders.map(order =>
            new Order(
                order.orderId,
                new User(order.user.userId, order.user.username, order.user.password, order.user.role),
                order.products.map(p => new Product(p.productId, p.name, p.description, p.location)),
                order.status,
                order.creationDate
            )
        );
    }

    public async updateOrderStatus(orderId: number, newStatus: string): Promise<Order | undefined> {
        const updatedOrder = await this.prisma.order.update({
            where: { orderId },
            data: { status: newStatus },
            include: {
                user: true,
                products: true,
            },
        });

        return updatedOrder
            ? new Order(
                  updatedOrder.orderId,
                  new User(updatedOrder.user.userId, updatedOrder.user.username, updatedOrder.user.password, updatedOrder.user.role),
                  updatedOrder.products.map(p => new Product(p.productId, p.name, p.description, p.location)),
                  updatedOrder.status,
                  updatedOrder.creationDate
              )
            : undefined;
    }

    public async deleteOrder(orderId: number): Promise<boolean> {
        try {
            await this.prisma.order.delete({ where: { orderId } });
            return true;
        } catch (error) {
            console.error('Error deleting order:', error);
            return false;
        }
    }
}
