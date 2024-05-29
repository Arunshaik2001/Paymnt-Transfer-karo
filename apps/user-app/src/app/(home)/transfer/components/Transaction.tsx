// components/Transaction.tsx
import React from "react";

interface TransactionProps {
  date: string;
  description: string;
  amount: number;
  status: string;
}

const Transaction: React.FC<TransactionProps> = ({
  date,
  description,
  amount,
  status,
}) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-sm rounded-lg mb-2 hover:bg-gray-50 transition-colors">
      <div>
        <div className="text-gray-700 font-bold">{date}</div>
        <div className="text-gray-400 font-semibold">{description}</div>
        <div
          className={status !== "FAILED" ? "text-green-500" : "text-red-500"}
        >
          {status}
        </div>
      </div>
      <div
        className={`text-lg font-bold ${amount >= 0 ? (status !== "FAILED" ? "text-green-500" : "text-red-500") : "text-red-500"}`}
      >
        {`${amount >= 0 ? `+ Rs ${amount}` : ` ${amount} Rs`}`}
      </div>
    </div>
  );
};

export default Transaction;
