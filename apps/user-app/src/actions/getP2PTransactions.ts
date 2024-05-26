"use server";

import prisma from "@repo/db/client";

export default async function getP2PTransactions(upiId: number) {
  try {
    const transactions = await prisma.p2PTransaction.findMany({
      where: {
        OR: [
          {
            fromUpiId: upiId,
          },
          {
            toUpiId: upiId,
          },
        ],
      },
    });
    return transactions;
  } catch (error) {
    console.log(error);
  }
  return null;
}
