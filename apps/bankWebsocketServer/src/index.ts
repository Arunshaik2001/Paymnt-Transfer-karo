import WebSocket, { RawData, WebSocketServer } from "ws";
import http, { IncomingMessage, ServerResponse } from "http";
import { WebsocketTransactionPayload } from "@repo/types/types";

const httpServer = http.createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.end("Hello, world!\n");
  }
);

const rawDataToJson = (data: RawData) => {
  if (Buffer.isBuffer(data)) {
    // If data is Buffer
    return JSON.parse(data.toString("utf-8"));
  } else if (data instanceof ArrayBuffer) {
    // If data is ArrayBuffer
    const buffer = Buffer.from(data);
    return JSON.parse(buffer.toString("utf-8"));
  } else if (
    Array.isArray(data) &&
    data.every((item) => Buffer.isBuffer(item))
  ) {
    // If data is an array of Buffers
    const combinedBuffer = Buffer.concat(data);
    return JSON.parse(combinedBuffer.toString("utf-8"));
  } else {
    throw new Error("Unsupported data type");
  }
};

const wss = new WebSocketServer({ server: httpServer });

const clients: { [key: string]: WebSocket } = {};

wss.on("connection", (ws) => {
  let clientId: string;

  ws.on("error", console.error);

  ws.on("message", (dataJson, isBinary) => {
    const data: WebsocketTransactionPayload = rawDataToJson(dataJson);

    console.log("--------------------");
    console.log(data);

    if (data.type === "identifier") {
      clientId = String(data.content.data.clientId);
      clients[clientId] = ws;
    } else if (data.type === "message") {
      const clientIdToSend = String(data.content.data.clientIdToSend);
      if (
        clients[clientIdToSend] &&
        clients[clientIdToSend]!.readyState == WebSocket.OPEN
      ) {
        clients[clientIdToSend]!.send(
          JSON.stringify({
            paymntToken: data.content.data.paymntToken,
            status: data.content.data.status,
          }),
          { binary: false }
        );
      }
    }
  });

  ws.on("close", (code, isBinary) => {
    if (clientId) {
      delete clients[clientId];
      console.log(`Client disconnected with ID: ${clientId}`);
    }
  });
});

httpServer.listen(3006, "localhost", () => {
  console.log("Started Server at 3006");
});
