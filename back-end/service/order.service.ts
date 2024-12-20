// order.service.ts
import { Order } from '../model/order';
import { OrderDetail } from '../model/orderDetail';
import { User } from '../model/user';
import { Product } from '../model/product';
import * as dotenv from 'dotenv';
import orderDb from '../repository/order.db';
import orderDetailDb from '../repository/orderDetail.db';
import userDb from '../repository/user.db';
import { OrderInput } from '../types';
import orderDetailService from '../service/orderDetail.service';
dotenv.config();


const getAllOrders = async():Promise<Order[]> => orderDb.getAllOrders();

const getOrderById = async({id}: {id: number}): Promise<Order | null> => {
    const order =  await orderDb.getOrderById({ id });
    if(!order) throw new Error(`Order with ${id} does not exist`);
    return order;
}

const createOrder = async ({
    user: userInput,
    status,
    creationDate,
    orderDetail,
}: OrderInput): Promise<Order> => {
    if (!userInput.id) throw new Error('User ID is required');

    const user = await userDb.getUserById({ id: userInput.id });
    if (!user) throw new Error('User does not exist');

    const order = new Order({
        id: undefined,
        user,
        status,
        creationDate,
        orderDetails: [],
        products: [],
    });

    const createdOrder = await orderDb.createOrder(order);

    if (orderDetail && orderDetail.length > 0) {
        const orderId = createdOrder.getId();
        if (!orderId) throw new Error('Order ID is undefined');
        await orderDetailService.addOrderDetails(orderId, orderDetail.map((detail) => ({
            ...detail,
            orderId,
        })));
    }

    return createdOrder;
};


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
