/*
  Warnings:

  - You are about to drop the column `offRampAccountUpiId` on the `RampTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `onRampAccountUpiId` on the `RampTransaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "RampTransaction" DROP CONSTRAINT "RampTransaction_offRampAccountUpiId_fkey";

-- DropForeignKey
ALTER TABLE "RampTransaction" DROP CONSTRAINT "RampTransaction_onRampAccountUpiId_fkey";

-- AlterTable
ALTER TABLE "RampTransaction" DROP COLUMN "offRampAccountUpiId",
DROP COLUMN "onRampAccountUpiId",
ADD COLUMN     "offRampAccountId" INTEGER,
ADD COLUMN     "onRampAccountId" INTEGER;

-- AddForeignKey
ALTER TABLE "RampTransaction" ADD CONSTRAINT "RampTransaction_onRampAccountId_fkey" FOREIGN KEY ("onRampAccountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RampTransaction" ADD CONSTRAINT "RampTransaction_offRampAccountId_fkey" FOREIGN KEY ("offRampAccountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
