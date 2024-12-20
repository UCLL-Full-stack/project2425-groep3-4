import React, { useState } from 'react';
import { Product, Order } from '@types';
import { OrderService } from '@services/OrderService';

type Props = {
    orders: Order[];
};

type NewOrder = {
    userId: number;
    productDetails: { productId: number; quantity: number }[];
    status: string;
};

const OrderOverviewTable: React.FC<Props> = ({ orders: initialOrders }) => {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [newOrder, setNewOrder] = useState<Partial<NewOrder>>({
        userId: 0,
        productDetails: [],
        status: 'received',
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddOrder = async () => {
        try {
            setLoading(true);
            const orderService = new OrderService();

            if (!newOrder.productDetails || newOrder.productDetails.length === 0) {
                throw new Error('Product details are required');
            }

            const addedOrder = await orderService.createOrder({
                userId: newOrder.userId || 0,
                productDetails: newOrder.productDetails,
                status: newOrder.status || 'received',
                creationDate: new Date().toISOString(),
            });

            setOrders([...orders, addedOrder]);
            setNewOrder({ userId: 0, productDetails: [], status: 'received' });
        } catch (err) {
            setError('Failed to add order');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const addProductDetail = () => {
        setNewOrder((prev) => ({
            ...prev,
            productDetails: [...(prev?.productDetails || []), { productId: 0, quantity: 1 }],
        }));
    };

    const removeProductDetail = (index: number) => {
        setNewOrder((prev) => ({
            ...prev,
            productDetails: prev?.productDetails?.filter((_, i) => i !== index) || [],
        }));
    };

    const updateProductDetail = (index: number, key: 'productId' | 'quantity', value: number) => {
        setNewOrder((prev) => ({
            ...prev,
            productDetails: prev?.productDetails?.map((detail, i) =>
                i === index ? { ...detail, [key]: value } : detail
            ) || [],
        }));
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
                            {newOrder.productDetails?.map((detail, index) => (
                                <div key={index} className="mb-2">
                                    <input
                                        type="number"
                                        className="form-control d-inline-block me-2"
                                        style={{ width: '45%' }}
                                        placeholder="Product ID"
                                        value={detail.productId}
                                        onChange={(e) =>
                                            updateProductDetail(index, 'productId', parseInt(e.target.value))
                                        }
                                    />
                                    <input
                                        type="number"
                                        className="form-control d-inline-block me-2"
                                        style={{ width: '30%' }}
                                        placeholder="Quantity"
                                        value={detail.quantity}
                                        onChange={(e) =>
                                            updateProductDetail(index, 'quantity', parseInt(e.target.value))
                                        }
                                    />
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => removeProductDetail(index)}
                                    >
                                        -
                                    </button>
                                </div>
                            ))}
                            <button className="btn btn-secondary btn-sm mt-2" onClick={addProductDetail}>
                                + Add Product
                            </button>
                        </td>
                        <td>
                            <select
                                className="form-control"
                                value={newOrder.status}
                                onChange={(e) =>
                                    setNewOrder({ ...newOrder, status: e.target.value })
                                }
                            >
                                <option value="received">Received</option>
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
