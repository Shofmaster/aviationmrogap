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

  pdfReports: defineTable({
    userId: v.string(),
    companyName: v.string(),
    storageId: v.id("_storage"),
    fileName: v.string(),
    overallScore: v.number(),
    emailSent: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_createdAt", ["createdAt"]),

  quizSubmissions: defineTable({
    email: v.string(),
    companyName: v.string(),
    contactName: v.string(),
    phone: v.string(),
    consentToContact: v.boolean(),
    quizAnswers: v.record(v.string(), v.string()),
    flaggedAreas: v.array(v.string()),
    requestedFullReview: v.optional(v.boolean()),
    createdAt: v.string(),
  })
    .index("by_createdAt", ["createdAt"])
    .index("by_email", ["email"]),
});
