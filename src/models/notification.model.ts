import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  fromAmount: {
    type: Number,
    required: true
  },
  toAmount: {
    type: Number,
    required: true
  },
  read: {
    type: Boolean,
    required: true
  }
}, { timestamps: true });

const NotificationModel = mongoose.models.notification || mongoose.model("notification", notificationSchema)

export default NotificationModel;