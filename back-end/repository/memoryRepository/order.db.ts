// order.db.ts
import { Order } from '../../model/order';
import { User } from '../../model/user';
import { Product } from '../../model/product';

export class OrderRepository {
    private orders: Order[] = [];

    public async createOrder(order: Order): Promise<Order> {
        this.orders.push(order);
        return order;
    }

    public async getOrderById(orderId: number): Promise<Order | undefined> {
        return this.orders.find(order => order.getOrderId() === orderId);
    }

    public async getAllOrders(): Promise<Order[]> {
        return this.orders;
    }

    public async updateOrderStatus(orderId: number, newStatus: string): Promise<Order | undefined> {
        const order = await this.getOrderById(orderId);
        if (order) {
            order.setStatus(newStatus);
        }
        return order;
    }

    public async deleteOrder(orderId: number): Promise<boolean> {
        const initialLength = this.orders.length;
        this.orders = this.orders.filter(order => order.getOrderId() !== orderId);
        return this.orders.length < initialLength;
    }
}
