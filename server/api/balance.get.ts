import { TResponse } from "~/server/types/bsscan"

// get account balance (usd) method
export default defineEventHandler(async (event) => {
  const { address: addr } = getQuery(event);
  const config = useRuntimeConfig();

  const res : TResponse = await $fetch('https://api.bscscan.com/api', {
    method: 'GET',
    params: {
      module: 'account',
      action: 'tokenbalance',
      contractaddress: config.bscUsdContract,
      address: addr,
      tag: 'latest',
      apikey: config.bscscanAPIKey
    }
  });
  
  if(res.status == '1'){
    return Math.floor(parseInt(res.result) / 10**18);
  } else {
    throw createError({
      message: res.result,
    })
  }
})