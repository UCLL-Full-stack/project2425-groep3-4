import { PrismaClient } from '@prisma/client';
import { OrderDetail } from '../model/orderDetail';
import database from '../util/database';
import { get } from 'http';


const addOrderDetail = async (orderDetail: OrderDetail): Promise<OrderDetail> => {
    try {
        const productId = orderDetail.getProductId();
        const orderId = orderDetail.getOrderId();
        if (!productId) {
            throw new Error('Product ID is required and cannot be undefined.');
        }

        const orderDetailPrisma = await database.orderDetail.create({
            data: {
                orderId,
                productId,
                quantity: orderDetail.getQuantity(),
            },
        });
        return OrderDetail.from(orderDetailPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getOrderDetailsByOrderId = async({id}: {id: number}): Promise<OrderDetail | null> => {
    try {
        const orderDetailPrisma = await database.orderDetail.findFirst({
            where: { id },
            include: {
                order: { include: { user: true}}
            },
        });
        return orderDetailPrisma ? OrderDetail.from(orderDetailPrisma) : null;
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.')
    }
}

/*
const getOrderDetailById = async({id}: {id: number}): Promise<OrderDetail | null> => {
    try {
        const orderDetailPrisma = await database.orderDetail.findUnique({
            where: { id }
        })
        return orderDetailPrisma ? OrderDetail.from(orderDetailPrisma) : null;
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.')
    }
}
    */

/*
const getAllOrderDetail = async(): Promise<OrderDetail> => {
    try {
        const orderDetailPrisma = await database.orderDetail.findMany({
            include: {
                
            }
        })
        
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.')
    }
}

const updateOrderDetail = async({id}: {id: number}): Promise<OrderDetail> => {
    try {
        const orderDetailPrisma = await database.orderDetail
        
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.')
    }
}
    
const deleteOrderDetail = async({id}: {id: number}): Promise<OrderDetail> => {
    try {
        const orderDetailPrisma = await database.orderDetail
        
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.')
    }
}
    */

export default{
    addOrderDetail,
    // getOrderDetailById,
    getOrderDetailsByOrderId
    //getAllOrderDetail,
    //updateOrderDetail,
    //deleteOrderDetail

}
