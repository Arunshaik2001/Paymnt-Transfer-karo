"use client";

import sessionAtom from "@/store/atoms/sessionAtom";
import { formatCurrency, getGreeting } from "@/utility/utils";
import { useRecoilValue } from "recoil";

export default function HomePage() {
  const user = useRecoilValue(sessionAtom);

  return (
    <>
      <div className="w-full flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-gradient-to-r from-blue-500 to-green-500 shadow-2xl rounded-2xl p-10 max-w-md w-full">
          <div className="text-white font-bold text-2xl">
            {getGreeting()}, {user?.name}
          </div>
          <div className="pt-8 font-bold text-xl text-white">
            Your Wallet Balance :
          </div>
          <div className="pt-5 font-bold text-xl text-yellow-300">
            {formatCurrency(user?.balance!)}
          </div>
        </div>
      </div>
    </>
  );
}
