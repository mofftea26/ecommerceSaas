import { Link } from '@tanstack/react-router'
import { Button } from 'shadcn-ui'
import { useBranding } from '../BrandingProvider'

export default function Home() {
  const branding = useBranding()
  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold">Welcome to {branding?.name ?? 'our store'}</h1>
      <Link to="/products">
        <Button>Shop Now</Button>
      </Link>
    </div>
  )
}
