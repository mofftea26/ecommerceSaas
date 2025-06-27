import { TableHTMLAttributes } from 'react'

export function Table({ className = '', ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return <table className={`min-w-full border ${className}`} {...props} />
}
