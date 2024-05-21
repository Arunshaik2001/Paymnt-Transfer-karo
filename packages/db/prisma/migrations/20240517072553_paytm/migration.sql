/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
ADD COLUMN     "userId" SERIAL NOT NULL,
ALTER COLUMN "userName" DROP NOT NULL,
ALTER COLUMN "upiId" DROP NOT NULL,
ALTER COLUMN "balance" DROP NOT NULL,
ALTER COLUMN "bankAccountNumber" DROP NOT NULL,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("userId");
