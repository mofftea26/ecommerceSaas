import { createContext, useContext } from 'react';
import create from 'zustand';

interface Product {
  id: number;
  title: string;
  price: number;
}

interface CartState {
  items: Product[];
  addToCart: (product: Product) => void;
}

const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (product) => set((state) => ({ items: [...state.items, product] })),
}));

const CartContext = createContext<CartState>(useCartStore.getState());

export function CartProvider({ children }: { children: React.ReactNode }) {
  return <CartContext.Provider value={useCartStore()}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
