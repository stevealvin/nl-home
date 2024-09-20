import Keyv from 'keyv'

const keyv = new Keyv()

export default defineEventHandler(async (event) => {
  const { key, value, ttl } = await readBody(event)
  if (value) {
    let key = generateRandomString()
    await keyv.set(`clipboard:${key}`, value, Number(ttl) * 1000 || 1000 * 60 * 5) // default 5 minutes
    return key
  } else if (key) {
    return await keyv.get(`clipboard:${key}`)
  }
})

function generateRandomString() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
}