/*
  Warnings:

  - You are about to drop the `OffRampTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OnRampTransaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RampTransactionType" AS ENUM ('OnRamp', 'OffRamp');

-- DropForeignKey
ALTER TABLE "OffRampTransaction" DROP CONSTRAINT "OffRampTransaction_accountUpiId_fkey";

-- DropForeignKey
ALTER TABLE "OnRampTransaction" DROP CONSTRAINT "OnRampTransaction_accountUpiId_fkey";

-- DropTable
DROP TABLE "OffRampTransaction";

-- DropTable
DROP TABLE "OnRampTransaction";

-- CreateTable
CREATE TABLE "RampTransaction" (
    "txId" SERIAL NOT NULL,
    "onRampAccountUpiId" INTEGER,
    "offRampAccountUpiId" INTEGER,
    "date" TIMESTAMP(3) NOT NULL,
    "txStatus" "Status" NOT NULL,
    "bankToken" TEXT NOT NULL,
    "providerBank" "BankName" NOT NULL,
    "amount" INTEGER NOT NULL,
    "transactionType" "RampTransactionType" NOT NULL,

    CONSTRAINT "RampTransaction_pkey" PRIMARY KEY ("txId")
);

-- AddForeignKey
ALTER TABLE "RampTransaction" ADD CONSTRAINT "RampTransaction_onRampAccountUpiId_fkey" FOREIGN KEY ("onRampAccountUpiId") REFERENCES "Account"("upiId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RampTransaction" ADD CONSTRAINT "RampTransaction_offRampAccountUpiId_fkey" FOREIGN KEY ("offRampAccountUpiId") REFERENCES "Account"("upiId") ON DELETE SET NULL ON UPDATE CASCADE;
