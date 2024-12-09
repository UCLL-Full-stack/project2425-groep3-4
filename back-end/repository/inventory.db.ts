import { PrismaClient } from '@prisma/client';
import { Product } from '../model/product';
import { Inventory } from '../model/inventory';
import database from '../util/database';
import { da } from 'date-fns/locale';


const getAllInventory = async(): Promise<Inventory[]> => {
    try {
        const inventoryPrisma = await database.inventory.findMany({
            include: {
                product: true,
            }
        }); 
        return inventoryPrisma.map((inventoryPrisma) => Inventory.from(inventoryPrisma))
        
    } catch (error) {
        throw new Error('Database error. See server logs for details');
    }

}

const getInventoryById = async({id}: {id: number}): Promise<Inventory | null> => {
    try {
        const inventoryPrisma = await database.inventory.findUnique({
            where: { id },
            include:{
                product: true,
            },
        });
        return inventoryPrisma ? Inventory.from(inventoryPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details')
    }
}

const getInventoryByProductId = async({id}: {id: number}): Promise<Inventory | null> => {
    try {
        const inventoryPrisma = await database.inventory.findFirst({
            where: {
                product: {
                    some: {
                        id: id,
                    }
                }
            },
            include: {
                product: true,
            }
        });
        return inventoryPrisma ? Inventory.from(inventoryPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server logs for details')
    }
}

const createInventory = async(inventory: Inventory): Promise<Inventory> => {
    try {
        const inventoryPrisma = await database.inventory.create({
            data: {
                quantity: inventory.getQuantity(),
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

const updateProductsOfInventory = async({
    inventory,
}: {inventory: Inventory}): Promise<Inventory | null> => {
    try {
        const inventoryPrisma = await database.inventory.update({
            where:{ id: inventory.getId() },
            data: {
                product: {
                    connect: inventory.getProduct().map((prod) => ({ id: prod.getId()}))
                }
            },
            include: {
                product: true,
            }
        })
        return inventoryPrisma ? Inventory.from(inventoryPrisma) : null
    } catch (error) {
        console.log(error);
        throw new Error("Database Error, See server logs for details. ");
    }

}



export default {
    getAllInventory,
    getInventoryById,
    getInventoryByProductId,
    createInventory,
    updateProductsOfInventory
}
