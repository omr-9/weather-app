'use client'
import { useState } from "react"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { QueryClient, QueryClientProvider } from "react-query"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}


export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient()) 
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}