import { useQuery, useMutation } from '@tanstack/react-query'
import { FormEvent, useState } from 'react'
import { Button, Input, Form } from '../components/ui'

interface Store {
  id: number
  name: string
  logoUrl?: string
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string
}

async function fetchStore(): Promise<Store> {
  const res = await fetch('/stores/1')
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

async function updateStore(data: Partial<Store>): Promise<Store> {
  const res = await fetch('/stores/1', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update')
  return res.json()
}

export default function Branding() {
  const { data: store } = useQuery({ queryKey: ['store'], queryFn: fetchStore })
  const mutation = useMutation({ mutationFn: updateStore })
  const [logoUrl, setLogoUrl] = useState('')

  if (!store) return <div>Loading...</div>

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    mutation.mutate({
      name: String(formData.get('name')),
      logoUrl: logoUrl || store.logoUrl,
      primaryColor: String(formData.get('primaryColor')),
      secondaryColor: String(formData.get('secondaryColor')),
      accentColor: String(formData.get('accentColor')),
    })
  }

  return (
    <div className="space-y-4 max-w-md">
      <Form onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1">Store Name</label>
          <Input name="name" defaultValue={store.name} required />
        </div>
        <div>
          <label className="block mb-1">Logo URL</label>
          <Input name="logo" value={logoUrl} onChange={e => setLogoUrl(e.target.value)} placeholder={store.logoUrl || ''} />
        </div>
        <div>
          <label className="block mb-1">Primary Color</label>
          <Input name="primaryColor" defaultValue={store.primaryColor || ''} />
        </div>
        <div>
          <label className="block mb-1">Secondary Color</label>
          <Input name="secondaryColor" defaultValue={store.secondaryColor || ''} />
        </div>
        <div>
          <label className="block mb-1">Accent Color</label>
          <Input name="accentColor" defaultValue={store.accentColor || ''} />
        </div>
        <div className="pt-2 text-right">
          <Button type="submit">Save</Button>
        </div>
      </Form>
    </div>
  )
}
