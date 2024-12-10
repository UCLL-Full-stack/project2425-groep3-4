import { da } from 'date-fns/locale';
import { Product } from '../model/product';
import { ProductInput } from '../types';
import productDb from '../repository/product.db';
import database from '../util/database';


//new 
const getAllProducts = async(): Promise<Product[]> => productDb.getAllProducts();

const getProductById = async(id: number): Promise<Product | null> => {
    const product = await productDb.getProductById({id});
    if(!product) throw new Error(`No products with id: ${id}`)
    return product;
}

const createProduct = async({
    name,
    description,
    location
}: ProductInput): Promise<Product>=> {
    const product = new Product({ name, description, location});
    return await productDb.createProduct(product);
}

const deleteProduct = async(id: number): Promise<Product | null> => {
    const product = await productDb.deleteProduct(id);
    if(!product) throw new Error('Product could not be deleted')
    return product;
}

const updateProduct = async(product: Product): Promise<Product | undefined> => {
    const updatedProduct = await productDb.updateProduct(product);
    if (!updatedProduct)  throw new Error('Product could not be deleted')
    return updatedProduct;
}

export default {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
}

//Original
// export class ProductService {
//     private productRepository: PrismaProductRepository;
    
//     constructor(productRepository: PrismaProductRepository) {
//         this.productRepository = productRepository;
//     }

//     public async addProduct(product: Product): Promise<Product> {
//         return await this.productRepository.addProduct(product);
//     }

//     public async getProductById(productId: number): Promise<Product | undefined> {
//         return await this.productRepository.getProductById(productId);
//     }

//     public async getAllProducts(): Promise<Product[]> {
//         return await this.productRepository.getAllProducts();
//     }

//     public async updateProduct(productId: number, updatedProduct: { name?: string; description?: string; location?: string }): Promise<Product | undefined> {
//         return await this.productRepository.updateProduct(productId, updatedProduct);
//     }

//     public async deleteProduct(productId: number): Promise<boolean> {
//         return await this.productRepository.deleteProduct(productId);
//     }
// }
