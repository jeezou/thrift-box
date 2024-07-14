// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  
  nitro: {
    plugins: ["~/server/plugins/mongodb.ts"],
  },

  runtimeConfig: {
    mongodbURI: process.env.MONGODB_URI
  }
})