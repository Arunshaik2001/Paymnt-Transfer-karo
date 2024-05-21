"use server";

import { Status } from "@prisma/client";
import prisma from "@repo/db/client";

export default async function transferP2P(
  fromUser: number,
  toUser: number,
  amount: number
) {
  try {
    console.log({ fromUser, toUser, amount });
    const fromUserData = await prisma.account.findUnique({
      where: { upiId: fromUser },
    });

    // console.log({ fromUserData });

    if (!fromUserData) {
      return { data: "No user exist" };
    }

    if ((fromUserData.balance ?? 0) < amount) {
      return { data: "Insufficient balance" };
    }

    const toUserData = await prisma.account.findUnique({
      where: { upiId: toUser },
    });

    if (!toUserData) {
      return { data: "No user exists to transfer" };
    }

    const transaction = await prisma.p2PTransaction.create({
      data: {
        toUpiId: toUser,
        amount: amount,
        fromUpiId: fromUser,
        status: Status.SUCCESS,
        date: new Date(),
      },
    });

    await prisma.account.update({
      where: { upiId: fromUser },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });

    await prisma.account.update({
      where: { upiId: toUser },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    console.log({
      data: {
        ...transaction,
      },
    });

    return {
      data: {
        ...transaction,
      },
    };
  } catch (error) {
    console.log(error);
  }
  return { data: "Unable to transfer" };
}
