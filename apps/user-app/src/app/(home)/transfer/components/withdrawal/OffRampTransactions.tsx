"use client";

import React from "react";
import Transaction from "../Transaction";
import { useRecoilValueLoadable } from "recoil";
import Loader from "@/components/Loader";
import { RampTransaction } from "@prisma/client";
import { formatDate } from "@/utility/utils";
import { offRampTransactionsAtom } from "@/store/selectors/offRampTransactions";

const OffRampTransactions: React.FC = () => {
  const rampTxs = useRecoilValueLoadable(offRampTransactionsAtom);

  if (rampTxs.state == "loading") {
    return <Loader />;
  }

  const txs = rampTxs.contents as RampTransaction[];

  return (
    <div className="flex flex-col items-center p-2 lg:items-start mb-10">
      <div className="text-primaryText font-bold text-xl mb-5">
        Your Withdrawals
      </div>
      <div className="flex flex-col ml-2 mr-2 w-full lg:w-96 h-96 overflow-y-auto border border-gray-300 rounded-lg p-4 bg-gray-100 shadow-lg">
        {txs.length == 0 ? (
          <div className="h-full text-primaryText font-bold flex flex-col justify-center items-center">
            {" "}
            No Transactions{" "}
          </div>
        ) : (
          txs.map((rampTx, index) => (
            <Transaction
              key={index}
              date={formatDate(rampTx.date)}
              description={rampTx.providerBank}
              amount={-rampTx.amount}
              status={rampTx.txStatus}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default OffRampTransactions;
