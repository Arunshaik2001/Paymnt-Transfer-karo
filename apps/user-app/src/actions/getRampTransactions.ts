"use server";

import prisma from "@repo/db/client";

export default async function getUserRampTransactions(
  userId: number,
  isOnRamp: boolean
) {
  try {
    const transactions = await prisma.rampTransaction.findMany({
      where: isOnRamp
        ? { onRampAccountId: userId }
        : { offRampAccountId: userId },
    });

    return transactions;
  } catch (error) {
    console.log(error);
  }
  return null;
}
