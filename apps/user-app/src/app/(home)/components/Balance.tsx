'use client';

import sessionAtom from "@/store/atoms/sessionAtom";
import { formatCurrency } from "@/utility/utils";
import { useRecoilValue } from "recoil";


export default function Balance() {
    const user = useRecoilValue(sessionAtom);
  
    return (
      <div className="w-full flex flex-row justify-start items-center m-5">
        <div className="font-bold text-xl pr-5">
            Your Wallet Balance : 
          </div>
          <div className="font-bold text-xl text-primaryText">
            {formatCurrency(user?.balance!)}
          </div>
      </div>
    );
  }