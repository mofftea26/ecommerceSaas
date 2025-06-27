import { FormHTMLAttributes } from 'react'

export function Form({ className = '', ...props }: FormHTMLAttributes<HTMLFormElement>) {
  return <form className={`space-y-2 ${className}`} {...props} />
}
