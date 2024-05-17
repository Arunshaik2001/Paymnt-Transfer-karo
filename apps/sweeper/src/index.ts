import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import cors from "cors";
import { SweepToBankType } from "@repo/types/types";
import dotenv from "dotenv";
import axios from "axios";
import jwt from "jsonwebtoken";

dotenv.config({ path: __dirname + "/../../.env" });

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/api/v1/sweepToBank",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { amount, bankAccountNumber, bankName }: SweepToBankType = req.body;

      const bankOffRampServerUrl =
        bankName == "HDFC"
          ? process.env.HDFC_BANK_OFF_RAMP_URL!
          : process.env.KOTAK_BANK_OFF_RAMP_URL;

      const sweeperToken = jwt.sign(
        {
          amount: amount,
          bankAccountNumber: bankAccountNumber,
        },
        bankName == "HDFC"
          ? process.env.PAYMNT_HDFC_BANK_SERVER_KEY!
          : process.env.PAYMNT_KOTAK_BANK_SERVER_KEY!
      );

      console.log(sweeperToken);
      console.log(bankOffRampServerUrl);

      const bankOffRampRes = await axios.post(bankOffRampServerUrl!, {
        sweeperToken: sweeperToken,
        paymentApp: "PAYMNT",
        bankName: bankName,
      });

      res.status(bankOffRampRes.status).json({
        message: bankOffRampRes.data,
      });
    } catch (error) {
      next(error);
    }
  }
);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).json({
    error: err.message,
  });
});

app.listen(process.env.PAYMNT_SWEEPER_PORT, () => {
  console.log(`Started webhook at ${process.env.PAYMNT_SWEEPER_PORT}`);
});
