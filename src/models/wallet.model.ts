import mongoose from "mongoose";

interface WalletType extends mongoose.Document {
  userId: mongoose.Types.ObjectId,
  phrases: string[]
}

const walletSchema = new mongoose.Schema<WalletType>({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
  phrases: [{ type: String }],
}, { timestamps: true });

const Wallet: mongoose.Model<WalletType> = mongoose.models.Wallet || mongoose.model<WalletType>("Wallet", walletSchema);

export default Wallet;