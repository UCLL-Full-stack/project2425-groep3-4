import inventoryDb from '../repository/inventory.db';
import { Inventory } from '../model/inventory';
import { InventoryDetail } from '../model/inventoryDetail';
import { InventoryInput } from '../types';

const getAllInventories = async (): Promise<Inventory[]> => {
    return await inventoryDb.getAllInventories();
};

const getInventoryById = async (id: number): Promise<Inventory | null> => {
    const inventory = await inventoryDb.getInventoryById(id);
    if (!inventory) {
        throw new Error(`Inventory with ID ${id} not found`);
    }
    return inventory;
};

const createInventory = async (inventoryInput: InventoryInput): Promise<Inventory> => {
    const inventory = new Inventory({
        details: inventoryInput.details.map((detail) => new InventoryDetail({
            inventoryId: detail.inventoryId, 
            productId: detail.productId,
            quantity: detail.quantity,
        })),
    });
    return await inventoryDb.createInventory(inventory);
};

const deleteInventory = async (id: number): Promise<void> => {
    const inventory = await inventoryDb.getInventoryById(id);
    if (!inventory) {
        throw new Error(`Inventory with ID ${id} not found`);
    }
    await inventoryDb.deleteInventory(id);
};

export default {
    getAllInventories,
    getInventoryById,
    createInventory,
    deleteInventory,
};
