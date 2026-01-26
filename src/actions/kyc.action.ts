"use server";

import { auth } from "@/lib/auth";
import { sendEmail } from "@/lib/mail";
import { v2 as cloudinary } from "cloudinary";
import { headers } from "next/headers";

import { createNotification } from "./notification.action";
import { NotificationCategory } from "@/constants";
import { getKycSubmissionAdminTemplate } from "@/lib/email-templates/kyc-submission-admin";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export async function uploadImage(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "qfs-trading",
      },
      (error, result) => {
        if (error || !result) {
          console.error("Cloudinary upload error:", error);
          return reject(new Error("Upload failed"));
        }

        resolve(result.secure_url);
      }
    );

    stream.end(buffer);
  });
}

export const uploadKyc = async (type: string, file: File) => {
  const url = await uploadImage(file);
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) return;

  await auth.api.updateUser({
    body: {
      kyc: {
        status: "pending",
        image: url,
        type
      }
    },
    headers: await headers()
  })

  await createNotification({
    userId: session.user.id,
    type: NotificationCategory.KYC_UPDATE,
    title: "KYC Submitted",
    description: `Your ${type} has been submitted for verification.`,
  });

  await sendEmail({
    to: process.env.EMAIL_USER!,
    subject: "New KYC Submission",
    html: getKycSubmissionAdminTemplate(
      type,
      url,
      session.user.name,
      session.user.email
    ),
  });
}