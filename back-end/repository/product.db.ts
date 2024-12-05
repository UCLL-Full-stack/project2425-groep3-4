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
        return new Product(createdProduct.productId, createdProduct.name, createdProduct.description, createdProduct.location);
    }

    public async getProductById(productId: number): Promise<Product | undefined> {
        const foundProduct = await this.prisma.product.findUnique({
            where: { productId },
        });
        return foundProduct ? new Product(foundProduct.productId, foundProduct.name, foundProduct.description, foundProduct.location) : undefined;
    }

    public async getAllProducts(): Promise<Product[]> {
        const products = await this.prisma.product.findMany();
        return products.map(product => new Product(product.productId, product.name, product.description, product.location));
    }

    public async updateProduct(productId: number, updatedProduct: { name?: string; description?: string; location?: string }): Promise<Product | undefined> {
        const updated = await this.prisma.product.update({
            where: { productId },
            data: updatedProduct,
        });
        return updated ? new Product(updated.productId, updated.name, updated.description, updated.location) : undefined;
    }

    public async deleteProduct(productId: number): Promise<boolean> {
        try {
            await this.prisma.product.delete({
                where: { productId },
            });
            return true;
        } catch (error) {
            console.error('Error deleting product:', error);
            return false;
        }
    }
}
