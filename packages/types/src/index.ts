import { BankName, Status } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

export type ServerWebhookResponseType = {
  paymntToken: string;
  status: Status;
};

export interface BankPayload extends JwtPayload {
  paymntUserId: string;
  amount: number;
}

export interface PaymntTransactionPaymentPayload extends JwtPayload {
  amount: number;
  bankAccountNumber: number;
}

export type SweepToBankType = {
  amount: number;
  bankAccountNumber: number;
  bankName: BankName;
};

type MessageType = "identifier" | "message";

export type WebsocketTransactionPayload = {
  type: MessageType;
  content: {
    data: {
      [key: string]: string | number;
    };
  };
};
