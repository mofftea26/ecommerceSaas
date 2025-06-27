import { Link } from '@tanstack/react-router'
import { Button } from 'shadcn-ui'
import { useBranding } from '../BrandingProvider'
import { motion, useReducedMotion } from 'framer-motion'

export default function Home() {
  const branding = useBranding()
  const reduce = useReducedMotion()
  return (
    <motion.div
      className="text-center space-y-4"
      initial={{ opacity: reduce ? 1 : 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: reduce ? 1 : 0 }}
      transition={{ duration: reduce ? 0 : 0.4 }}
    >
      <h1 className="text-3xl font-bold">Welcome to {branding?.name ?? 'our store'}</h1>
      <Link to="/products">
        <Button>Shop Now</Button>
      </Link>
    </motion.div>
  )
}
