import { ReactNode } from 'react'

export function Badge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded ${className}`}>{children}</span>
}
