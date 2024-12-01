import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { set } from "date-fns";
import { connect } from "http2";

const prisma = new PrismaClient();

const main = async() => {
    await prisma.user.deleteMany();
    await prisma.inventory.deleteMany();
    await prisma.order.deleteMany();
    await prisma.shipment.deleteMany();
    await prisma.orderDetail.deleteMany();
    await prisma.product.deleteMany();

    const hashedPassword = await bcrypt.hash("password", 12);

    const admin = await prisma.user.create({
        data: {
            username: "admin",
            email: "admin@email.com",
            password: await bcrypt.hash("admin123", 12),
            role: 'admin',
        }
    });

    const manager = await prisma.user.create({
        data: {
            username: "managerJohn",
            email: "john@example.com",
            password: await bcrypt.hash("john123", 12),
            role: 'manager'
        }
    });

    const employee = await prisma.user.create({
        data: {
            username: "maria",
            email: "maria@example.com",
            password: await bcrypt.hash("maria123", 12),
            role: 'employee'
        }
    });

    const shipmentbrook = await prisma.user.create({
        data: {
            username: "brook",
            email: "brook@exapmle.com",
            password: await bcrypt.hash("brook123", 12),
            role: "shipment"
        }
    });

    const gonzales = await prisma.user.create({
        data: {
            username: "gonzales",
            email: "gonzales@example.com",
            password: await bcrypt.hash("gonzales123", 12),
            role: 'user'
        }
    });
    /*

    const productData = {
        name: "Bananas",
        description: "Fresh handpicked Bananas from brazil",
        location: "Zone 1",
    };

    const product = await prisma.product.create({
        data: productData
    });

    const inventory = await prisma.inventory.create({
        data: {
            product:{
                connect: { id: product.id}
            },
            quantity: 100000
        }
    });


    await prisma.inventory.update({
        where: {id: inventory.id},
        data: {
            product: { 
                connect: { id: product.id}
            }
        }
    });

    const order = await prisma.order.create({
        data: {
            user: {
                connect: {id: gonzales.id}
            },
            status: 'recieved',
            creationDate: set(new Date(), { hours: 12, minutes: 55}),
            orderDetail: {
                connect: [{ id: orderDetail.id }],
            },
            shipment: {
                connect: [{ id: shipment.id }],
            },
        }
    });

    const orderDetail = await prisma.orderDetail.create({
        data: {
            quantity: 10000,
            product: {
                connect: { id: product.id },
            },
        }
    });

    await prisma.orderDetail.update({
        where: { id: orderDetail.id },
        data: {
            order: { 
                connect: { id: order.id } 
            },
    },
    });

    const shipment = await prisma.shipment.create({
        data: {
            status: 'shipping',
            shippedDate: set(new Date(), { hours: 5, minutes: 45}),
            order: {
                connect: { id: order.id },
            }
        }
    });

    await prisma.order.update({
        where: { id: order.id },
        data: {
            shipment: {
                connect: [{ id: shipment.id }],
            },
        },
    });
    */
}

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();