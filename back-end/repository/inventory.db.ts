import { PrismaClient } from '@prisma/client';
import { Inventory } from '../model/inventory';
import { InventoryDetail } from '../model/inventoryDetail';

const database = new PrismaClient();

const getAllInventories = async (): Promise<Inventory[]> => {
    const inventoryPrisma = await database.inventory.findMany({
        include: { details: true },
    });
    return inventoryPrisma.map((inv) => Inventory.from(inv));
};

const getInventoryById = async (id: number): Promise<Inventory | null> => {
    const inventoryPrisma = await database.inventory.findUnique({
        where: { id },
        include: { details: true },
    });
    return inventoryPrisma ? Inventory.from(inventoryPrisma) : null;
};

const createInventory = async (inventory: Inventory): Promise<Inventory> => {
    const inventoryPrisma = await database.inventory.create({
        data: {
            details: {
                create: inventory.getDetails().map((detail) => ({
                    productId: detail.getProductId(),
                    quantity: detail.getQuantity(),
                })),
            },
        },
        include: { details: true },
    });
    return Inventory.from(inventoryPrisma);
};

const deleteInventory = async (id: number): Promise<Inventory> => {
    const inventoryPrisma = await database.inventory.delete({
        where: { id },
        include: { details: true },
    });
    return Inventory.from(inventoryPrisma);
};

export default {
    getAllInventories,
    getInventoryById,
    createInventory,
    deleteInventory,
};
