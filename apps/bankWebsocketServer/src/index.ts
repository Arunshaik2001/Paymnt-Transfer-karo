import WebSocket, { WebSocketServer } from "ws";
import http, { IncomingMessage, ServerResponse } from "http";
import { WebsocketTransactionPayload } from "@repo/types/types";
import { rawDataToJson } from "@repo/utils/utils";

const httpServer = http.createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.end("Hello, world!\n");
  }
);

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
