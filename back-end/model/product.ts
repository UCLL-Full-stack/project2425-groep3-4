export class Product {
    private productId: number;
    private name: string;
    private description: string;
    private location: string;

    constructor(productId: number, name: string, description: string, location: string) {
        this.productId = productId;
        this.name = name;
        this.description = description;
        this.location = location;
    }

    public getProductId(): number {
        return this.productId;
    }

    public setProductId(productId: number): void {
        this.productId = productId;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getLocation(): string {
        return this.location;
    }

    public setLocation(location: string): void {
        this.location = location;
    }

    public toString(): string {
        return `Product [ID: ${this.productId}, Name: ${this.name}, Location: ${this.location}]`;
    }
}
