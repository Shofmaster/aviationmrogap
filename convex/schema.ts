import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  assessments: defineTable({
    userId: v.string(),
    assessmentData: v.string(), // JSON.stringify(Partial<AssessmentData>)
    currentStep: v.number(),
    analysisResult: v.optional(v.string()), // JSON.stringify(GapAnalysisResult)
    updatedAt: v.number(),
  }).index("by_userId", ["userId"]),
});
