import { Router } from "express";
import prisma from "@repo/db/client";
import { BankPayload, ServerWebhookResponseType } from "@repo/types/types";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { BankName, RampTransactionType, Status } from "@prisma/client";
import { generateRandom7DigitNumber } from "@repo/utils/utils";
import { WebSocket } from "ws";

const onRampRouter = Router();

onRampRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paymntToken, status }: ServerWebhookResponseType = req.body;

      console.log(req.body);

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
          onRampAccountId: Number(bankPayload.paymntUserId),
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
            id: Number(bankPayload.paymntUserId),
          },
          data: {
            balance: {
              increment: bankPayload.amount,
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

      const newSocket = new WebSocket("ws://turbo:3006");

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
                clientIdToSend: bankPayload!.paymntUserId,
                rampType: RampTransactionType.OnRamp,
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

export default onRampRouter;
