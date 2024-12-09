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

    setProducts(products: Product[]): void {
        this.product = products;
    }

    getQuantity(): number {
        return this.quantity;
    }

    setQuantity(quantity: number): void {
        if (quantity < 0) throw new Error('Quantity cannot be negative');
        this.quantity = quantity;
    }

    addProductsToInventory(product: Product) {
        if(!product) throw new Error('Product is required');
        this.product.push(product)
    }

    removeProductsFromInventory(product: Product) {
        this.product = this.product.filter((p) => p.getId() !== product.getId());
    }

    validate(inventory: {
        quantity: number;
    }) { 
        if (!inventory.quantity) {
            throw new Error("Quantity is required")
        }
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
