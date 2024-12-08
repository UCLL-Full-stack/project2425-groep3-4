// order.service.ts
import { Order } from '../model/order';
import { User } from '../model/user';
import { Product } from '../model/product';
import * as dotenv from 'dotenv';
import orderDb from '../repository/order.db';
import orderDetailDb from '../repository/orderDetail.db';
import userDb from '../repository/user.db';
dotenv.config();


const getAllOrders = async():Promise<Order[]> => orderDb.getAllOrders();

const getOrderById = async({id}: {id: number}): Promise<Order | null> => {
    const order =  await orderDb.getOrderById({ id });
    if(!order) throw new Error(`Order with ${id} does not exist`);
    return order;
}

const createOrder = async({
    user: userInput,
    status,
    creationDate,
}: OrderInput): Promise<Order> => {
    if(!userInput.id) throw new Error('User is required');

    const user = await userDb.getUserById({id: userInput.id});
    if(!user) throw new Error('User does not exist');

    const order = new Order({ user, status, creationDate, orderDetail: []});
    return await orderDb.createOrder(order);
}

const deleteOrder = async(id: number): Promise<Order> => {
    const order = await orderDb.deleteOrder(id);
    if(!order) throw new Error('390')
    return order;
}

export default {
    getAllOrders,
    getOrderById,
    createOrder,
    deleteOrder
}

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
