"use client";
import Tabs from "@/components/Tabs";
import WithdrawTab from "./components/withdrawal/WithdrawTab";
import DepositTab from "./components/deposits/DepositTab";

export default function Transfer() {
  const tabs = [
    { label: "Deposit", content: <DepositTab /> },
    { label: "Withdraw", content: <WithdrawTab /> },
  ];

  return (
    <>
      <div className="pt-10 w-full">
        <div className="text-primaryText text-2xl font-bold text-center md:text-start md:pl-5">Transfer</div>
        <Tabs tabs={tabs} />
      </div>
    </>
  );
}
