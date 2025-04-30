import { protectedProcedure, router } from "../../trpc";
import getALlUser from "./user.service";

export const userRouter = router({
  getAllUser: protectedProcedure.query(() => getALlUser())
})
