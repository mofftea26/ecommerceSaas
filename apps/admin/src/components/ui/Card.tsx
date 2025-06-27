import { ReactNode } from 'react'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`border rounded shadow p-4 bg-white ${className}`}>{children}</div>
}
