// order.service.ts
import { OrderRepository } from '../repository/memoryRepository/order.db';
import { Order } from '../model/order';
import { User } from '../model/user';
import { Product } from '../model/product';

export class OrderService {
    private orderRepository: OrderRepository;

    constructor() {
        this.orderRepository = new OrderRepository();
    }

    public async createOrder(order: Order): Promise<Order> {
        return await this.orderRepository.createOrder(order);
    }

    public async getOrderById(orderId: number): Promise<Order | undefined> {
        return await this.orderRepository.getOrderById(orderId);
    }

    public async getAllOrders(): Promise<Order[]> {
        return await this.orderRepository.getAllOrders();
    }

    public async updateOrderStatus(orderId: number, newStatus: string): Promise<Order | undefined> {
        return await this.orderRepository.updateOrderStatus(orderId, newStatus);
    }

    public async deleteOrder(orderId: number): Promise<boolean> {
        return await this.orderRepository.deleteOrder(orderId);
    }
}
