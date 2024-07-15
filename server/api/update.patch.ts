import { UserModel } from '~/server/models/user.model'

// update user data method
export default defineEventHandler(async (event) => {
  const { wallet, balance, targetBalance, target, autoreload } = await readBody(event);

  await UserModel.findOneAndUpdate({}, {
    wallet,
    balance,
    targetBalance,
    target,
    autoreload
  });

  const user = UserModel.findOne();

  return user;
})