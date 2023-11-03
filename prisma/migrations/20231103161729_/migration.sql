-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_transactionId_fkey";

-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "transactionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
