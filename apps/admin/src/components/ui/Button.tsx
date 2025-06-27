import { ButtonHTMLAttributes } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export function Button({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const reduce = useReducedMotion()
  return (
    <motion.button
      whileHover={reduce ? undefined : { scale: 1.05 }}
      className={`px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}
