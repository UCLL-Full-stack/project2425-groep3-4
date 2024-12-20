import React from 'react';
import { Inventory } from '@types';

interface InventoryOverviewTableProps {
    inventories: Inventory[];
    loading: boolean;
    error: string | null;
}

const InventoryOverviewTable: React.FC<InventoryOverviewTableProps> = ({
    inventories,
    loading,
    error,
}) => {
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
                {inventories.map((inventory, index) => (
                    <tr key={inventory.id || index}> 
                        <td>{inventory.productId || 'N/A'}</td>
                        <td>{inventory.product?.name || 'N/A'}</td>
                        <td>{inventory.product?.description || 'N/A'}</td>
                        <td>{inventory.product?.location || 'N/A'}</td>
                        <td>{inventory.quantity || 'N/A'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default InventoryOverviewTable;
