import { selector } from "recoil";
import { offRampTransactionsAtom } from "./offRampTransactions";
import { onRampTransactionsAtom } from "./onRampTransactionsAtom";


export const rampTransactionsSelector = selector({
  key: "RampTransactionsSelector",
  get: (prop) => {
    const onRampTransactions = prop.get(onRampTransactionsAtom);
    const offRampTransactions = prop.get(offRampTransactionsAtom);

    return [...onRampTransactions, ...offRampTransactions];
  },
});
