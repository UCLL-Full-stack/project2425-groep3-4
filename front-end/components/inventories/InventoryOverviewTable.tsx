import React, { useEffect, useState } from 'react';
import { InventoryService } from '@services/InventoryService';
import { Inventory } from '@types';

const InventoryOverviewTable: React.FC = () => {
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const inventoryService = new InventoryService();

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        setLoading(true);
        const data = await inventoryService.getAllInventories();
        setInventories(data.data); 
      } catch (err) {
        setError('Failed to load inventories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventories();
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
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Description</th>
          <th>Location</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {inventories.map((inventory) => (
          <tr key={inventory.productId}>
            <td>{inventory.productId}</td>
            <td>{inventory.product.name}</td>
            <td>{inventory.product.description}</td>
            <td>{inventory.product.location}</td>
            <td>{inventory.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryOverviewTable;
