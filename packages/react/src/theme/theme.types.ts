export type ColorMode = 'light' | 'dark' | 'system'

export interface ThemeColors {
  primary: string
  primaryHover: string
  primaryActive: string
  secondary: string
  secondaryHover: string
  secondaryActive: string
  success: string
  warning: string
  danger: string
  dangerHover: string
  dangerActive: string
  background: string
  surface: string
  surfaceHover: string
  border: string
  borderHover: string
  text: string
  textSecondary: string
  textMuted: string
  textInverse: string
  overlay: string
  focusRing: string
}

export interface Theme {
  colors: ThemeColors
}

export interface ThemeContextValue {
  colorMode: ColorMode
  resolvedColorMode: 'light' | 'dark'
  setColorMode: (mode: ColorMode) => void
  theme: Theme
}
