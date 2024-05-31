"use client";

import React from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import Loader from "@/components/Loader";
import { P2PTransaction, RampTransaction } from "@prisma/client";
import { formatDate } from "@/utility/utils";
import Transaction from "../../transfer/components/Transaction";
import { p2pRampTransactionsAtom } from "@/store/selectors/p2pTransactionsSelector";
import sessionAtom from "@/store/atoms/sessionAtom";

const P2PTransactions: React.FC = () => {
  const rampTxs = useRecoilValueLoadable(p2pRampTransactionsAtom);
  const userSession = useRecoilValue(sessionAtom);

  if (rampTxs.state == "loading") {
    return <Loader />;
  }

  const txs = rampTxs.contents as P2PTransaction[];

  const upiId = userSession?.upiId;

  return (
    <div className="flex flex-col items-center md:items-start mb-10">
      <div className="text-primaryText font-bold text-xl mb-5">
        Your Deposits
      </div>
      <div className="w-96 h-96 overflow-y-auto border border-gray-300 rounded-lg p-4 bg-gray-100 shadow-lg">
        {(txs.length == 0) ? <div className="h-full text-primaryText font-bold flex flex-col justify-center items-center"> No Transactions </div> : txs.map((rampTx, index) => (
          <Transaction
            key={index}
            date={formatDate(rampTx.date)}
            description={`${upiId == rampTx.fromUpiId ? `To: ${rampTx.toUpiId}` : `From: ${rampTx.fromUpiId}`}`}
            amount={upiId != rampTx.fromUpiId ? rampTx.amount : -rampTx.amount}
            status={rampTx.status}
          />
        ))}
      </div>
    </div>
  );
};

export default P2PTransactions;
