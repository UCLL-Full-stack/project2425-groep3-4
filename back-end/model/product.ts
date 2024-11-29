export class Product {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly location: string;

    constructor(id: number, name: string, description: string, location: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.location = location;
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

    public toString(): string {
        return `Product [ID: ${this.id}, Name: ${this.name}, Location: ${this.location}]`;
    }
}
