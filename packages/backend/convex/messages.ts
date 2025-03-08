import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all messages
export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("messages").order("desc").collect();
  },
});

// Add a new message
export const send = mutation({
  args: { text: v.string(), author: v.string() },
  handler: async (ctx, args) => {
    const { text, author } = args;
    await ctx.db.insert("messages", {
      text,
      author,
      createdAt: Date.now(),
    });
  },
});
