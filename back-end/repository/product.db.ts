import { PrismaClient } from '@prisma/client';
import { Product } from '../model/product';
import database from '../util/database';


const getAllProducts = async(): Promise<Product[]> => {
    try {
        const productPrisma = await database.product.findMany();
        return productPrisma.map((prodPrisma) => Product.from(prodPrisma));
    } catch (error) {
        console.log(error);
        throw new Error("Database Error. See server log for details.")
    }
}

const getProductById = async({id}: {id: number}): Promise<Product | null> => {
    try {
        const productPrisma = await database.product.findUnique({
            where: { id }
        });
        return productPrisma ? Product.from(productPrisma) : null;
    } catch (error) {
        console.log(error);
        throw new Error("Database Error. See server log for details.");
    }
}

const createProduct = async(product: Product): Promise<Product>=> {
    try {
        const productPrisma = await database.product.create({
            data:{
                name: product.getName(),
                description: product.getDescription(),
                location: product.getLocation(),
            }
        });
        return Product.from(productPrisma);
    } catch (error) {
        console.log(error);
        throw new Error("Database Error. See server log for details.");
    }
}

const deleteProduct = async(id: number): Promise<Product | null> => {
    try {
        const productPrisma = await database.product.delete({
            where: { id }
        })
        return productPrisma ? Product.from(productPrisma): null;
    } catch (error) {
        console.log(error);
        throw new Error("Database Error. See server log for details.");
    }
}

export default{
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct
}
