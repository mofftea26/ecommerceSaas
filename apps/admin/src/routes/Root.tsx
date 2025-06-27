import { Outlet, Link, useRouterState } from '@tanstack/react-router'
import { Button } from '../components/ui'
import { AnimatePresence } from 'framer-motion'

export default function Root() {
  const location = useRouterState({ select: s => s.location })
  return (
    <div className="p-4 space-y-4">
      <nav className="space-x-2">
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <Link to="/products">
          <Button>Products</Button>
        </Link>
        <Link to="/branding">
          <Button>Branding</Button>
        </Link>
      </nav>
      <AnimatePresence mode="wait">
        <Outlet key={location.pathname} />
      </AnimatePresence>
    </div>
  )
}
