import { TRPCError } from '@trpc/server'
import bcrypt from 'bcrypt'
import { z } from 'zod'

import { addNewUserInput } from './user.input'

import { prisma } from '@/server/db'

export function getALlUser() {
  try {
    return prisma.user.findMany({})
  } catch (error) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Failed to retrieve users' + error,
    })
  }
}

export async function addNewUser(data: z.infer<typeof addNewUserInput>) {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10)

    const newUser = await prisma.user.upsert({
      where: { email: data.email },
      update: {
        name: data.name,
        age: data.age,
        mobile: data.mobileNumber,
        password: hashedPassword,
      },
      create: {
        name: data.name,
        age: data.age,
        email: data.email,
        mobile: data.mobileNumber,
        password: hashedPassword,
      },
    })
    return newUser
  } catch (error) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'unable to add new user ' + error,
    })
  }
}
