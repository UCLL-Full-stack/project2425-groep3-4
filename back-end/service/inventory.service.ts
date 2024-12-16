// inventory.service.ts
import { Product } from '../model/product';
import { Inventory } from '../model/inventory';
import * as dotenv from 'dotenv';
import inventoryDb from '../repository/inventory.db';
import productDb from '../repository/product.db';
import { InventoryInput, ProductInput } from '../types';
dotenv.config();

//New methods
const getAllInventory = async(): Promise<Inventory[]> => inventoryDb.getAllInventory();

const getInventoryById = async(id: number): Promise<Inventory | null> => {
    const inventory = await inventoryDb.getInventoryById({ id });
    if (!inventory) throw new Error(`Inventory with ${id} does not exist`);
    return inventory;
}

const getInventoryByProductId = async(id: number): Promise<Inventory | null> => {
    const inventory = await inventoryDb.getInventoryByProductId({ id });
    if (!inventory) throw new Error(`Inventory with ${id} does not exist`);
    return inventory;
}

const createInventory = async ({ quantity }: InventoryInput): Promise<Inventory> => {
    const inventory = new Inventory({ product: [], quantity });
    return await inventoryDb.createInventory(inventory);
}

const addProductsToInventory = async({
    inventory: inventoryInput,
    product: productInput,
}: {
    inventory: InventoryInput,
    product: ProductInput[],
}): Promise<Inventory | null> => {
    if(!inventoryInput.id) throw new Error('Inventory ID is required');
    if(!productInput.length) throw new Error('At least one product is required');

    const inventory = await inventoryDb.getInventoryById({ id: inventoryInput.id });
    if (!inventory) {
        throw new Error('Inventory not Found')
    }

    const products = await Promise.all(
        productInput.map(async (productInput) => {
            if(!productInput.id) throw new Error('Product id is required');
            const product = await productDb.getProductById({ id: productInput.id});
            if(!product) throw new Error('Product not Found');
            return product;
        })
    );

    products.forEach((prod) => {
        inventory.addProductsToInventory(prod);
    });

    return await inventoryDb.updateProductsOfInventory({ inventory });

};

const updateInventoryDetails = async ({
    inventoryId,
    quantity,
    products,
}: {
    inventoryId: number;
    quantity?: number; 
    products?: ProductInput[];
}): Promise<Inventory | null> => {
    const inventory = await inventoryDb.getInventoryById({ id: inventoryId });

    if (!inventory) {
        throw new Error('Inventory not found');
    }

    if (quantity !== undefined) {
        inventory.setQuantity(quantity);
    }

    if (products) {
        const validatedProducts = await Promise.all(
            products.map(async (productInput) => {
                if (!productInput.id) throw new Error('Product ID is required');
                const product = await productDb.getProductById({ id: productInput.id });
                if (!product) throw new Error(`Product with ID ${productInput.id} not found`);
                return product;
            })
        );
        inventory.setProducts(validatedProducts);
    }
    return await inventoryDb.updateProductsOfInventory({ inventory });
};

const deleteProductsFromInventory = async ({
    inventoryId,
    productId,
}: {
    inventoryId: number;
    productId: number[];
}): Promise<Inventory | null> => {
    const inventory = await inventoryDb.getInventoryById({ id: inventoryId });

    if (!inventory) {
        throw new Error('Inventory not found');
    }

    if (!productId.length) {
        throw new Error('At least one product ID is required');
    }
    const updatedProducts = inventory.getProduct().filter((product) => { 
        const productIdToCheck = product.getId();  
        return productIdToCheck !== undefined && !productId.includes(productIdToCheck);  
    });
    inventory.setProducts(updatedProducts);
    return await inventoryDb.updateProductsOfInventory({ inventory });
};

export default {
    getAllInventory,
    getInventoryById,
    getInventoryByProductId,
    createInventory,
    addProductsToInventory,
    updateInventoryDetails,
    deleteProductsFromInventory
}




// //Original
// export class InventoryService {
//     private inventoryRepository: any;

//     constructor() {
//         if (process.env.NODE_ENV === 'local') {
//             this.inventoryRepository = new (require('../repository/memoryRepository/inventory.db').InventoryRepository)();
//         } else if (process.env.NODE_ENV === 'dev') {
//             this.inventoryRepository = new (require('../repository/prismaRepository/inventory.db').InventoryRepository)();
//         } else {
//             this.inventoryRepository = new (require('../repository/memoryRepository/inventory.db').InventoryRepository)();
//         }
//     }
//     public async addInventory(product: Product, quantity: number): Promise<Inventory> {
//         return await this.inventoryRepository.addInventory(product, quantity);
//     }

//     public async getAllInventories(): Promise<Inventory[]> {
//         return await this.inventoryRepository.getAllInventories();
//     }

//     public async updateInventoryQuantity(product: Product, quantity: number): Promise<void> {
//         await this.inventoryRepository.updateInventoryQuantity(product, quantity);
//     }

//     public async findInventoryByProduct(product: Product): Promise<Inventory | undefined> {
//         return await this.inventoryRepository.findInventoryByProduct(product);
//     }
// }
