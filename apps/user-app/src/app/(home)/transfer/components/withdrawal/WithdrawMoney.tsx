"use client";

import AppName from "@/components/AppName";
import Button from "@/components/Button";
import DropdownButton from "@/components/DropdownButton";
import Loader from "@/components/Loader";
import TextFieldWithLabel from "@/components/TextFieldWithLabel";
import sessionAtom from "@/store/atoms/sessionAtom";
import axios from "axios";
import { SignJWT } from "jose";
import { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";

export default function WithdrawMoney() {
  const userSession = useRecoilValue(sessionAtom);

  const amountRef = useRef<HTMLInputElement | null>(null);
  const accountNumberRef = useRef<HTMLInputElement | null>(null);

  const [showAddButton, setShowAddButton] = useState(false);
  const [showLoader, setLoader] = useState(false);

  const validInputMap = useRef({
    amount: 0,
    bankName: "HDFC",
    paymentApp: "PAYMNT",
    bankAccountNumber: 0,
  });

  const withdrawMoney = async () => {
    setLoader(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_HDFC_CREDIT_SERVER_URL!;
      const secret = new TextEncoder().encode(
        process.env.NEXT_PUBLIC_PAYMNT_HDFC_SECRET!
      );

      const token = await new SignJWT({
        amount: validInputMap.current.amount,
        bankAccountNumber: validInputMap.current.bankAccountNumber,
        paymntUserId: userSession?.userId,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("10m")
        .sign(secret);

      const response = await axios.post(baseUrl, {
        sweeperToken: token,
        paymentApp: validInputMap.current.paymentApp,
        bankName: validInputMap.current.bankName,
      });

      console.log(response);

      if (response?.status < 300) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data?.message ?? "Unable to withdraw");
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to withdraw");
    } finally {
      setLoader(false);
    }
  };

  function enableButton() {
    setShowAddButton(
      validInputMap.current.amount != 0 &&
        validInputMap.current.bankAccountNumber != 0
    );
  }

  if (showLoader) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex flex-col m-2 gap-6 justify-center items-center shadow-lg border border-gray-200 rounded-xl p-8 bg-white mb-10">
        <AppName
          title="Withdraw Money"
          className="text-3xl font-semibold text-blue-600 mb-6"
        />

        <TextFieldWithLabel
          label={"Enter Bank Account Number"}
          type="text"
          name="account"
          placeholderText={"Enter bank account number to withdraw..."}
          showLabel={true}
          pattern="^\d{7,7}$"
          errorText="Please Enter 7 digits bank account number."
          ref={accountNumberRef}
          className="w-full rounded-lg p-3 focus:border-blue-500 focus:ring-blue-500"
          onValidText={(text: string) => {
            validInputMap.current.bankAccountNumber = Number(text);
            enableButton();
          }}
        />

        <TextFieldWithLabel
          label={"Enter amount"}
          type="number"
          name="amount"
          placeholderText={"Enter amount to add"}
          showLabel={true}
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
          label="Withdraw Money"
          className={`py-3 mt-4 rounded-lg transition-colors`}
          onClick={withdrawMoney}
          enabled={showAddButton}
        />
      </div>
    </>
  );
}
