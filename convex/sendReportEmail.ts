"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import nodemailer from "nodemailer";

export const sendReportAndSave = action({
  args: {
    storageId: v.id("_storage"),
    companyName: v.string(),
    fileName: v.string(),
    overallScore: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Retrieve the PDF bytes from Convex storage
    const pdfUrl = await ctx.storage.getUrl(args.storageId);
    if (!pdfUrl) throw new Error("Failed to get storage URL");

    const response = await fetch(pdfUrl);
    const pdfBuffer = Buffer.from(await response.arrayBuffer());

    // Send email via Gmail SMTP
    let emailSent = false;
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `"AeroGap Assessment" <${process.env.GMAIL_USER}>`,
        to: "hofmastershelby@gmail.com",
        subject: `New Gap Analysis Report: ${args.companyName} (Score: ${args.overallScore}%)`,
        html: `
          <h2>New Assessment Completed</h2>
          <p><strong>Company:</strong> ${args.companyName}</p>
          <p><strong>Overall Score:</strong> ${args.overallScore}%</p>
          <p><strong>Submitted by:</strong> ${identity.email || identity.name || "Unknown"}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p>The PDF report is attached below.</p>
        `,
        attachments: [
          {
            filename: args.fileName,
            content: pdfBuffer,
            contentType: "application/pdf",
          },
        ],
      });
      emailSent = true;
    } catch (error) {
      console.error("Email send failed:", error);
    }

    // Save report metadata via internal mutation
    await ctx.runMutation(internal.pdfReports.saveReportRecord, {
      userId: identity.subject,
      companyName: args.companyName,
      storageId: args.storageId,
      fileName: args.fileName,
      overallScore: args.overallScore,
      emailSent,
    });

    return { success: true, emailSent };
  },
});
