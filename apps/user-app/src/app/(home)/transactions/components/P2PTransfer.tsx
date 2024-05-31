"use client";

import transferP2P from "@/actions/transferP2P";
import AppName from "@/components/AppName";
import Button from "@/components/Button";
import DropdownButton from "@/components/DropdownButton";
import TextFieldWithLabel from "@/components/TextFieldWithLabel";
import { authOptions } from "@/lib/auth";
import sessionAtom from "@/store/atoms/sessionAtom";
import { SignJWT } from "jose";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";
import { P2PTransaction } from "@prisma/client";

export default function P2PTransfer() {
  const { data: userSession, update } = useSession();

  const amountRef = useRef<HTMLInputElement | null>(null);

  const toUserRef = useRef<HTMLInputElement | null>(null);

  const [showAddButton, setShowAddButton] = useState(false);

  const validInputMap = useRef({
    amount: 0,
    toUser: 0,
  });

  const transfer = async () => {
    if (validInputMap.current.toUser == userSession?.user.upiId) {
      toast.warning("You can send to yourself...");
      return;
    }

    // console.log({
    //   upiId: userSession?.user.upiId!,
    //   toUser: validInputMap.current.toUser,
    //   amount: validInputMap.current.amount,
    // });

    const tx = await transferP2P(
      userSession?.user.upiId!,
      validInputMap.current.toUser,
      validInputMap.current.amount
    );

    if (!(tx.data instanceof String) && (tx.data as P2PTransaction).txId) {
      toast.success("Successfully Transferred...");
      await update({
        ...userSession,
        user: {
          ...userSession!.user,
          balance:
            (userSession!.user?.balance ?? 0) + validInputMap.current.amount,
        },
      });
    } else {
      toast.error(tx.data as String);
    }
  };

  function enableButton() {
    setShowAddButton(validInputMap.current.amount != 0);
  }

  return (
    <>
      <div className="flex flex-col m-2 gap-6 justify-center items-center shadow-lg border border-gray-200 rounded-xl p-8 bg-white mt-10 mb-10">
        <AppName
          title="Transfer P2P"
          className="text-3xl font-semibold text-blue-600 mb-6"
        />

        <TextFieldWithLabel
          label={"Enter Upi Id"}
          type="text"
          name="upiId"
          placeholderText={"Enter Upi Id"}
          pattern="^\d{7,7}$"
          errorText="Please Enter 7 digit Upi Id"
          ref={toUserRef}
          className="w-full rounded-lg p-3 focus:border-blue-500 focus:ring-blue-500"
          onValidText={(text: string) => {
            validInputMap.current.toUser = Number(text);
            enableButton();
          }}
        />

        <TextFieldWithLabel
          label={"Enter amount"}
          type="number"
          name="amount"
          placeholderText={"Enter amount to add"}
          pattern="^[0-9]+$"
          errorText="Please Enter Amount more than 0"
          ref={amountRef}
          className="w-full rounded-lg p-3 focus:border-blue-500 focus:ring-blue-500"
          onValidText={(text: string) => {
            validInputMap.current.amount = Number(text);
            enableButton();
          }}
        />

        <Button
          label="Transfer Money"
          className={`py-3 mt-4 rounded-lg transition-colors`}
          onClick={transfer}
          enabled={showAddButton}
        />
      </div>
    </>
  );
}
