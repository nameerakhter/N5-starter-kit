import { prisma } from "@/server/db";
import { TRPCError } from "@trpc/server";

export default function getALlUser() {
  try {
    return prisma.user.findMany({})
  } catch (error) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Failed to retrieve users"
    })
  }
}
