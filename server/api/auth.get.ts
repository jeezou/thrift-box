// check authentication status method
export default defineEventHandler(async () => {
  const storage = useStorage('auth');

  return await storage.getItem('status') || false;
})