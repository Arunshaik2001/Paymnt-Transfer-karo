import { AccountType, AuthType } from "@prisma/client";
import { atom } from "recoil";

interface SessionUser {
  userId: number;
  name: string | null;
  upiId: number | null;
  bankAccountNumber: number | null;
  userVerified: boolean;
  authType: AuthType;
  balance: number | null;
  accountType: AccountType;
}

const sessionAtom = atom<SessionUser | null>({
  key: "sessionAtom",
  default: null,
});

export default sessionAtom;
