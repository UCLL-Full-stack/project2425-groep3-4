// inventory.db.ts
import { Inventory } from "../../model/inventory";
import { Product } from "../../model/product";

export class InventoryRepository {
    private inventories: Inventory[] = [
        new Inventory(new Product(1, 'Product A', 'Description A', 'Location A1'), 100),
        new Inventory(new Product(2, 'Product B', 'Description B', 'Location B1'), 50),
        new Inventory(new Product(3, 'Product C', 'Description C', 'Location C2'), 200),
    ];

    public async addInventory(product: Product, quantity: number): Promise<Inventory> {
        const inventory = new Inventory(product, quantity);
        this.inventories.push(inventory);
        return inventory;
    }


    public async findInventoryByProduct(product: Product): Promise<Inventory | undefined> {
        return this.inventories.find((inventory) => inventory.getProduct().getProductId() === product.getProductId());
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
