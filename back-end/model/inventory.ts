import { ieNoOpen } from 'helmet';
import { Product } from './product';
import { 
    Inventory as InventoryPrisma,
    Product as ProductPrisma
} from "@prisma/client";

export class Inventory {
    readonly id?: number;
    readonly product: Product;
    readonly quantity: number;

    constructor(inventory: {
        id: number;
        product: Product; 
        quantity: number;
    
    }) {
        this.validate(inventory);
        this.id = inventory.id;
        this.product = inventory.product;
        this.quantity = inventory.quantity;
    }

    getId(): number | undefined {
        return this.id;
    }

    getProduct(): Product{
        return this.product;
    }

    getQuantity(): number {
        return this.quantity;
    }

    validate(inventory: {
        product: Product;
        quantity: number;
    }) { 
        if (!inventory.product) {
            throw new Error("No products in inventory")
        }
        if (!inventory.quantity) {
            throw new Error("Quantity is required")
        }
    }

    equals(inventory: Inventory): boolean {
        return(
            this.product === inventory.getProduct() &&
            this.quantity === inventory.getQuantity()
        );
    };

    static from({
        id,
        product,
        quantity
    }: InventoryPrisma & {product: ProductPrisma}) {
        return new Inventory({
            id,
            product: Product.from(product),
            quantity
        });
    }
}
