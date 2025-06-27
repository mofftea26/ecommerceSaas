import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import ProductCard from '../components/ProductCard'
import { Product } from '../types'

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('/products')
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export default function Products() {
  const { data: products = [] } = useQuery({ queryKey: ['products'], queryFn: fetchProducts })
  const [category, setCategory] = useState('')
  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)))
  const filtered = category ? products.filter(p => p.category === category) : products

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <label className="font-semibold">Category:</label>
        <select value={category} onChange={e => setCategory(e.target.value)} className="border rounded px-2 py-1">
          <option value="">All</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map(p => (
          <Link key={p.id} to={`/products/${p.id}`}> 
            <ProductCard product={p} />
          </Link>
        ))}
      </div>
    </div>
  )
}
