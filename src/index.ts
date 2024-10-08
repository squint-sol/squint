import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
} from "@solana/actions";
import {
  Connection,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Buffer } from "node:buffer";

if (globalThis.Buffer === undefined) {
  globalThis.Buffer = Buffer;
}

// you should use a private RPC here
const connection = new Connection("https://api.mainnet-beta.solana.com");

const app = new Hono();

// see https://solana.com/docs/advanced/actions#options-response
app.use(
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "Accept-Encoding"],
    allowMethods: ["GET", "POST", "PUT", "OPTIONS"],
  })
);

app.get("/", (c) => {
  const response: ActionGetResponse = {
    title: "Sign the following Transaction",
    description: "This will contain transaction details for the user to review before signing",
    icon: "https://img.fotofolio.xyz/?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FSo11111111111111111111111111111111111111112%2Flogo.png",
    links: {
      actions: [
        {
          "label": "Approve",
          "href": "/api/approve",
        },
        {
          "label": "Reject",
          "href": "/api/reject",
        },
      ]
    }
  };

  return c.json(response);
});

app.post("/", async (c) => {
  const req = await c.req.json<ActionPostRequest>();
  //Review and refine transaction logic here
  const transaction = await validateTransaction(new PublicKey(req.account));

  const response: ActionPostResponse = {
    transaction: Buffer.from(transaction.serialize()).toString("base64"),
  };

  return c.json(response);
});

async function validateTransaction(payer: PublicKey) {
 //To be built to handle the transaction validation logic on the squad wallet
  // connect with wallet, then approve or deny the transaction
  return 0;}

export default app;
