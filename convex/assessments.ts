import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const loadAssessment = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const userId = identity.subject;
    const assessment = await ctx.db
      .query("assessments")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    if (!assessment) {
      return null;
    }

    return {
      assessmentData: JSON.parse(assessment.assessmentData),
      currentStep: assessment.currentStep,
      analysisResult: assessment.analysisResult
        ? JSON.parse(assessment.analysisResult)
        : null,
      updatedAt: assessment.updatedAt,
    };
  },
});

export const saveAssessment = mutation({
  args: {
    assessmentData: v.string(),
    currentStep: v.number(),
    analysisResult: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;
    const existing = await ctx.db
      .query("assessments")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    const now = Date.now();

    if (existing) {
      await ctx.db.patch(existing._id, {
        assessmentData: args.assessmentData,
        currentStep: args.currentStep,
        analysisResult: args.analysisResult,
        updatedAt: now,
      });
    } else {
      await ctx.db.insert("assessments", {
        userId,
        assessmentData: args.assessmentData,
        currentStep: args.currentStep,
        analysisResult: args.analysisResult,
        updatedAt: now,
      });
    }
  },
});

export const deleteAssessment = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;
    const existing = await ctx.db
      .query("assessments")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    if (existing) {
      await ctx.db.delete(existing._id);
    }
  },
});
