// inventory.db.ts
import { Inventory } from "../model/inventory";
import { Product } from "../model/product";

export class InventoryRepository {
    private inventories: Inventory[] = []; 


    public async addInventory(product: Product, quantity: number): Promise<Inventory> {
        const inventory = new Inventory(product, quantity);
        this.inventories.push(inventory);
        return inventory;
    }


    public async findInventoryByProduct(product: Product): Promise<Inventory | undefined> {
        return this.inventories.find((inventory) => inventory.getProduct() === product);
    }


    public async updateInventoryQuantity(product: Product, quantity: number): Promise<void> {
        const inventory = await this.findInventoryByProduct(product);
        if (inventory) {
            inventory.setQuantity(quantity);
        }
    }


    public async getAllInventories(): Promise<Inventory[]> {
        return this.inventories;
    }
}
