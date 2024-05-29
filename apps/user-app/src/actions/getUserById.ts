"use server";

import prisma from "@repo/db/client";

export default async function getUserById(userID: number) {
  try {
    const user = await prisma.account.findUnique({
      where: {
        id: Number(userID),
      },
    });

    if (user) {
      return user;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}
