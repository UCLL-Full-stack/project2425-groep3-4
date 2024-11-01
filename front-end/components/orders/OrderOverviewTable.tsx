import React, { useEffect, useState } from 'react';
import { OrderService } from '@services/OrderService';
import { Order } from '@types';

const OrderOverviewTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const orderService = new OrderService();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderService.getAllOrders();
        setOrders(data);
      } catch (err) {
        setError('Failed to load orders');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <table className="table table-bordered table-hover">
      <thead className="thead-dark">
        <tr>
          <th>Order ID</th>
          <th>User</th>
          <th>Products</th>
          <th>Status</th>
          <th>Creation Date</th>
        </tr>
      </thead>
      <tbody>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderOverviewTable;
