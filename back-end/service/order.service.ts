// order.service.ts
import { OrderRepository } from '../repository/memoryRepository/order.db';
import { Order } from '../model/order';
import { User } from '../model/user';
import { Product } from '../model/product';
import * as dotenv from 'dotenv';
dotenv.config();

export class OrderService {
    private orderRepository: any;

    constructor() {
        if (process.env.NODE_ENV === 'local') {
            this.orderRepository = new (require('../repository/memoryRepository/order.db').OrderRepository)();
        } else if (process.env.NODE_ENV === 'dev') {
            this.orderRepository = new (require('../repository/prismaRepository/order.db').OrderRepository)();
        } else {
            this.orderRepository = new (require('../repository/memoryRepository/order.db').OrderRepository)();
        }
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
