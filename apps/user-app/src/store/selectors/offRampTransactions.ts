import getUserRampTransactions from "../../actions/getRampTransactions";
import { selector } from "recoil";
import sessionAtom from "../atoms/sessionAtom";

export const offRampTransactionsAtom = selector({
  key: "OffRampTransactionsAtomSelector",
  get: async (prop) => {
    const sessionUser = prop.get(sessionAtom);

    if (sessionUser?.userId) {
      const transactions = await getUserRampTransactions(
        sessionUser!.userId!,
        false
      );
      return (transactions ?? []).sort((a, b) => {
        return b.date.getTime() - a.date.getTime();
      });
    }
    return [];
  },
});
