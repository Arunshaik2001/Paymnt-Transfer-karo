"use client";

import DepositMoney from "./DepositMoney";
import OnRampTransactions from "./OnRampTransactions";

export default function DepositTab() {
  return (
    <>
      <div className="flex w-full justify-around flex-col md:flex-row ">
        <DepositMoney />
        <OnRampTransactions/>
      </div>
    </>
  );
}
