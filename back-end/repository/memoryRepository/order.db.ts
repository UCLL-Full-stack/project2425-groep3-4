// order.db.ts
import { Order } from '../../model/order';
import { User } from '../../model/user';
import { Product } from '../../model/product';

export class OrderRepository {
    private orders: Order[] = [
        new Order(1, new User(1, 'johan', 'password123', 'admin'), [new Product(1, 'Product A', 'Description A', 'Location A')], 'Pending', new Date('2023-01-01')),
        new Order(2, new User(2, 'rijesh', 'password123', 'manager'), [new Product(2, 'Product B', 'Description B', 'Location B')], 'Shipped', new Date('2023-02-01')),
        new Order(3, new User(3, 'bingshen', 'password123', 'user'), [new Product(3, 'Product C', 'Description C', 'Location C')], 'Delivered', new Date('2023-03-01')),
    ];

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
