"use client";

import sessionAtom from "@/store/atoms/sessionAtom";
import { formatCurrency, getGreeting } from "@/utility/utils";
import { useRecoilValue } from "recoil";
import QRCodeWithCopy from "./QrCode";

export default function HomePage() {
  const user = useRecoilValue(sessionAtom);

  return (
    <div className="w-full flex flex-col justify-center md:justify-around lg:flex-row lg:justify-around items-center min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-blue-500 to-green-500 shadow-2xl rounded-2xl m-2 p-10 md:max-w-md md:w-full mb-4 md:mb-0">
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
      <div>
        <QRCodeWithCopy upiId={user?.upiId!} />
      </div>
    </div>
  );
}
