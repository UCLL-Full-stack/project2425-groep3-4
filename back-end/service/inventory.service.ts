// inventory.service.ts
import { Product } from '../model/product';
import { Inventory } from '../model/inventory';
import * as dotenv from 'dotenv';
dotenv.config();

export class InventoryService {
    private inventoryRepository: any;

    constructor() {
        if (process.env.NODE_ENV === 'local') {
            this.inventoryRepository = new (require('../repository/memoryRepository/inventory.db').InventoryRepository)();
        } else if (process.env.NODE_ENV === 'dev') {
            this.inventoryRepository = new (require('../repository/prosmaRepository/inventory.db').InventoryRepository)();
        } else {
            this.inventoryRepository = new (require('../repository/prosmaRepository/inventory.db').InventoryRepository)();
        }
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
