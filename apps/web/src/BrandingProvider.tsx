import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface Branding {
  id: number
  name: string
  logoUrl?: string
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string
}

const BrandingContext = createContext<Branding | null>(null)

export function BrandingProvider({ children }: { children: ReactNode }) {
  const [branding, setBranding] = useState<Branding | null>(null)

  useEffect(() => {
    fetch('/stores/1')
      .then(res => res.json())
      .then(data => {
        setBranding(data)
        const root = document.documentElement
        if (data.primaryColor) root.style.setProperty('--primary', data.primaryColor)
        if (data.secondaryColor) root.style.setProperty('--secondary', data.secondaryColor)
        if (data.accentColor) root.style.setProperty('--accent', data.accentColor)
      })
      .catch(() => {})
  }, [])

  return (
    <BrandingContext.Provider value={branding}>{children}</BrandingContext.Provider>
  )
}

export function useBranding() {
  return useContext(BrandingContext)
}
