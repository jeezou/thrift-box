import { UserModel } from "~/server/models/user.model";

// get user data method
export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  // create document if collection is empty
  if(!(await UserModel.countDocuments({}))) {
    await UserModel.create({
      wallet: config.walletAddress,
      balance: '100',
      targetBalance: '1000',
      target: 'велосипед',
      autoreload: false
    });
  }

  const user = await UserModel.findOne();

  if(user && user.autoreload) {
    const res = await $fetch('/api/balance', {
      method: 'GET',
      params: {
        address: user.wallet
      }
    });

    user.balance = res.toString();
    user.save();
  }

  return user;
})