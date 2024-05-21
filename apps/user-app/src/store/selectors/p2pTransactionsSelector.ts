import { selector } from "recoil";
import sessionAtom from "../atoms/sessionAtom";
import getP2PTransactions from "@/actions/getP2PTransactions";

export const p2pRampTransactionsAtom = selector({
  key: "P2PTransactionsAtomSelector",
  get: async (prop) => {
    const sessionUser = prop.get(sessionAtom);

    if (sessionUser?.upiId) {
      const transactions = await getP2PTransactions(sessionUser!.upiId!);

      return (transactions ?? []).sort((a, b) => {
        return b.date.getTime() - a.date.getTime();
      });
    }
    return [];
  },
});
