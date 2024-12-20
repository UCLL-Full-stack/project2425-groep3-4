import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { set } from "date-fns";
import { connect } from "http2";

const prisma = new PrismaClient();

const main = async() => {
    await prisma.user.deleteMany();
    await prisma.inventory.deleteMany();
    await prisma.order.deleteMany();
    await prisma.orderDetail.deleteMany();
    await prisma.product.deleteMany();

    const hashedPassword = await bcrypt.hash("password", 12);

        const admin = await prisma.user.create({
            data: {
                username: "admin",
                email: "admin@example.com",
                password: await bcrypt.hash("admin123", 12),
                role: "admin",
            },
        });
    
        const user = await prisma.user.create({
            data: {
                username: "user1",
                email: "user1@example.com",
                password: await bcrypt.hash("user123", 12),
                role: "user",
            },
        });

        const products = await prisma.product.createMany({
            data: [
                {
                    name: "Product A",
                    description: "High-quality product A",
                    location: "Shelf 1",
                },
                {
                    name: "Product B",
                    description: "Durable and reliable product B",
                    location: "Shelf 2",
                },
                {
                    name: "Product C",
                    description: "Eco-friendly product C",
                    location: "Shelf 3",
                },
            ],
        });
    
        const inventory = await prisma.inventory.create({
            data: {
                details: {
                    create: [
                        {
                            productId: 1,
                            quantity: 50,
                        },
                        {
                            productId: 2,
                            quantity: 30,
                        },
                    ],
                },
            },
        });
    
  
        const order = await prisma.order.create({
            data: {
                userId: user.id,
                status: 'recieved',
                creationDate: new Date(),
                orderDetails: {
                    create: [
                        {
                            productId: 1,
                            quantity: 2,
                        },
                        {
                            productId: 3,
                            quantity: 1,
                        },
                    ],
                },
            },
        });
    };

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