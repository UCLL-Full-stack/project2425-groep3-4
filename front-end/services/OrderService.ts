const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class OrderService {
    public async createOrder(order: {
        userId: number;
        productDetails: { productId: number; quantity: number }[];
        status: string;
        creationDate: string;
    }): Promise<any> {
        try {
            const response = await fetch(`${API_URL}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Failed to create order:', error);
            throw error;
        }
    }
    

    public async getAllOrders(): Promise<any> {
        try {
            const response = await fetch(`${API_URL}/api/orders`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            throw error;
        }
    }

    public async getOrderById(orderId: number): Promise<any> {
        try {
            const response = await fetch(`${API_URL}/api/orders/${orderId}`);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Order not found');
                }
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Failed to fetch order with ID ${orderId}:`, error);
            throw error;
        }
    }

    // public async updateOrderStatus(orderId: number, status: string): Promise<any> {
    //     try {
    //         const response = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ status }),
    //         });
    //         if (!response.ok) {
    //             if (response.status === 404) {
    //                 throw new Error('Order not found');
    //             }
    //             throw new Error(`Error: ${response.status}`);
    //         }
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         console.error(`Failed to update order status for order ID ${orderId}:`, error);
    //         throw error;
    //     }
    // }

    public async deleteOrder(orderId: number): Promise<any> {
        try {
            const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Order not found');
                }
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Failed to delete order with ID ${orderId}:`, error);
            throw error;
        }
    }
}
