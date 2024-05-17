import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import prisma from "@repo/db/client";
import {
  BankPayload,
  PaymntTransactionPaymentPayload,
  ServerWebhookResponseType,
} from "@repo/types/types";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { BankName, RampTransactionType, Status } from "@prisma/client";
import WebSocket from "ws";

dotenv.config({ path: __dirname + "/../../.env" });

const app = express();

app.use(cors());
app.use(express.json());
app.post(
  "/api/v1/transaction/hdfcWebhook",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paymntToken, status }: ServerWebhookResponseType = req.body;

      const bankPayload = jwt.verify(
        paymntToken,
        process.env.HDFC_PAYMNT_BANK_SERVER_KEY!
      ) as BankPayload;

      await prisma.rampTransaction.upsert({
        where: {
          bankToken: paymntToken,
        },
        update: {
          txStatus: status,
          date: new Date(),
        },
        create: {
          onRampAccountUpiId: Number(bankPayload.paymntUserId),
          amount: bankPayload.amount,
          providerBank: BankName.HDFC,
          txStatus: status,
          bankToken: paymntToken,
          date: new Date(),
          transactionType: RampTransactionType.OnRamp,
        },
      });

      if (status == Status.SUCCESS) {
        await prisma.account.update({
          where: {
            upiId: Number(bankPayload.paymntUserId),
          },
          data: {
            balance: {
              increment: bankPayload.amount,
            },
          },
        });
        res.status(202).json({
          message: "Transaction Success",
        });
      } else if (status == Status.FAILED) {
        res.status(500).json({
          message: "Transaction Failed",
        });
      }

      const newSocket = new WebSocket("ws://localhost:4000");

      newSocket.onopen = () => {
        console.log("Connection established");
        newSocket.send(
          JSON.stringify({
            type: "identifier",
            content: {
              data: {
                clientId: generateRandom7DigitNumber(),
              },
            },
          }),
          {
            binary: false,
          }
        );

        newSocket.send(
          JSON.stringify({
            type: "message",
            content: {
              data: {
                paymntToken: paymntToken,
                status: status == Status.SUCCESS ? "SUCCESS" : "FAILURE",
                clientIdToSend: bankPayload!.paymntUserId,
              },
            },
          }),
          {
            binary: false,
          }
        );
      };
      newSocket.onmessage = (message) => {
        console.log("Message received:", message.data);
      };
    } catch (error) {
      console.log(error);
      res.status(411).json({});
    }
  }
);

function generateRandom7DigitNumber() {
  const min = 1000000; // Minimum 7-digit number
  const max = 9999999; // Maximum 7-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.post(
  "/api/v1/transaction/hdfcWebhook/offRamp",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paymntToken, status }: ServerWebhookResponseType = req.body;

      const bankPayload = jwt.verify(
        paymntToken,
        process.env.HDFC_PAYMNT_BANK_SERVER_KEY!
      ) as PaymntTransactionPaymentPayload;

      const netbankingAccount = await prisma.account.findUnique({
        where: { bankAccountNumber: Number(bankPayload.bankAccountNumber) },
      });

      await prisma.rampTransaction.upsert({
        where: {
          bankToken: paymntToken,
        },
        update: {
          txStatus: status,
          date: new Date(),
        },
        create: {
          offRampAccountUpiId: Number(netbankingAccount?.upiId),
          amount: bankPayload.amount,
          providerBank: BankName.HDFC,
          txStatus: status,
          bankToken: paymntToken,
          date: new Date(),
          transactionType: RampTransactionType.OffRamp,
        },
      });

      if (status == Status.SUCCESS) {
        await prisma.account.update({
          where: {
            upiId: Number(netbankingAccount?.upiId),
          },
          data: {
            balance: {
              decrement: bankPayload.amount,
            },
          },
        });
      }

      res.status(202).json({
        message: "Acknowledged",
      });
    } catch (error) {
      console.log(error);
      res.status(411).json({});
    }
  }
);

app.listen(process.env.PAYMNT_WEBHOOK_PORT, () => {
  console.log(`Started webhook at ${process.env.PAYMNT_WEBHOOK_PORT}`);
});
