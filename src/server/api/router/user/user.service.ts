import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { addNewUserInput } from './user.input'

export function getALlUser() {
  try {
    return prisma.user.findMany({})
  } catch (error) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Failed to retrieve users',
    })
  }
}

export async function addUser(data: z.infer<typeof addNewUserInput>) {
  try {
    const newUser = await prisma.user.upsert({
      where: { email: data.email },
      update: {
        name: data.name,
        age: data.age,
        mobile: data.mobileNumber,
      },
      create: {
        name: data.name,
        age: data.age,
        email: data.email,
        mobile: data.mobileNumber,
      },
    })
    return newUser
  } catch (error) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'unable to add new user ',
    })
  }
}
