// orderDetails.db.ts
import { OrderDetail } from '../../model/orderDetail';

export class OrderDetailRepository {
    private orderDetails: OrderDetail[] = [
        new OrderDetail(1, 101, 2), 
        new OrderDetail(1, 102, 1), 
        new OrderDetail(2, 103, 5), 
        new OrderDetail(3, 101, 3)  
    ];

    public async addOrderDetail(orderDetail: OrderDetail): Promise<OrderDetail> {
        this.orderDetails.push(orderDetail);
        return orderDetail;
    }

    public async findOrderDetailsByOrderId(orderId: number): Promise<OrderDetail[]> {
        return this.orderDetails.filter(detail => detail.getOrderId() === orderId);
    }

    public async updateOrderDetail(orderId: number, productId: number, quantity: number): Promise<OrderDetail | undefined> {
        const detail = this.orderDetails.find(detail => detail.getOrderId() === orderId && detail.getProductId() === productId);
        if (detail) {
            detail.setQuantity(quantity);
        }
        return detail;
    }

    public async deleteOrderDetail(orderId: number, productId: number): Promise<boolean> {
        const initialLength = this.orderDetails.length;
        this.orderDetails = this.orderDetails.filter(detail => !(detail.getOrderId() === orderId && detail.getProductId() === productId));
        return this.orderDetails.length < initialLength;
    }
}
