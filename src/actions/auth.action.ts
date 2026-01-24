"use server";

import { sendEmail } from "@/lib/mail";

export async function sendWelcomeEmail(email: string, name: string) {
  const html = `
    <h1>Welcome to QFS Trading!</h1>
    <p>Hi ${name},</p>
    <p>Thank you for creating an account with us. We are excited to have you on board.</p>
    <p>If you have any questions, feel free to reply to this email.</p>
  `;

  await sendEmail({
    to: email,
    subject: "Welcome to QFS Trading",
    html,
  });

  // Also notify admin
  await sendEmail({
    to: "ok@gmail.com",
    subject: "New User Registration",
    html: `
      <h1>New User Registered</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
    `
  });
}
