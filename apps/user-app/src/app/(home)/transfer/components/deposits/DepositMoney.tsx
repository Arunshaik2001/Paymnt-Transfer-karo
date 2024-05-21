"use client";

import AppName from "@/components/AppName";
import Button from "@/components/Button";
import DropdownButton from "@/components/DropdownButton";
import TextFieldWithLabel from "@/components/TextFieldWithLabel";
import sessionAtom from "@/store/atoms/sessionAtom";
import { SignJWT } from "jose";
import { useRef, useState } from "react";
import { useRecoilValue } from "recoil";

export default function DepositMoney() {
  const userSession = useRecoilValue(sessionAtom);

  const amountRef = useRef<HTMLInputElement | null>(null);

  const [showAddButton, setShowAddButton] = useState(false);

  const validInputMap = useRef({
    amount: 0,
    bankName: "HDFC",
    paymentApp: "PAYMNT",
  });

  const openPopup = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_HDFC_DEBIT_URL!;
    const secret = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_PAYMNT_HDFC_SECRET!
    );

    const token = await new SignJWT({
      amount: validInputMap.current.amount,
      paymntUserId: userSession?.userId,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("10m")
      .sign(secret);

    const params = new URLSearchParams({
      token: token,
      bankName: validInputMap.current.bankName,
      paymentApp: validInputMap.current.paymentApp,
    });

    const url = `${baseUrl}?${params.toString()}`;

    console.log("---------------");
    console.log(url);

    const features = "height=700,width=700";

    // Open the popup window
    window.open(url, "_blank", features);
  };

  function enableButton() {
    setShowAddButton(validInputMap.current.amount != 0);
  }

  return (
    <>
      <div className="flex flex-col gap-6 justify-center items-center shadow-lg border border-gray-200 rounded-xl p-8 bg-white mt-10 mb-10">
        <AppName
          title="Add Money"
          className="text-3xl font-semibold text-blue-600 mb-6"
        />

        <TextFieldWithLabel
          label={"Enter amount"}
          type="number"
          name="amount"
          placeholderText={"Enter amount to add"}
          showLabel={false}
          pattern="^[0-9]+$"
          errorText="Please Enter Amount more than 0"
          ref={amountRef}
          className="w-full rounded-lg p-3 focus:border-blue-500 focus:ring-blue-500"
          onValidText={(text: string) => {
            validInputMap.current.amount = Number(text);
            enableButton();
          }}
        />

        <DropdownButton
          items={[
            { key: "Hdfc Bank", value: "HDFC" },
            { key: "Kotak Bank", value: "KOTAK" },
          ]}
          label="Select netbanking app"
          className="w-full border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-blue-500"
          onSelect={(key, value) => {
            validInputMap.current.bankName = value;
            enableButton();
          }}
        />

        <Button
          label="Add Money"
          className={`py-3 mt-4 rounded-lg transition-colors`}
          onClick={openPopup}
          enabled={showAddButton}
        />
      </div>
    </>
  );
}
