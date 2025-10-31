import { PrismaClient } from '@prisma/client'

import { env } from '@/lib/env'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ datasourceUrl: env.DATABASE_URL })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
