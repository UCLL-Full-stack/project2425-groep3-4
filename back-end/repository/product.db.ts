import { PrismaClient } from '@prisma/client';
import { Product } from '../model/product';

export class PrismaProductRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public async addProduct(product: Product): Promise<Product> {
        const createdProduct = await this.prisma.product.create({
            data: {
                name: product.getName(),
                description: product.getDescription(),
                location: product.getLocation(),
            },
        });
        return new Product(createdProduct);
    }

    public async getProductById(productId: number): Promise<Product | undefined> {
        const foundProduct = await this.prisma.product.findUnique({
            where: { id: productId },
        });
        return foundProduct ? new Product(foundProduct) : undefined;
    }

    public async getAllProducts(): Promise<Product[]> {
        const products = await this.prisma.product.findMany();
        return products.map(product => new Product(product));
    }

    public async updateProduct(productId: number, updatedProduct: { name?: string; description?: string; location?: string }): Promise<Product | undefined> {
        const updated = await this.prisma.product.update({
            where: { id: productId },
            data: updatedProduct,
        });
        return updated ? new Product(updated) : undefined;
    }

    public async deleteProduct(productId: number): Promise<boolean> {
        try {
            await this.prisma.product.delete({
                where: { id: productId },
            });
            return true;
        } catch (error) {
            console.error('Error deleting product:', error);
            return false;
        }
    }
}
