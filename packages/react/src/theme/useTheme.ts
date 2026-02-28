import { useContext } from 'react'
import { ThemeContext } from './ThemeProvider.tsx'
import type { ThemeContextValue } from './theme.types.ts'

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
