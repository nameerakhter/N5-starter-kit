import { protectedProcedure, publicProcedure, router } from '../../trpc'

import { addNewUserInput } from './user.input'
import { addNewUser, getALlUser } from './user.service'

export const userRouter = router({
  getAllUser: protectedProcedure.query(() => getALlUser()),
  addNewUser: publicProcedure.input(addNewUserInput).mutation(({ input }) => {
    addNewUser(input)
  }),
})
