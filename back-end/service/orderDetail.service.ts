// orderDetails.service.ts
import { OrderDetailRepository } from '../repository/memoryRepository/orderDetail.db';
import { OrderDetail } from '../model/orderDetail';

export class OrderDetailService {
    private orderDetailRepository: OrderDetailRepository;

    constructor() {
        this.orderDetailRepository = new OrderDetailRepository();
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
