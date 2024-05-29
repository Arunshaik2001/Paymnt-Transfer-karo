import getUserRampTransactions from "../../actions/getRampTransactions";
import { selector } from "recoil";
import sessionAtom from "../atoms/sessionAtom";

export const onRampTransactionsAtom = selector({
  key: "OnRampTransactionsAtomSelector",
  get: async (prop) => {
    const sessionUser = prop.get(sessionAtom);

    if (sessionUser?.userId) {
      const transactions = await getUserRampTransactions(
        sessionUser!.userId!,
        true
      );

      return (transactions ?? []).sort((a, b) => {
        return b.date.getTime() - a.date.getTime();
      });
    }
    return [];
  },
});
