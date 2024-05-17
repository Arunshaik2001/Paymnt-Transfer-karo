-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('GOOGLE', 'EMAIl');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('INITIATED', 'PROCESSING', 'SUCCESS', 'FAILED');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('NORMAL_USER', 'MERCHANT');

-- CreateEnum
CREATE TYPE "BankName" AS ENUM ('HDFC', 'KOTAK');

-- CreateTable
CREATE TABLE "Account" (
    "emailId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "upiId" INTEGER NOT NULL,
    "userVerified" BOOLEAN NOT NULL,
    "authType" "AuthType" NOT NULL,
    "balance" INTEGER NOT NULL,
    "account" "AccountType" NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("emailId")
);

-- CreateTable
CREATE TABLE "OnRampTransaction" (
    "txId" SERIAL NOT NULL,
    "accountUpiId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "txStatus" "Status" NOT NULL,
    "bankToken" TEXT NOT NULL,
    "providerBank" "BankName" NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "OnRampTransaction_pkey" PRIMARY KEY ("txId")
);

-- CreateTable
CREATE TABLE "OffRampTransaction" (
    "txId" SERIAL NOT NULL,
    "accountUpiId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "txStatus" "Status" NOT NULL,
    "bankToken" TEXT NOT NULL,
    "providerBank" "BankName" NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "OffRampTransaction_pkey" PRIMARY KEY ("txId")
);

-- CreateTable
CREATE TABLE "P2PTransaction" (
    "txId" SERIAL NOT NULL,
    "fromUpiId" INTEGER NOT NULL,
    "toUpiId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "P2PTransaction_pkey" PRIMARY KEY ("txId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_emailId_key" ON "Account"("emailId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_upiId_key" ON "Account"("upiId");

-- AddForeignKey
ALTER TABLE "OnRampTransaction" ADD CONSTRAINT "OnRampTransaction_accountUpiId_fkey" FOREIGN KEY ("accountUpiId") REFERENCES "Account"("upiId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OffRampTransaction" ADD CONSTRAINT "OffRampTransaction_accountUpiId_fkey" FOREIGN KEY ("accountUpiId") REFERENCES "Account"("upiId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2PTransaction" ADD CONSTRAINT "P2PTransaction_fromUpiId_fkey" FOREIGN KEY ("fromUpiId") REFERENCES "Account"("upiId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2PTransaction" ADD CONSTRAINT "P2PTransaction_toUpiId_fkey" FOREIGN KEY ("toUpiId") REFERENCES "Account"("upiId") ON DELETE RESTRICT ON UPDATE CASCADE;
