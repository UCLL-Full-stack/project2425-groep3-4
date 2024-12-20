import { Inventory as InventoryPrisma, InventoryDetail as InventoryDetailPrisma, Product as ProductPrisma } from '@prisma/client';
import { InventoryDetail } from './inventoryDetail';

export class Inventory {
    private id?: number;
    private details: InventoryDetail[];

    constructor(inventory: {
        id?: number;
        details: InventoryDetail[];
    }) {
        this.validate(inventory);
        this.id = inventory.id;
        this.details = inventory.details;
    }

    getId(): number | undefined {
        return this.id;
    }

    getDetails(): InventoryDetail[] {
        return this.details;
    }

    validate(inventory: { details: InventoryDetail[] }) {
        if (!inventory.details || inventory.details.length === 0) {
            console.error('Validation failed: Inventory must have at least one detail.');
            throw new Error('Inventory must have at least one detail');
        }
        console.log('Validation passed:', inventory.details);
    }

    static from({
        id,
        details,
    }: InventoryPrisma & { details: (InventoryDetailPrisma & { product?: ProductPrisma })[] }): Inventory {
        console.log('Mapping Inventory.from:', { id, details });
        return new Inventory({
            id,
            details: details.map((detail) => InventoryDetail.from(detail)),
        });
    }
    
}

