import { Router } from "express";
import { BankName, RampTransactionType, Status } from "@prisma/client";
import WebSocket from "ws";
import prisma from "@repo/db/client";
import {
  PaymntTransactionPaymentPayload,
  ServerWebhookResponseType,
} from "@repo/types/types";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { generateRandom7DigitNumber } from "@repo/utils/utils";

const offRampRouter = Router();

offRampRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paymntToken, status }: ServerWebhookResponseType = req.body;

      const bankPayload = jwt.verify(
        paymntToken,
        process.env.HDFC_PAYMNT_BANK_SERVER_KEY!
      ) as PaymntTransactionPaymentPayload;

      console.log("===========bankPayload===========");
      console.log(bankPayload);

      const netbankingAccount = await prisma.account.findUnique({
        where: { id: Number(bankPayload.paymntUserId) },
      });

      console.log("===========netbankingAccount===========");
      console.log(netbankingAccount);

      await prisma.rampTransaction.upsert({
        where: {
          bankToken: paymntToken,
        },
        update: {
          txStatus: status,
          date: new Date(),
        },
        create: {
          offRampAccountId: Number(netbankingAccount?.id),
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
            id: Number(netbankingAccount?.id),
          },
          data: {
            balance: {
              decrement: bankPayload.amount,
            },
          },
        });

        console.log("Transaction Success");
        res.status(202).json({
          message: "Transaction Success",
        });
      } else if (status == Status.FAILED) {
        console.log("Transaction Failed");
        res.status(500).json({
          message: "Transaction Failed",
        });
      } else if (status == Status.INITIATED) {
        console.log("Transaction Initiated");
        res.status(200).json({
          message: "Transaction Initiated",
        });
      } else if (status == Status.PROCESSING) {
        console.log("Transaction PROCESSING");
        res.status(200).json({
          message: "Transaction PROCESSING",
        });
      }

      const newSocket = new WebSocket("ws://localhost:3006");

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
                status: status,
                clientIdToSend: netbankingAccount?.id,
                rampType: RampTransactionType.OffRamp,
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

export default offRampRouter;
