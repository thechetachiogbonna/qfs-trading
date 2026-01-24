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
      kyc: {
        type: "json",
        defaultValue: {
          status: "none",
          image: "",
          type: ""
        }
      },
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
        defaultValue: "user" as "admin" | "user"
      },
      coins: {
        type: "string",
        required: true,
        defaultValue: JSON.stringify({
          BTC: {
            balance: 0,
          },
          "USDT_TRC20": {
            balance: 0,
            network: "TRC20"
          },
          ADA: {
            balance: 0,
          },
          XLM: {
            balance: 0,
          },
          XRP: {
            balance: 0,
          },
          DOGE: {
            balance: 0,
          },
          SOL: {
            balance: 0,
          }
        }),
      },
      walletStatus: {
        type: "string",
        required: true
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