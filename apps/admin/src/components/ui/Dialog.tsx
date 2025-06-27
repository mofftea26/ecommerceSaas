import { ReactNode } from 'react'
import { Button } from './Button'

type Props = {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function Dialog({ open, onClose, title, children }: Props) {
  if (!open) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded p-4 w-full max-w-md relative">
        {title && <h2 className="text-lg font-bold mb-2">{title}</h2>}
        {children}
        <div className="text-right">
          <Button className="mt-4" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  )
}
