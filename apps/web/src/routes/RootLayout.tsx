import { Outlet, Link } from '@tanstack/react-router'
import { useCart } from '../CartContext'
import { Button } from 'shadcn-ui'
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/clerk-react'
import { useBranding } from '../BrandingProvider'

export default function RootLayout() {
  const { items } = useCart()
  const branding = useBranding()
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b p-4 flex justify-between">
        <div className="space-x-2 flex items-center">
          {branding?.logoUrl && (
            <img src={branding.logoUrl} alt="logo" className="h-8" />
          )}
          <Link to="/"><Button>Home</Button></Link>
          <Link to="/products"><Button>Products</Button></Link>
        </div>
        <div className="flex items-center space-x-2">
          <Button>Cart ({items.length})</Button>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button>Sign in</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  )
}
