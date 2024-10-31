import { Product } from '../../model/product';

export class ProductRepository {
    private products: Product[] = [];

    public async addProduct(product: Product): Promise<Product> {
        this.products.push(product);
        return product;
    }

    public async getProductById(productId: number): Promise<Product | undefined> {
        return this.products.find(product => product.getProductId() === productId);
    }

    public async getAllProducts(): Promise<Product[]> {
        return this.products;
    }

    public async updateProduct(productId: number, updatedProduct: { name?: string; description?: string; location?: string }): Promise<Product | undefined> {
        const product = await this.getProductById(productId);
        if (product) {
            if (updatedProduct.name !== undefined) product.setName(updatedProduct.name);
            if (updatedProduct.description !== undefined) product.setDescription(updatedProduct.description);
            if (updatedProduct.location !== undefined) product.setLocation(updatedProduct.location);
        }
        return product;
    }
    

    public async deleteProduct(productId: number): Promise<boolean> {
        const initialLength = this.products.length;
        this.products = this.products.filter(product => product.getProductId() !== productId);
        return this.products.length < initialLength;
    }
}
