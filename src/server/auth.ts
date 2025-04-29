import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { prisma } from './db'
import { z } from 'zod'
import { env } from '@/lib/env'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        userId: { label: 'User ID' },
        password: { label: 'Password', type: 'password' },
        type: { label: 'User Type' },
      },
      async authorize(input) {
        const { userId, password, type } = z
          .object({
            userId: z.string(),
            password: z.string(),
            type: z.enum([
              'STATE_OFFICER',
              'DISTRICT_OFFICER',
              'BLOCK_OFFICER',
              'SUBORDINATE',
            ]),
          })
          .parse(input)

        const user = await prisma.user.findUnique({
          where: { userId_type: { userId, type } },
        })
        if (!user) {
          return null
        }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
          return null
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          userId: user.userId,
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  // TODO: Fix the issue
  secret: env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.sub!
      }
      return session
    },
  },
})
