import { QueryCtx, MutationCtx } from "./_generated/server";

const ADMIN_EMAIL = "hofmastershelby@gmail.com";

export async function requireAdmin(ctx: QueryCtx | MutationCtx): Promise<string> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Not authenticated");
  if (identity.email !== ADMIN_EMAIL) {
    throw new Error("Not authorized: admin role required");
  }
  return identity.subject;
}
