import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";

const ADMIN_EMAIL = "hofmastershelby@gmail.com";

// Generate an upload URL for the client to upload the PDF to Convex storage
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    return await ctx.storage.generateUploadUrl();
  },
});

// Internal mutation called by the action to save report metadata
export const saveReportRecord = internalMutation({
  args: {
    userId: v.string(),
    companyName: v.string(),
    storageId: v.id("_storage"),
    fileName: v.string(),
    overallScore: v.number(),
    emailSent: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("pdfReports", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// Admin-only query: list all reports
export const listAllReports = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || identity.email !== ADMIN_EMAIL) {
      return [];
    }
    return await ctx.db
      .query("pdfReports")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});

// Admin-only query: get a download URL for a specific report
export const getReportUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || identity.email !== ADMIN_EMAIL) {
      return null;
    }
    return await ctx.storage.getUrl(args.storageId);
  },
});
