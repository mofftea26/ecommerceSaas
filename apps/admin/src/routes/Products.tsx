import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Dialog, Form, Input, Table } from '../components/ui'
import { motion, useReducedMotion } from 'framer-motion'

interface Product {
  id: string
  title: string
  price: number
  imageUrl?: string
  storeId?: string
  createdAt: string
}

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('/products')
  if (!res.ok) throw new Error('Error fetching products')
  return res.json()
}

export default function Products() {
  const queryClient = useQueryClient()
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  const createMutation = useMutation({
    mutationFn: async (data: Omit<Product, 'id' | 'createdAt'>) => {
      const res = await fetch('/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Error creating')
      return res.json() as Promise<Product>
    },
    onSuccess: (newProd) => {
      queryClient.setQueryData<Product[]>(['products'], (old = []) => [...old, newProd])
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (data: Product) => {
      const res = await fetch(`/products/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Error updating')
      return res.json() as Promise<Product>
    },
    onMutate: async (newProd) => {
      await queryClient.cancelQueries({ queryKey: ['products'] })
      const prev = queryClient.getQueryData<Product[]>(['products']) || []
      queryClient.setQueryData<Product[]>(['products'], prev.map(p => p.id === newProd.id ? newProd : p))
      return { prev }
    },
    onError: (_err, _prod, ctx) => {
      if (ctx) queryClient.setQueryData(['products'], ctx.prev)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/products/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Error deleting')
      return id
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['products'] })
      const prev = queryClient.getQueryData<Product[]>(['products']) || []
      queryClient.setQueryData<Product[]>(['products'], prev.filter(p => p.id !== id))
      return { prev }
    },
    onError: (_err, _id, ctx) => {
      if (ctx) queryClient.setQueryData(['products'], ctx.prev)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const reduce = useReducedMotion()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      title: String(formData.get('title')),
      price: Number(formData.get('price')),
      imageUrl: String(formData.get('imageUrl') || ''),
      storeId: String(formData.get('storeId') || ''),
    }
    if (editing) {
      updateMutation.mutate({ ...editing, ...data })
    } else {
      createMutation.mutate(data)
    }
    form.reset()
    setOpen(false)
  }

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: reduce ? 1 : 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: reduce ? 1 : 0 }}
      transition={{ duration: reduce ? 0 : 0.4 }}
    >
      <div className="flex justify-end">
        <Button onClick={() => { setEditing(null); setOpen(true) }}>New Product</Button>
      </div>
      <Table className="text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-1">Title</th>
            <th className="px-2 py-1">Price</th>
            <th className="px-2 py-1">Created</th>
            <th className="px-2 py-1" />
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <motion.tr
              key={p.id}
              className="border-t"
              initial={{ opacity: 0, y: reduce ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.3 }}
            >
              <td className="px-2 py-1">{p.title}</td>
              <td className="px-2 py-1">${p.price}</td>
              <td className="px-2 py-1">{new Date(p.createdAt).toLocaleDateString()}</td>
              <td className="px-2 py-1 space-x-2">
                <Button onClick={() => { setEditing(p); setOpen(true) }}>Edit</Button>
                <Button onClick={() => deleteMutation.mutate(p.id)}>Delete</Button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Product' : 'New Product'}>
        <Form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1">Title</label>
            <Input name="title" defaultValue={editing?.title} required />
          </div>
          <div>
            <label className="block mb-1">Price</label>
            <Input type="number" step="0.01" name="price" defaultValue={editing?.price ?? 0} required />
          </div>
          <div>
            <label className="block mb-1">Image URL</label>
            <Input name="imageUrl" defaultValue={editing?.imageUrl} />
          </div>
          <div>
            <label className="block mb-1">Store</label>
            <select name="storeId" defaultValue={editing?.storeId} className="border rounded px-2 py-1 w-full">
              <option value="">Select...</option>
              <option value="1">Store 1</option>
              <option value="2">Store 2</option>
            </select>
          </div>
          <div className="pt-2 text-right">
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {(createMutation.isPending || updateMutation.isPending) && (
                <motion.span
                  className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, ease: 'linear', duration: 1 }}
                />
              )}
              {editing ? 'Update' : 'Create'}
            </Button>
          </div>
        </Form>
      </Dialog>
    </motion.div>
  )
}
