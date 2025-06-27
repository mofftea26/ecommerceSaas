import { Outlet, Link } from '@tanstack/react-router'
import { useCart } from '../CartContext'
import { Button } from 'shadcn-ui'

export default function RootLayout() {
  const { items } = useCart()
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b p-4 flex justify-between">
        <div className="space-x-2">
          <Link to="/"><Button>Home</Button></Link>
          <Link to="/products"><Button>Products</Button></Link>
        </div>
        <div>
          <Button>Cart ({items.length})</Button>
        </div>
      </nav>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  )
}
