import { Link } from '@tanstack/react-router'
import { Button } from 'shadcn-ui'

export default function Home() {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold">Welcome to our store</h1>
      <Link to="/products">
        <Button>Shop Now</Button>
      </Link>
    </div>
  )
}
