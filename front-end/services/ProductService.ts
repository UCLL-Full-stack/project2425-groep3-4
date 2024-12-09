import { Product } from "@types";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    console.error('Environment variable NEXT_PUBLIC_API_URL is not defined.')
    throw new Error('Environment variable NEXT_PUBLIC_API_URL is not defined.');
} else {
    console.log(`API_URL: ${API_URL}`);
}


export class ProductService {
    private static async request<T>(url: string, options?: RequestInit): Promise<T> {
        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Not Found');
                }
                throw new Error(`Error: ${response.status}`);
            }

            if (response.status === 204) {
                return undefined as unknown as T;
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`HTTP request failed: ${error}`);
            throw error;
        }
    }

    public static async addProduct(product: Omit<Product, 'id'>): Promise<Product> {
        return this.request<Product>(`${API_URL}/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
    }

    public static async getAllProducts(): Promise<Product[]> {
        const response = await fetch(`${API_URL}/api/products`);
        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        return response.json();
    }

    public static async getProductById(id: number): Promise<Product> {
        return this.request<Product>(`${API_URL}/api/products/${id}`);
    }

    public static async updateProduct(id: number, updatedProduct: Partial<Product>): Promise<Product> {
        return this.request<Product>(`${API_URL}/api/products/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });
    }

    public static async deleteProduct(id: number): Promise<boolean> {
        await this.request<void>(`${API_URL}/api/products/${id}`, {
            method: 'DELETE',
        });
        return true;
    }
}
