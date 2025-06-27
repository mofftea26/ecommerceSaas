import { Product } from '../types'
import { Button, Dialog } from 'shadcn-ui'
import { Card } from 'shadcn-ui'
import { useCart } from '../CartContext'
import { useState } from 'react'

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <Card className="space-y-2">
      {product.imageUrl && (
        <img src={product.imageUrl} alt={product.title} className="w-full h-40 object-cover rounded" />
      )}
      <div className="font-semibold">{product.title}</div>
      <div className="text-sm text-gray-500">${product.price}</div>
      <Button onClick={() => setOpen(true)}>View</Button>
      <Dialog open={open} onClose={() => setOpen(false)} title={product.title}>
        <div className="space-y-2">
          {product.imageUrl && (
            <img src={product.imageUrl} alt={product.title} className="w-full h-48 object-cover rounded" />
          )}
          <p>{product.description}</p>
          <Button onClick={() => addToCart(product)}>Add to Cart</Button>
        </div>
      </Dialog>
    </Card>
  )
}
