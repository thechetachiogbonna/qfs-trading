import { betterAuth } from "better-auth";
import mongoose from "mongoose";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import connectToDb from "@/config/connectToDb";

await connectToDb();

export const auth = betterAuth({
  database: mongodbAdapter(mongoose.connection.db!),
  user: {
    additionalFields: {
      passcode: {
        type: "string",
        required: false
      },
      accountId: {
        type: "string",
        required: true
      },
      role: {
        type: "string",
        required: true,
        defaultValue: "user"
      },
      coins: {
        type: "string",
        required: true,
        defaultValue: JSON.stringify({
          BTC: {
            balance: 0,
            on: true
          },
          "USDT_TRC20": {
            balance: 0,
            on: true,
            network: "TRC20"
          },
          "USDT_BNB": {
            balance: 0,
            on: true,
            network: "BNB"
          },
          "USDT_ERC20": {
            balance: 0,
            on: true,
            network: "ERC20"
          },
          ETH: {
            balance: 0,
            on: true
          },
          TRX: {
            balance: 0,
            on: true
          },
          BNB: {
            balance: 0,
            on: true
          },
          DOT: {
            balance: 0,
            on: true
          },
          BCH: {
            balance: 0,
            on: true
          },
          LTC: {
            balance: 0,
            on: true
          },
          XLM: {
            balance: 0,
            on: true
          },
          DASH: {
            balance: 0,
            on: true
          },
          SOL: {
            balance: 0,
            on: true
          }
        }),
      }
    }
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    nextCookies(),
    admin()
  ]
});

export type User = typeof auth.$Infer.Session["user"];