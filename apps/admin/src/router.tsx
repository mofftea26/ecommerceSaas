import { RootRoute, Route, Router } from '@tanstack/react-router'
import Root from './routes/Root'
import Products from './routes/Products'
import Branding from './routes/Branding'

const rootRoute = new RootRoute({
  component: Root,
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <div>Home</div>,
})

const productsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: Products,
})

const brandingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/branding',
  component: Branding,
})

const routeTree = rootRoute.addChildren([indexRoute, productsRoute, brandingRoute])

export const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
