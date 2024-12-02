 import { Inventory } from "./inventory";
import { Order } from "./order";
import { OrderDetail } from "./orderDetail";
import { 
    Product as ProductPrisma, 
    OrderDetail as OrderDetailPrisma,
    Inventory as InventoryPrisma
} from "@prisma/client";

export class Product {
    readonly id?: number;
    readonly name: string;
    readonly description: string;
    readonly location: string;
    readonly orderdetail: OrderDetail[];
    readonly inventory: Inventory[];


    constructor(product: {
        id: number;
        name: string; 
        description: string; 
        location: string; 
        orderdetail: OrderDetail[]; 
        inventory: Inventory[];

    }) {
        this.validate(product);
        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.location = product.location;
        this.orderdetail = [];
        this.inventory = [];

    }


    public getId(): number | undefined {
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

    public getOrderDetail(): OrderDetail[] {
        return this.orderdetail;
    }

    public getInventory(): Inventory[] {
        return this.inventory;
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
        location,
        orderDetail,
        inventory,
    }: ProductPrisma & {orderDetail: OrderDetailPrisma, inventory: InventoryPrisma[]} ) {
        return new Product({
            id,
            name,
            description,
            location,
            orderdetail: OrderDetail.from(orderDetail),
            inventory: inventory.map((inventories) => Inventory.from(inventories))
        });
    }
}
