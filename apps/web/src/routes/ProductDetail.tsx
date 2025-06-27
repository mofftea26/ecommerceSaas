import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { Button, Badge } from 'shadcn-ui'
import { Product } from '../types'
import { useCart } from '../CartContext'

async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export default function ProductDetail() {
  const { id } = useParams('/products/$id')
  const { data: product } = useQuery({ queryKey: ['product', id], queryFn: () => fetchProduct(id) })
  const { addToCart } = useCart()

  if (!product) return <div>Loading...</div>

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {product.imageUrl && (
        <img src={product.imageUrl} alt={product.title} className="w-full h-64 object-cover rounded" />
      )}
      <h1 className="text-2xl font-bold">{product.title}</h1>
      {product.category && <Badge>{product.category}</Badge>}
      <p className="text-xl font-semibold">${product.price}</p>
      <p>{product.description}</p>
      <Button onClick={() => addToCart(product)}>Add to Cart</Button>
    </div>
  )
}
