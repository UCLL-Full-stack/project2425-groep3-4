import { PrismaClient } from '@prisma/client';
import { Inventory } from '../model/inventory';
import { InventoryDetail } from '../model/inventoryDetail';

const database = new PrismaClient();

const getAllInventories = async (): Promise<Inventory[]> => {
    const inventoryPrisma = await database.inventory.findMany({
        include: {
            details: {
                include: {
                    product: true,
                },
            },
        },
    });

    const validInventories = inventoryPrisma.filter((inv) => inv.details && inv.details.length > 0);

    return validInventories.map((inv) => Inventory.from(inv));
};

const getInventoryById = async (id: number): Promise<Inventory | null> => {
    const inventoryPrisma = await database.inventory.findUnique({
        where: { id },
        include: { details: true },
    });
    return inventoryPrisma ? Inventory.from(inventoryPrisma) : null;
};

const createInventory = async (inventory: Inventory): Promise<Inventory> => {
    const productIds = inventory.getDetails().map((detail) => detail.getProductId());

    const validProducts = await database.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true },
    });
    const validProductIds = validProducts.map((product) => product.id);

    const invalidProductIds = productIds.filter((id) => !validProductIds.includes(id));
    if (invalidProductIds.length > 0) {
        throw new Error(`Invalid product IDs: ${invalidProductIds.join(', ')}`);
    }

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



const deleteInventory = async (id: number): Promise<Inventory | null> => {
    await database.inventoryDetail.deleteMany({
        where: { inventoryId: id },
    });

    const inventoryPrisma = await database.inventory.delete({
        where: { id },
        include: { details: true },
    });

    if (!inventoryPrisma.details || inventoryPrisma.details.length === 0) {
        return null; 
    }

    return Inventory.from(inventoryPrisma);
};


export default {
    getAllInventories,
    getInventoryById,
    createInventory,
    deleteInventory,
};
