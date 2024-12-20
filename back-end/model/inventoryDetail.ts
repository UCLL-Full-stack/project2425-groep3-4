import { InventoryDetail as InventoryDetailPrisma, Product as ProductPrisma } from '@prisma/client';

export class InventoryDetail {
    private id?: number;
    private inventoryId?: number;
    private productId: number;
    private quantity: number;
    private product?: {
        id: number;
        name: string;
        description: string;
        location: string;
    };

    constructor(inventoryDetail: {
        id?: number;
        inventoryId?: number;
        productId: number;
        quantity: number;
        product?: {
            id: number;
            name: string;
            description: string;
            location: string;
        };
    }) {
        this.validate(inventoryDetail);
        this.id = inventoryDetail.id;
        this.inventoryId = inventoryDetail.inventoryId;
        this.productId = inventoryDetail.productId;
        this.quantity = inventoryDetail.quantity;
        this.product = inventoryDetail.product;
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

    getProduct(): { id: number; name: string; description: string; location: string } | undefined {
        return this.product;
    }

    validate(inventoryDetail: {
        inventoryId?: number;
        productId: number;
        quantity: number;
        product?: {
            id: number;
            name: string;
            description: string;
            location: string;
        };
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
        product,
    }: InventoryDetailPrisma & { product?: ProductPrisma }): InventoryDetail {
        console.log('Mapping InventoryDetail.from:', { id, inventoryId, productId, quantity, product });
        return new InventoryDetail({
            id,
            inventoryId,
            productId,
            quantity,
            product: product? {
                id: product.id,
                name: product.name,
                description: product.description,
                location: product.location,
            }: undefined,
        });
    }
    
}
