 import { Inventory } from "./inventory";
import { Order } from "./order";
import { OrderDetail } from "./orderDetail";
import { 
    Product as ProductPrisma, 
    OrderDetail as OrderDetailPrisma,
    Inventory as InventoryPrisma
} from "@prisma/client";

export class Product {
    private id: number;
    private name: string;
    private description: string;
    private location: string;

    constructor(product: { id: number; name: string; description: string; location: string }) {
        this.validate(product); 
        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.location = product.location;
    }
    

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getLocation(): string {
        return this.location;
    }

    validate(product: {
        name: string;
        description: string;
        location: string;
    }) {
        if (!product.name?.trim()) {
            throw new Error("Name is required");
        }
        if (!product.description?.trim()) {
            throw new Error("Description is required");
        }
        if (!product.location?.trim()) {
            throw new Error("Location is required");
        }
    }

    equals(product: Product): boolean {
        return(
            this.name === product.getName() &&
            this.description === product.getDescription() &&
            this.location === product.getLocation()
        );
    };

    static from({
        id, 
        name,
        description,
        location
    }: ProductPrisma) {
        return new Product({
            id,
            name,
            description,
            location
        });
    }
}
