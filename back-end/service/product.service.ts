import { ProductRepository } from '../repository/memoryRepository/product.db';
import { Product } from '../model/product';

export class ProductService {
    private productRepository: any;

    constructor() {
        if (process.env.NODE_ENV === 'local') {
            this.productRepository = new (require('../repository/memoryRepository/product.db').ProductRepository)();
        } else if (process.env.NODE_ENV === 'dev') {
            this.productRepository = new (require('../repository/prismaRepository/product.db').ProductRepository)();
        } else {
            this.productRepository = new (require('../repository/memoryRepository/product.db').ProductRepository)();
        }
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
