// inventory.service.ts
import { InventoryRepository } from '../repository/inventory.db';
import { Product } from '../model/product';
import { Inventory } from '../model/inventory';

export class InventoryService {
    private inventoryRepository: InventoryRepository;

    constructor() {
        this.inventoryRepository = new InventoryRepository();
    }

    public async addInventory(product: Product, quantity: number): Promise<Inventory> {
        return await this.inventoryRepository.addInventory(product, quantity);
    }

    public async getAllInventories(): Promise<Inventory[]> {
        return await this.inventoryRepository.getAllInventories();
    }

    public async updateInventoryQuantity(product: Product, quantity: number): Promise<void> {
        await this.inventoryRepository.updateInventoryQuantity(product, quantity);
    }

    public async findInventoryByProduct(product: Product): Promise<Inventory | undefined> {
        return await this.inventoryRepository.findInventoryByProduct(product);
    }
}
