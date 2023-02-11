import { PrismaClient } from '@prisma/client'

/**
 * Prisma client with production/development mode.
 * @returns {PrismaClient}
 */
let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  const globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient
  }
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient()
  }
  prisma = globalWithPrisma.prisma
}

export default prisma
