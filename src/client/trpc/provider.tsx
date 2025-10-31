'use client'

import type { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'
import superjson from 'superjson'

import { trpc } from './client'
import { makeQueryClient } from './query-client'

let clientQueryClientSingleton: QueryClient
function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient()
  }
  // Browser: use singleton pattern to keep the same query client
  if (!clientQueryClientSingleton) {
    clientQueryClientSingleton = makeQueryClient()
  }
  return clientQueryClientSingleton
}

function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') {
      return ''
    }
    return 'http://localhost:3000'
  })()
  return `${base}/api/trpc`
}

export function TRPCProvider(
  props: Readonly<{
    children: React.ReactNode
  }>,
) {
  const queryClient = getQueryClient()
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          transformer: superjson,
          url: getUrl(),
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}
