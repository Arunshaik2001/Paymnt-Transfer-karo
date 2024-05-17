/*
  Warnings:

  - A unique constraint covering the columns `[bankAccountNumber]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bankAccountNumber` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "bankAccountNumber" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_bankAccountNumber_key" ON "Account"("bankAccountNumber");
