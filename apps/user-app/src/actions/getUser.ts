"use server";

import prisma from "@repo/db/client";
import bcrypt from "bcrypt";

export default async function getUser(email: string, password: string) {
  try {
    console.log(`${email} : ${password}`);
    const user = await prisma.account.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      const isMatching = await bcrypt.compare(password!, user.password);
      if (isMatching) {
        return user;
      }
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}
