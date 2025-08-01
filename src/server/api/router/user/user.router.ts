import { protectedProcedure, router } from '../../trpc'
import { addNewUserInput } from './user.input'
import { addNewUser, getALlUser } from './user.service'

export const userRouter = router({
  getAllUser: protectedProcedure.query(() => getALlUser()),
  addNewUser: protectedProcedure
    .input(addNewUserInput)
    .mutation(({ input }) => {
      addNewUser(input)
    }),
})
