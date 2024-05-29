/*
  Warnings:

  - A unique constraint covering the columns `[bankToken]` on the table `RampTransaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RampTransaction_bankToken_key" ON "RampTransaction"("bankToken");
