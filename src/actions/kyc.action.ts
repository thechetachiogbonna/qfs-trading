"use server";

import { auth } from "@/lib/auth";
import { sendEmail } from "@/lib/mail";
import { v2 as cloudinary } from "cloudinary";
import { headers } from "next/headers";

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

  auth.api.updateUser({
    body: {
      kyc: {
        status: "pending",
        image: url,
        type
      }
    },
    headers: await headers()
  })

  await sendEmail({
    to: "ok@gmail.com",
    subject: "New KYC Submission",
    html: `
      <h1>New KYC Document Submitted</h1>
      <p><strong>Document Type:</strong> ${type}</p>
      <p><strong>Image URL:</strong> <a href="${url}">${url}</a></p>
    `
  });
}