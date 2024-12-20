/*
  Warnings:

  - You are about to drop the column `quantity` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `inventoryId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_inventoryId_fkey";

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "inventoryId";

-- CreateTable
CREATE TABLE "InventoryDetail" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "inventoryId" INTEGER NOT NULL,

    CONSTRAINT "InventoryDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InventoryDetail" ADD CONSTRAINT "InventoryDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryDetail" ADD CONSTRAINT "InventoryDetail_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
