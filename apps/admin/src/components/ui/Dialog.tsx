import { ReactNode } from 'react'
import { Button } from './Button'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

type Props = {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function Dialog({ open, onClose, title, children }: Props) {
  const reduce = useReducedMotion()
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.3 }}
        >
          <motion.div
            className="bg-white rounded p-4 w-full max-w-md relative"
            initial={{ scale: reduce ? 1 : 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: reduce ? 1 : 0.95, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
          >
            {title && <h2 className="text-lg font-bold mb-2">{title}</h2>}
            {children}
            <div className="text-right">
              <Button className="mt-4" onClick={onClose}>Close</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
