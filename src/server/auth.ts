import NextAuth, { DefaultSession } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { prisma } from './db'
import { z } from 'zod'
import { env } from '@/lib/env'
import { UserType } from '@prisma/client'
import invariant from 'tiny-invariant'

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string
      userId: string
      type: UserType
    }
  }
}

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
            type: z.enum(['ADMIN', 'USER']),
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
  secret: env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    jwt: async ({ token }) => {
      const userData = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
        select: {
          type: true,
        },
      })
      invariant(userData, 'user data should be present')
      token.userType = userData.type
      return token
    },

    session: ({ session, token }) => {
      if (session.user) {
        session.user.type = token.userType as UserType
        session.user.id = token.sub!
      }
      return session
    },
  },
})
