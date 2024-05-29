import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";
import { AuthType } from "@prisma/client";
import { generateRandom7DigitNumber } from "@/utility/utils";

export async function POST(req: NextRequest) {
  try {
    const { email, password, userName } = await req.json();
    console.log(`${email} : ${password}`);

    const user = await prisma.account.create({
      data: {
        email: email,
        password: await bcrypt.hash(password, 10),
        userVerified: true,
        accountType: "NORMAL_USER",
        authType: AuthType.EMAIL,
        balance: 100000,
        name: userName,
        upiId: generateRandom7DigitNumber(),
      },
    });

    if (user) {
      return NextResponse.json(
        { message: "Successfully registered." },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json(
    { message: "Unable to signUp user" },
    { status: 400 }
  );
}
