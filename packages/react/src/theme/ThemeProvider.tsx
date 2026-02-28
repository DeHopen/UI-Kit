import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { ColorMode, Theme, ThemeContextValue } from './theme.types.ts'
import { lightTheme, darkTheme } from './themes.ts'

export const ThemeContext = createContext<ThemeContextValue | null>(null)

function applyThemeVars(theme: Theme) {
  const root = document.documentElement
  const { colors } = theme

  root.style.setProperty('--ui-color-primary', colors.primary)
  root.style.setProperty('--ui-color-primary-hover', colors.primaryHover)
  root.style.setProperty('--ui-color-primary-active', colors.primaryActive)
  root.style.setProperty('--ui-color-secondary', colors.secondary)
  root.style.setProperty('--ui-color-secondary-hover', colors.secondaryHover)
  root.style.setProperty('--ui-color-secondary-active', colors.secondaryActive)
  root.style.setProperty('--ui-color-success', colors.success)
  root.style.setProperty('--ui-color-warning', colors.warning)
  root.style.setProperty('--ui-color-danger', colors.danger)
  root.style.setProperty('--ui-color-danger-hover', colors.dangerHover)
  root.style.setProperty('--ui-color-danger-active', colors.dangerActive)
  root.style.setProperty('--ui-color-bg', colors.background)
  root.style.setProperty('--ui-color-surface', colors.surface)
  root.style.setProperty('--ui-color-surface-hover', colors.surfaceHover)
  root.style.setProperty('--ui-color-border', colors.border)
  root.style.setProperty('--ui-color-border-hover', colors.borderHover)
  root.style.setProperty('--ui-color-text', colors.text)
  root.style.setProperty('--ui-color-text-secondary', colors.textSecondary)
  root.style.setProperty('--ui-color-text-muted', colors.textMuted)
  root.style.setProperty('--ui-color-text-inverse', colors.textInverse)
  root.style.setProperty('--ui-color-overlay', colors.overlay)
  root.style.setProperty('--ui-color-focus-ring', colors.focusRing)
}

function getSystemColorMode(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

interface ThemeProviderProps {
  children: ReactNode
  defaultColorMode?: ColorMode
  lightThemeOverride?: Theme
  darkThemeOverride?: Theme
}

export function ThemeProvider({
  children,
  defaultColorMode = 'system',
  lightThemeOverride,
  darkThemeOverride,
}: ThemeProviderProps) {
  const [colorMode, setColorMode] = useState<ColorMode>(defaultColorMode)
  const [systemMode, setSystemMode] = useState<'light' | 'dark'>(getSystemColorMode)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => setSystemMode(e.matches ? 'dark' : 'light')
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  const resolvedColorMode = colorMode === 'system' ? systemMode : colorMode

  const light = lightThemeOverride ?? lightTheme
  const dark = darkThemeOverride ?? darkTheme
  const theme = resolvedColorMode === 'dark' ? dark : light

  useEffect(() => {
    applyThemeVars(theme)
    document.documentElement.setAttribute('data-theme', resolvedColorMode)
  }, [theme, resolvedColorMode])

  const handleSetColorMode = useCallback((mode: ColorMode) => {
    setColorMode(mode)
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({
      colorMode,
      resolvedColorMode,
      setColorMode: handleSetColorMode,
      theme,
    }),
    [colorMode, resolvedColorMode, handleSetColorMode, theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

ThemeProvider.displayName = 'ThemeProvider'
