import { InventoryDetail } from '../model/inventoryDetail';
import { PrismaClient } from '@prisma/client';

const database = new PrismaClient();

const addInventoryDetail = async (inventoryDetail: InventoryDetail): Promise<InventoryDetail> => {
    const inventoryDetailPrisma = await database.inventoryDetail.create({
        data: {
            inventoryId: inventoryDetail.getInventoryId()!,
            productId: inventoryDetail.getProductId(),
            quantity: inventoryDetail.getQuantity(),
        },
    });
    return InventoryDetail.from(inventoryDetailPrisma);
};

const deleteInventoryDetail = async (id: number): Promise<InventoryDetail> => {
    const inventoryDetailPrisma = await database.inventoryDetail.delete({
        where: { id },
    });
    return InventoryDetail.from(inventoryDetailPrisma);
};

export default {
    addInventoryDetail,
    deleteInventoryDetail,
};
