import { PrismaClient } from '@prisma/client';
import { Product } from '../model/product';
import { Inventory } from '../model/inventory';
import database from '../util/database';


const getAllInventory = async(): Promise<Inventory[]> => {
    try {
        const inventoryPrisma = await database.inventory.findMany({
            include: {
                product: { include: { }},
            }
        });
        return inventoryPrisma.map((inventoryPrisma) => Inventory.from(inventoryPrisma))
        
    } catch (error) {
        throw new Error('Database error. See server logs for details');
    }

}

const getInventoryById = async({id}: {id: number}): Promise<Inventory> => {
    try {
        const inventoryPrisma = await database.inventory.findUnique({
            where: { id },
            include:{
                product: true,
            },
        });
        return Inventory.from(inventoryPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details')
    }
}

const createInventory = async(inventory: Inventory): Promise<Inventory> => {
    try {
        const inventoryPrisma = database.inventory.create({
            data: {
                id: inventory.getId(),
                quantity: inventory.getQuantity(),
                product: {
                    connect: { id: inventory.getProduct().getId() },
                },
            },
            include: {
                product: true,
            },
        });
        return Inventory.from(inventoryPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server logs for details');
    }

}

/*
const getInventoryByProduct = async({productId}: {productId: number}): Promise<Inventory | null> => {
    try {
        const inventoryPrisma = await database.inventory.findMany({
            where : {id: productId},
            include: {product: true},
        })
        return inventoryPrisma.map((inventoryPrisma) => Inventory.from(inventoryPrisma));
    } catch (error) {
        console.log(error);
        throw new Error("Database error see logs for details")
    }
    
}
*/

export default {
    getAllInventory,
    getInventoryById,
    createInventory
}
