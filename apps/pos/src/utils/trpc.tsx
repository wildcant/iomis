import type { AppRouter } from '@iomis/api'
import { transformer } from '@iomis/api/transformer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react'
import Constants from 'expo-constants'
import React from 'react'
import { Text } from 'react-native'

/**
 * A set of type safe hooks for consuming your API.
 */
export const trpc = createTRPCReact<AppRouter>()
const getBaseUrl = () => {
  const localhost =
    Constants.manifest?.debuggerHost?.split(':')[0] ?? 'localhost'
  const apiUrl: string | undefined = Constants.expoConfig?.extra?.apiUrl
  return apiUrl ?? `http://${localhost}:3000`
}

/**
 * A wrapper for your app that provides the TRPC context.
 * Use only in _app.tsx
 */
export const TRPCProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queryClient] = React.useState(() => new QueryClient())
  const [trpcClient] = React.useState(() =>
    trpc.createClient({
      transformer,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
