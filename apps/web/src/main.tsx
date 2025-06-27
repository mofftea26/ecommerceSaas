import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ClerkProvider } from '@clerk/clerk-react'
import { router } from './router'
import { CartProvider } from './CartContext'
import { BrandingProvider } from './BrandingProvider'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey="CLERK_PUBLISHABLE_KEY">
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <BrandingProvider>
            <RouterProvider router={router} />
          </BrandingProvider>
        </CartProvider>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>,
)
