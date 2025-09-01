import { auth } from '@/server/auth'
import { headers } from 'next/headers'

export async function getUserSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session
}
