import React, { useState } from 'react';
import { InventoryService } from '@services/InventoryService';
import { Inventory } from '@types';

interface InventoryOverviewTableProps {
    inventories: Inventory[];
    onInventoryChange: () => void;
}

const InventoryOverviewTable: React.FC<InventoryOverviewTableProps> = ({
    inventories,
    onInventoryChange,
}) => {
    const [newInventory, setNewInventory] = useState<{ productId: number; quantity: number }>({
        productId: 0,
        quantity: 0,
    });
    const [isAdding, setIsAdding] = useState(false);

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this inventory?')) {
            try {
                await new InventoryService().deleteInventory(id);
                alert('Inventory deleted successfully');
                onInventoryChange();
            } catch (err) {
                console.error('Failed to delete inventory:', err);
                alert('Failed to delete inventory');
            }
        }
    };

    const handleAdd = async () => {
        if (!newInventory.productId || newInventory.quantity <= 0) {
            alert('Please provide valid product ID and quantity.');
            return;
        }

        setIsAdding(true);
        try {
            await new InventoryService().addInventory([
                { productId: newInventory.productId, quantity: newInventory.quantity },
            ]);
            alert('Inventory added successfully');
            setNewInventory({ productId: 0, quantity: 0 });
            onInventoryChange();
        } catch (err) {
            console.error('Failed to add inventory:', err);
            alert('Failed to add inventory');
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div>
            <div className="mt-4 mb-4">
                <h5>Add New Inventory</h5>
                <div className="mb-3">
                    <label className="form-label">Product ID</label>
                    <input
                        type="number"
                        className="form-control"
                        value={newInventory.productId}
                        onChange={(e) =>
                            setNewInventory((prev) => ({
                                ...prev,
                                productId: Number(e.target.value),
                            }))
                        }
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        value={newInventory.quantity}
                        onChange={(e) =>
                            setNewInventory((prev) => ({
                                ...prev,
                                quantity: Number(e.target.value),
                            }))
                        }
                    />
                </div>
                <button className="btn btn-primary" onClick={handleAdd} disabled={isAdding}>
                    {isAdding ? 'Adding...' : 'Add Inventory'}
                </button>
            </div>

            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Quantity</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventories.flatMap((inventory) =>
                        inventory.details.map((detail) => (
                            <tr key={detail.id}>
                                <td>{detail.productId}</td>
                                <td>{detail.product?.name || 'N/A'}</td>
                                <td>{detail.product?.description || 'N/A'}</td>
                                <td>{detail.product?.location || 'N/A'}</td>
                                <td>{detail.quantity}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(inventory.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryOverviewTable;
