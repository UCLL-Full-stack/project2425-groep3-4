import inventoryDetailDb from '../repository/inventoryDetail.db';
import { InventoryDetail } from '../model/inventoryDetail';

const addInventoryDetail = async (inventoryDetailInput: {
    inventoryId: number;
    productId: number;
    quantity: number;
}): Promise<InventoryDetail> => {
    const inventoryDetail = new InventoryDetail({
        inventoryId: inventoryDetailInput.inventoryId,
        productId: inventoryDetailInput.productId,
        quantity: inventoryDetailInput.quantity,
    });

    return await inventoryDetailDb.addInventoryDetail(inventoryDetail);
};

const deleteInventoryDetail = async (id: number): Promise<InventoryDetail> => {
    return await inventoryDetailDb.deleteInventoryDetail(id);
};

export default {
    addInventoryDetail,
    deleteInventoryDetail,
};
