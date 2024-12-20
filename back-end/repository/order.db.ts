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
                user: true,
                orderDetails: {
                    include: {
                        product: true, 
                    },
                },
            },
        });
        return orderPrisma.map((orderPrisma) => Order.from(orderPrisma));      
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.')
    }
} 

const getOrderById = async({id}: {id: number}): Promise<Order | null> => {
    try {
        const orderPrisma = await database.order.findUnique({
            where: { id },
            include: { 
                user: true,
                orderDetails: true
            },
        })
        return orderPrisma ? Order.from(orderPrisma) : null;
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.')
    }
}

const getOrderOfUser = async({id}: {id: number}): Promise<Order[]> => {
    try {
        const orderPrisma = await database.order.findMany({
            where: {userId: id},
            include: { 
                user: true,
                orderDetails: {
                    include: {
                        product: true, 
                    },
                },
            }
        })
        return orderPrisma.map((orderPrisma) => Order.from(orderPrisma));
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.')
    }
}

const createOrder = async (order: Order): Promise<Order> => {
    try {
        const orderPrisma = await database.order.create({
            data: {
                status: order.getStatus(),
                creationDate: order.getCreationDate(),
                user: {
                    connect: { id: order.getUser().getId() },
                },
                orderDetails: {
                    create: order.getOrderDetails().map((ord) => ({
                        productId: ord.getProductId(),
                        quantity: ord.getQuantity(),
                    })),
                },
            },
            include: { user: true, orderDetails: true },
        });
        return Order.from(orderPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


/*
const updateOrder = async(id: number, order: Order): Promise<Order> => {
    try {
        
        const orderPrisma = await database.order.update({
            where: { id },
            data: {

            },
            include: { user: true, orderDetail: true}
        });
        return Order.from(orderPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.')
    }
}
    */

const deleteOrder = async(id: number): Promise<Order> => {
    try {
        const orderPrisma = await database.order.delete({
            where: { id },
            include: { user: true, orderDetails: true }
        })
        return Order.from(orderPrisma);        
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.')
    }
}

const deleteOrderOfUser = async({id}: {id:number}) => {
    try {
        const orderPrisma = await database.order.deleteMany({
            where: {userId: id}
        })
        console.log(`${orderPrisma.count} orders deleted for user with ID: ${id}`)
        
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.')
    }
}




export default {
    getAllOrders,
    getOrderById,
    getOrderOfUser,
    createOrder,
    //updateOrder,
    deleteOrder,
    deleteOrderOfUser
}