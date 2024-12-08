import { PrismaClient } from '@prisma/client';
import { OrderDetail } from '../model/orderDetail';
import database from '../util/database';
import { get } from 'http';


const createOrderDetail = async(orderDetail: OrderDetail): Promise<OrderDetail> => {
    try {
        const orderDetailPrisma = await database.orderDetail.create({
            data: {
                quantity: orderDetail.getQuantity(),
            }
        })
        return OrderDetail.from(orderDetailPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.')
    }
};

const getOrderDetailByOrderId = async({id}: {id: number}): Promise<OrderDetail | null> => {
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
    createOrderDetail,
    getOrderDetailById,
    getOrderDetailByOrderId
    //getAllOrderDetail,
    //updateOrderDetail,
    //deleteOrderDetail

}
