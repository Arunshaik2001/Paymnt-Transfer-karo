import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";
import { LoginRequest } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const { email, password }: LoginRequest = await req.json();
    console.log(`${email} : ${password}`);
    const user = await prisma.account.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      const isMatching = await bcrypt.compare(password, user.password);

      if (isMatching) {
        return NextResponse.json(
          {
            message: "Success",
            user: {
              id: user.id,
              bankAccount: user.bankAccountNumber,
              balance: user.balance,
              upiId: user.upiId,
              userName: user.name,
              email: user.email,
            },
          },
          {
            status: 200,
          }
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json(
    { message: "Unable to log in user" },
    { status: 400 }
  );
}
