import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import onRampRouter from "./transaction/onRamp";
import offRampRouter from "./transaction/offRamp";
import dotenv from "dotenv";


dotenv.config({ path: __dirname + "/../../.env" });

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/transaction/hdfcWebhook", onRampRouter);

app.use("/api/v1/transaction/hdfcWebhook/offRamp", offRampRouter);

app.listen(process.env.PAYMNT_WEBHOOK_PORT, () => {
  console.log(`Started webhook at ${process.env.PAYMNT_WEBHOOK_PORT}`);
});
