import { createAuthClient } from 'better-auth/react'
import { env } from './env'

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
})

export const { signIn, signOut, signUp, useSession } = authClient

export const useCustomSignIn = () => {
  return async ({
    userId,
    password,
    type,
  }: {
    userId: string
    password: string
    type: 'ADMIN' | 'USER'
  }) => {
    const response = await fetch('/api/auth/custom-signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, password, type }),
    })

    if (!response.ok) {
      throw new Error('Authentication failed')
    }

    return response.json()
  }
}
