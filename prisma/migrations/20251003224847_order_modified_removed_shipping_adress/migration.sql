/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `orderAddressId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAddressId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_shippingAddressId_fkey";

-- DropIndex
DROP INDEX "public"."Order_userId_idx";

-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "createdAt",
DROP COLUMN "orderAddressId",
DROP COLUMN "shippingAddressId",
DROP COLUMN "updatedAt",
ADD COLUMN     "userAddressId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_userAddressId_fkey" FOREIGN KEY ("userAddressId") REFERENCES "public"."UserAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;
