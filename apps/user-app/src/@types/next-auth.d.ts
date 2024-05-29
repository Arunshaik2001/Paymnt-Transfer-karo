import { LoginResponse } from "@/types";
import { DefaultSession } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { AuthType, AccountType } from "@prisma/client";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      userId: number;
      name: string | null;
      upiId: number | null;
      bankAccountNumber: number | null;
      userVerified: boolean;
      authType: AuthType;
      balance: number | null;
      accountType: AccountType;
    } & DefaultSession["user"];
  }

  interface User {
    id: number;
    email: string;
    name: string | null;
    upiId: number | null;
    bankAccountNumber: number | null;
    userVerified: boolean;
    authType: AuthType;
    balance: number | null;
    accountType: AccountType;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    upiId: number | null;
    bankAccountNumber: number | null;
    userVerified: boolean;
    authType: AuthType;
    balance: number | null;
    accountType: AccountType;
  }
}
