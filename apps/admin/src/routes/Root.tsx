import { Outlet, Link } from '@tanstack/react-router'
import { Button } from '../components/ui'

export default function Root() {
  return (
    <div className="p-4 space-y-4">
      <nav className="space-x-2">
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <Link to="/products">
          <Button>Products</Button>
        </Link>
      </nav>
      <Outlet />
    </div>
  )
}
