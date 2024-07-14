import { UserModel } from "~/server/models/user.model";

export default defineEventHandler(async (event) => {
  const users = await UserModel.findOne();

  return users
})