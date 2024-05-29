import WebSocket, { WebSocketServer } from "ws";
import http, { IncomingMessage, ServerResponse } from "http";
import https from "https"
import { WebsocketTransactionPayload } from "@repo/types/types";
import { rawDataToJson } from "@repo/utils/utils";
import dotenv from "dotenv";
import fs from "fs"


dotenv.config({ path: __dirname + "/../../.env" });

let server: http.Server | https.Server;

try {
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/paymntsocket.dev-boi.com/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/paymntsocket.dev-boi.com/fullchain.pem', 'utf8');

  const credentials = {
    key: privateKey,
    cert: certificate,
  };

  server = https.createServer(credentials, (request: IncomingMessage, response: ServerResponse) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Hello, world!\n');
  });
  console.log('HTTPS server created');
} catch (error) {
  console.error('Failed to read SSL certificates, falling back to HTTP:', error);
  server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Hello, world!\n');
  });
  console.log('HTTP server created');
}

const wss = new WebSocketServer({ server: server });

const clients: { [key: string]: WebSocket } = {};

wss.on("connection", (ws) => {

  console.log('WEBSOCKET SERVER CONNECTED');
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

const PORT: number = Number(process.env.PAYMNT_WEBSOCKET_PORT || 3006);

server.listen(PORT, () => {
  console.log("Started Server at " + PORT);
});
