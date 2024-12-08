import { ieNoOpen } from 'helmet';
import { Product } from './product';
import { 
    Inventory as InventoryPrisma,
    Product as ProductPrisma
} from "@prisma/client";

export class Inventory {
    private id?: number;
    private product: Product[];
    private quantity: number;

    constructor(inventory: {
        id?: number;
        product: Product[]; 
        quantity: number;
    
    }) {
        this.validate(inventory);
        this.id = inventory.id;
        this.product = inventory.product || [];
        this.quantity = inventory.quantity;
    }

    getId(): number | undefined {
        return this.id;
    }

    getProduct(): Product[]{
        return this.product;
    }

    getQuantity(): number {
        return this.quantity;
    }

    validate(inventory: {
        quantity: number;
    }) { 
        if (!inventory.quantity) {
            throw new Error("Quantity is required")
        }
    }

    addProductsToInventory(product: Product) {
        if(!product) throw new Error('Product is required');
        this.product.push(product)
    }

    equals(inventory: Inventory): boolean {
        return(
            this.product.every((prod, index) => prod.equals(inventory.getProduct()[index])) &&
            this.quantity === inventory.getQuantity()
        );
    };

    static from({
        id,
        product,
        quantity
    }: InventoryPrisma & {product: ProductPrisma[]}) {
        return new Inventory({
            id,
            product: product.map((prod) => Product.from(prod)),
            quantity
        });
    }
}
