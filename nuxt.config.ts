// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Piggy Bank App'
    }
  },
  
  nitro: {
    plugins: ["~/server/plugins/mongodb.ts"],
  },

  runtimeConfig: {
    mongodbURI: process.env.MONGODB_URI,

    bscscanAPIKey: process.env.BSCSCAN_API_KEY,
    bscUsdContract: process.env.BSC_USD_CONTRACT,
    walletAddress: process.env.WALLET_ADDRESS,

    login: process.env.CREDENTIALS_LOGIN,
    password: process.env.CREDENTIALS_PASSWORD
  }
})