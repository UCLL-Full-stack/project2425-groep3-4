const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class ProductService {
    public async addProduct(product: {
        productId: number;
        name: string;
        description: string;
        location: string;
    }): Promise<any> {
        try {
            const response = await fetch(`${API_URL}/api/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to add product:', error);
            throw error;
        }
    }

    public async getAllProducts(): Promise<any> {
        try {
            const response = await fetch(`${API_URL}/api/products`);
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch products:', error);
            throw error;
        }
    }

    public async getProductById(productId: number): Promise<any> {
        try {
            const response = await fetch(`${API_URL}/api/products/${productId}`);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Product not found');
                }
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Failed to fetch product with ID ${productId}:`, error);
            throw error;
        }
    }

    public async updateProduct(productId: number, updatedProduct: {
        name?: string;
        description?: string;
        location?: string;
    }): Promise<any> {
        try {
            const response = await fetch(`${API_URL}/api/products/${productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Product not found');
                }
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Failed to update product with ID ${productId}:`, error);
            throw error;
        }
    }

    public async deleteProduct(productId: number): Promise<any> {
        try {
            const response = await fetch(`${API_URL}/api/products/${productId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Product not found');
                }
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Failed to delete product with ID ${productId}:`, error);
            throw error;
        }
    }
}
