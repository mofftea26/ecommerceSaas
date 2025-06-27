import { RootRoute, Route, Router } from '@tanstack/react-router'
import RootLayout from './routes/RootLayout'
import Home from './routes/Home'
import Products from './routes/Products'
import ProductDetail from './routes/ProductDetail'

const rootRoute = new RootRoute({
  component: RootLayout,
})

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const productsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: Products,
})

const productDetailRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/products/$id',
  component: ProductDetail,
})

const routeTree = rootRoute.addChildren([homeRoute, productsRoute, productDetailRoute])

export const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
