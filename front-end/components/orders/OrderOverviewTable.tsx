import React, { useState } from 'react';
import { Product, Order } from '@types';
import { OrderService } from '@services/OrderService';

type Props = {
    orders: Order[];
};

type NewOrder = {
    userId: number;
    productIds: number[];
    status: string;
};

const OrderOverviewTable: React.FC<Props> = ({ orders: initialOrders }) => {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [newOrder, setNewOrder] = useState<Partial<NewOrder>>({
        userId: 0,
        productIds: [],
        status: 'recieved',
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddOrder = async () => {
        try {
            setLoading(true);
            const orderService = new OrderService();
            const addedOrder = await orderService.createOrder({
                orderId: Date.now(), // Temporary unique ID
                userId: newOrder.userId || 0,
                productIds: newOrder.productIds || [],
                status: newOrder.status || 'recieved',
                creationDate: new Date().toISOString(),
            });
            setOrders([...orders, addedOrder]);
            setNewOrder({ userId: 0, productIds: [], status: 'recieved' });
        } catch (err) {
            setError('Failed to add order');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Order Overview</h2>
            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Order ID</th>
                        <th>User</th>
                        <th>Products</th>
                        <th>Status</th>
                        <th>Creation Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>New</td>
                        <td>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="User ID"
                                value={newOrder.userId}
                                onChange={(e) =>
                                    setNewOrder({ ...newOrder, userId: parseInt(e.target.value) })
                                }
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Product IDs (comma-separated)"
                                value={newOrder.productIds?.join(',')}
                                onChange={(e) =>
                                    setNewOrder({
                                        ...newOrder,
                                        productIds: e.target.value.split(',').map(Number),
                                    })
                                }
                            />
                        </td>
                        <td>
                            <select
                                className="form-control"
                                value={newOrder.status}
                                onChange={(e) =>
                                    setNewOrder({ ...newOrder, status: e.target.value })
                                }
                            >
                                <option value="recieved">Recieved</option>
                                <option value="processing">Processing</option>
                                <option value="packing">Packing</option>
                                <option value="shipping">Shipping</option>
                                <option value="delivered">Delivered</option>
                            </select>
                        </td>
                        <td>Now</td>
                        <td>
                            <button className="btn btn-primary" onClick={handleAddOrder}>
                                Add Order
                            </button>
                        </td>
                    </tr>

                    {orders.map((order) => (
                        <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>{order.user.username}</td>
                            <td>
                                {order.products && order.products.length > 0
                                    ? order.products.map((product) => product.name).join(', ')
                                    : 'No products'}
                            </td>
                            <td>{order.status}</td>
                            <td>{new Date(order.creationDate).toLocaleDateString()}</td>
                            <td>--</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderOverviewTable;
