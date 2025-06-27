import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { ClerkProvider, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'
import './index.css'
import { router } from './router'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey="CLERK_PUBLISHABLE_KEY">
      <QueryClientProvider client={queryClient}>
        <SignedIn>
          <RouterProvider router={router} />
        </SignedIn>
        <SignedOut>
          <div className="p-4 text-center">
            <SignInButton>Sign in</SignInButton>
          </div>
        </SignedOut>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>,
)
