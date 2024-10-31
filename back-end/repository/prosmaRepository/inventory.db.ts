import { PrismaClient } from '@prisma/client';
import { Product } from '../../model/product';
import { Inventory } from '../../model/inventory';

export class PrismaInventoryRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public async addInventory(product: Product, quantity: number): Promise<Inventory> {
        const createdInventory = await this.prisma.inventory.create({
            data: {
                productId: product.getProductId(),
                quantity: quantity,
            },
        });
        return new Inventory(product, createdInventory.quantity);
    }

    public async findInventoryByProduct(product: Product): Promise<Inventory | undefined> {
        const foundInventory = await this.prisma.inventory.findUnique({
            where: {
                productId: product.getProductId(),
            },
            include: {
                product: true,
            },
        });

        return foundInventory ? new Inventory(new Product(foundInventory.productId, foundInventory.product.name, foundInventory.product.description, foundInventory.product.location), foundInventory.quantity) : undefined;
    }

    public async updateInventoryQuantity(product: Product, quantity: number): Promise<void> {
        await this.prisma.inventory.update({
            where: {
                productId: product.getProductId(),
            },
            data: {
                quantity: quantity,
            },
        });
    }

    public async getAllInventories(): Promise<Inventory[]> {
        const inventories = await this.prisma.inventory.findMany({
            include: {
                product: true,
            },
        });
    
        return inventories.map((inv: { productId: number; quantity: number; product: { name: string; description: string; location: string } }) =>
            new Inventory(
                new Product(inv.productId, inv.product.name, inv.product.description, inv.product.location),
                inv.quantity
            )
        );
    }
    
}
