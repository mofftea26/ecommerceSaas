import { createContext, useContext, useReducer, ReactNode } from 'react'
import { Product } from './types'

interface CartItem { product: Product; quantity: number }
interface State { items: CartItem[] }

type Action =
  | { type: 'add'; product: Product }
  | { type: 'remove'; id: number }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add': {
      const existing = state.items.find(i => i.product.id === action.product.id)
      if (existing) {
        return {
          items: state.items.map(i =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        }
      }
      return { items: [...state.items, { product: action.product, quantity: 1 }] }
    }
    case 'remove':
      return { items: state.items.filter(i => i.product.id !== action.id) }
    default:
      return state
  }
}

const CartContext = createContext<{
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
} | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })
  const addToCart = (product: Product) => dispatch({ type: 'add', product })
  const removeFromCart = (id: number) => dispatch({ type: 'remove', id })
  return (
    <CartContext.Provider value={{ items: state.items, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
