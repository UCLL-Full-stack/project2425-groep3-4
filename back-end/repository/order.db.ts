import { PrismaClient } from '@prisma/client';
import { Order } from '../model/order';
import { User } from '../model/user';
import { Product } from '../model/product';
import { create } from 'domain';
import database from '../util/database';


const getAllOrders = async():Promise<Order[]> => {
    try {
        const orderPrisma = await database.order.findMany({
            include: {
                user: true
            },
        });
        return orderPrisma.map((orderPrisma) => Order.from(orderPrisma));      
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.')
    }
} 

const getOrderById = async({id}: {id: number}): Promise<Order> => {
    try {
        const orderPrisma = await database.order.findUnique({
            where: {id},
            include: {user: true},
        })
        return Order.from(orderPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.')
    }
}

const createOrder = async(order: Order): Promise<Order> => {
    try {
        const orderPrisma = await database.order.create({
            data: {
                status,
                creationDate,
                orderDetail,
                userId: 
            },
            include: { user: true }
        });
        return Order.from(orderPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.')
    }
}

const updateOrder = async(id: number, order: Order): Promise<Order> => {
    try {
        const orderPrisma = await database.order.update({
            where: { id },
            data: order,
            include: { user: true}
        });
        return Order.from(orderPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.')
    }
}

const deleteOrder = async(id: number): Promise<Order> => {
    try {
        const orderPrisma = await database.order.delete({
            where: { id },
            include: { user: true }
        })
        return Order.from(orderPrisma);        
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.')
    }
}

export default {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
}