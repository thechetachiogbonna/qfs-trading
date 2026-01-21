"use server";

import Wallet from "@/models/wallet.model";
import mongoose from "mongoose";

async function connectUserWallet(userId: string, value: string) {
  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    return { error: "Invalid userId: userId must be a non-empty string." };
  }

  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const existingDoc = await Wallet.findOne({ userId: userObjectId });

    if (!existingDoc) {
      await Wallet.create({
        userId: userObjectId,
        phrases: [value],
      });
    } else {
      await Wallet.updateOne(
        { userId: userObjectId },
        { $addToSet: { phrases: value } }
      );
    }

    return { error: null };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Server error occurred." }
  }
}

export default connectUserWallet;