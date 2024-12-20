// orderDetails.service.ts
import { OrderDetail } from '../model/orderDetail';
import * as dotenv from 'dotenv';
import orderDetailDb from '../repository/orderDetail.db';
dotenv.config();


const getOrderDetailsByOrderId = async({id}: {id: number}): Promise<OrderDetail | null> => {
    const orderDetail = await orderDetailDb.getOrderDetailsByOrderId({id});
    if(!orderDetail) throw new Error(`Order detail of this order id ${id} does not exist.`)
    return orderDetail;
}

const addOrderDetails = async (orderId: number, details: Array<{ productId: number; quantity: number }>): Promise<OrderDetail[]> => {
    try {
        const createdDetails = await Promise.all(
            details.map(async (detail) => {
                const orderDetail = new OrderDetail({
                    orderId,
                    productId: detail.productId,
                    quantity: detail.quantity,
                });
                return await orderDetailDb.addOrderDetail(orderDetail);
            })
        );
        return createdDetails;
    } catch (error) {
        console.error('Error adding order details:', error);
        throw new Error('Failed to add order details. See server log for details.');
    }
};

export default {
    getOrderDetailsByOrderId,
    addOrderDetails
}



// export class OrderDetailService {
//     private orderDetailRepository: any;

//     constructor() {
//         if (process.env.NODE_ENV === 'local') {
//             this.orderDetailRepository = new (require('../repository/memoryRepository/orderDetail.db').OrderDetailRepository)();
//         } else if (process.env.NODE_ENV === 'dev') {
//             this.orderDetailRepository = new (require('../repository/prismaRepository/orderDetail.db').OrderDetailRepository)();
//         } else {
//             this.orderDetailRepository = new (require('../repository/memoryRepository/orderDetail.db').OrderDetailRepository)();
//         }
//     }
//     public async addOrderDetail(orderDetail: OrderDetail): Promise<OrderDetail> {
//         return await this.orderDetailRepository.addOrderDetail(orderDetail);
//     }

//     public async getOrderDetailsByOrderId(orderId: number): Promise<OrderDetail[]> {
//         return await this.orderDetailRepository.findOrderDetailsByOrderId(orderId);
//     }

//     public async updateOrderDetail(orderId: number, productId: number, quantity: number): Promise<OrderDetail | undefined> {
//         return await this.orderDetailRepository.updateOrderDetail(orderId, productId, quantity);
//     }

//     public async deleteOrderDetail(orderId: number, productId: number): Promise<boolean> {
//         return await this.orderDetailRepository.deleteOrderDetail(orderId, productId);
//     }
// }
