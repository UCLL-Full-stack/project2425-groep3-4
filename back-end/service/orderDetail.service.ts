// orderDetails.service.ts
import { OrderDetail } from '../model/orderDetail';
import * as dotenv from 'dotenv';
import orderDetailDb from '../repository/orderDetail.db';
dotenv.config();


const getOrderDetailByOrderId = async({id}: {id: number}): Promise<OrderDetail | null> => {
    const orderDetail = await orderDetailDb.getOrderDetailByOrderId({ id });
    if(!orderDetail) throw new Error(`Order detail of this order id ${id} does not exist.`)
    return orderDetail;
}

export default {
    getOrderDetailByOrderId,
}



export class OrderDetailService {
    private orderDetailRepository: any;

    constructor() {
        if (process.env.NODE_ENV === 'local') {
            this.orderDetailRepository = new (require('../repository/memoryRepository/orderDetail.db').OrderDetailRepository)();
        } else if (process.env.NODE_ENV === 'dev') {
            this.orderDetailRepository = new (require('../repository/prismaRepository/orderDetail.db').OrderDetailRepository)();
        } else {
            this.orderDetailRepository = new (require('../repository/memoryRepository/orderDetail.db').OrderDetailRepository)();
        }
    }
    public async addOrderDetail(orderDetail: OrderDetail): Promise<OrderDetail> {
        return await this.orderDetailRepository.addOrderDetail(orderDetail);
    }

    public async getOrderDetailsByOrderId(orderId: number): Promise<OrderDetail[]> {
        return await this.orderDetailRepository.findOrderDetailsByOrderId(orderId);
    }

    public async updateOrderDetail(orderId: number, productId: number, quantity: number): Promise<OrderDetail | undefined> {
        return await this.orderDetailRepository.updateOrderDetail(orderId, productId, quantity);
    }

    public async deleteOrderDetail(orderId: number, productId: number): Promise<boolean> {
        return await this.orderDetailRepository.deleteOrderDetail(orderId, productId);
    }
}
