-- DropForeignKey
ALTER TABLE "InventoryDetail" DROP CONSTRAINT "InventoryDetail_inventoryId_fkey";

-- AddForeignKey
ALTER TABLE "InventoryDetail" ADD CONSTRAINT "InventoryDetail_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
