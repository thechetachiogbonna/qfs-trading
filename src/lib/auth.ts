import { betterAuth } from "better-auth";
import mongoose from "mongoose";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import connectToDb from "@/config/connectToDb";
import { sendEmail } from "./mail";
import { getEmailVerificationTemplate } from "./email-templates/email-verification";
import { getResetPasswordTemplate } from "./email-templates/reset-password";
import { getPasswordChangeConfirmationTemplate } from "./email-templates/password-change-confirmation";

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
      silverCardSubmitted: {
        type: "boolean",
        required: false
      },
      goldCardSubmitted: {
        type: "boolean",
        required: false
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
  emailVerification: {
    sendVerificationEmail: async ({ user, url }, request) => {
      await Promise.all([
        sendEmail({
          to: user.email,
          subject: "Verify Your Email - QFS Trading",
          html: getEmailVerificationTemplate(user.name, url)
        }),
        sendEmail({
          to: process.env.EMAIL_USER!,
          subject: "New User Registration",
          html: `
            <h1>New User Registered</h1>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
          `
        })
      ])
    },
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }, request) => {
      await sendEmail({
        to: user.email,
        subject: "Reset Your Password - QFS Trading",
        html: getResetPasswordTemplate(user.name, url)
      })
    },
    onPasswordReset: async (data, request) => {
      await sendEmail({
        to: data.user.email,
        subject: "Your password has been changed",
        html: getPasswordChangeConfirmationTemplate(data.user.name)
      })
    },
  },
  deleteUser: {
    enabled: true,
  },
  plugins: [
    nextCookies(),
    admin()
  ]
});

export type User = typeof auth.$Infer.Session["user"];