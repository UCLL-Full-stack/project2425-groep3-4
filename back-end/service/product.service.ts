import { Product } from '../model/product';
import { PrismaProductRepository } from '../repository/product.db';

export class ProductService {
    private productRepository: PrismaProductRepository;
    
    constructor(productRepository: PrismaProductRepository) {
        this.productRepository = productRepository;
    }

    public async addProduct(product: Product): Promise<Product> {
        return await this.productRepository.addProduct(product);
    }

    public async getProductById(productId: number): Promise<Product | undefined> {
        return await this.productRepository.getProductById(productId);
    }

    public async getAllProducts(): Promise<Product[]> {
        return await this.productRepository.getAllProducts();
    }

    public async updateProduct(productId: number, updatedProduct: { name?: string; description?: string; location?: string }): Promise<Product | undefined> {
        return await this.productRepository.updateProduct(productId, updatedProduct);
    }

    public async deleteProduct(productId: number): Promise<boolean> {
        return await this.productRepository.deleteProduct(productId);
    }
}
