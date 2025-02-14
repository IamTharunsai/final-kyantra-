import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/layout/site-header"
import type React from "react"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { Toaster } from "react-hot-toast"
import { ErrorFallback } from "@/components/error-fallback"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <Suspense fallback={<div>Loading...</div>}>
                <main className="flex-1">{children}</main>
              </Suspense>
            </div>
            <Toaster />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
