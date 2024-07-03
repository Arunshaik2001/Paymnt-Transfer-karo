import {
  Status,
  BankName,
  RampTransactionType,
  AuthType,
  AccountType,
} from "@prisma/client";
import prisma from "@repo/db/client";
import brcypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/../../../.env" })


async function main() {
  const userAccount = await prisma.account.upsert({
    where: {
      email: "arun@g.com",
      upiId: 1,
    },
    update: {},
    create: {
      name: "ArunShaik",
      password: await brcypt.hash("123456", 10),
      userVerified: true,
      authType: AuthType.EMAIL,
      accountType: AccountType.NORMAL_USER,
      balance: 100000,
      email: "arun@g.com",
      upiId: 1,
      bankAccountNumber: 1234567,
    },
  });

  const merchantAccount = await prisma.account.upsert({
    where: {
      email: "arun1@g.com",
      upiId: 2,
    },
    update: {},
    create: {
      name: "Shaik",
      password: await brcypt.hash("789456", 10),
      userVerified: true,
      authType: AuthType.GOOGLE,
      accountType: AccountType.MERCHANT,
      balance: 200000,
      email: "arun1@g.com",
      upiId: 2,
      bankAccountNumber: 789456,
    },
  });

  const firstP2PTx = await prisma.p2PTransaction.upsert({
    where: { txId: 1 },
    update: {},
    create: {
      fromUpiId: 1,
      toUpiId: 2,
      amount: 100,
      date: new Date(),
      status: Status.SUCCESS,
    },
  });

  const secondP2PTx = await prisma.p2PTransaction.upsert({
    where: { txId: 1 },
    update: {},
    create: {
      toUpiId: 1,
      fromUpiId: 2,
      amount: 50,
      date: new Date(),
      status: Status.FAILED,
    },
  });

  const onRampTransactionU1 = await prisma.rampTransaction.upsert({
    where: { txId: 1 },
    update: {},
    create: {
      onRampAccountId: 1,
      amount: 100000,
      providerBank: BankName.HDFC,
      txStatus: Status.SUCCESS,
      bankToken: "TOKEN_1",
      date: new Date(),
      transactionType: RampTransactionType.OnRamp,
    },
  });

  const offRampTransactionU2 = await prisma.rampTransaction.upsert({
    where: { txId: 2 },
    update: {},
    create: {
      offRampAccountId: 2,
      amount: 200000,
      providerBank: BankName.HDFC,
      txStatus: Status.SUCCESS,
      bankToken: "TOKEN_2",
      date: new Date(),
      transactionType: RampTransactionType.OffRamp,
    },
  });
}

main().finally(() => prisma.$disconnect());
