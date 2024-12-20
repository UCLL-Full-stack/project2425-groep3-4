import { InventoryDetail as InventoryDetailPrisma, Product as ProductPrisma } from '@prisma/client';

export class InventoryDetail {
    private id?: number;
    private inventoryId?: number;
    private productId: number;
    private quantity: number;

    constructor(inventoryDetail: {
        id?: number;
        inventoryId?: number;
        productId: number;
        quantity: number;
    }) {
        this.validate(inventoryDetail);
        this.id = inventoryDetail.id;
        this.inventoryId = inventoryDetail.inventoryId;
        this.productId = inventoryDetail.productId;
        this.quantity = inventoryDetail.quantity;
    }

    getId(): number | undefined {
        return this.id;
    }

    getInventoryId(): number | undefined {
        return this.inventoryId;
    }

    getProductId(): number {
        return this.productId;
    }

    getQuantity(): number {
        return this.quantity;
    }

    validate(inventoryDetail: {
        inventoryId?: number;
        productId: number;
        quantity: number;
    }) {
        if (!inventoryDetail.productId) {
            throw new Error('Product ID is required');
        }
        if (!inventoryDetail.quantity || inventoryDetail.quantity <= 0) {
            throw new Error('Quantity must be greater than 0');
        }
    }

    static from({
        id,
        inventoryId,
        productId,
        quantity,
    }: InventoryDetailPrisma): InventoryDetail {
        return new InventoryDetail({
            id,
            inventoryId,
            productId,
            quantity,
        });
    }
}
