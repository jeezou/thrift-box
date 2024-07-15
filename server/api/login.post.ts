// login method
export default defineEventHandler(async (event) => {
  // use nitro server storage for session auth
  const storage = useStorage('auth');
  const config = useRuntimeConfig();
  const { login, password } = await readBody(event);

  if(login == config.login && password == config.password) {
    await storage.setItem('status', true)
    return true;
  } else {
    return false;
  }
})