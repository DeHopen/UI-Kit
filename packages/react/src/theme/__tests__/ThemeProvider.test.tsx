import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ThemeProvider } from '../ThemeProvider.tsx'
import { useTheme } from '../useTheme.ts'

function ThemeConsumer() {
  const { colorMode, resolvedColorMode, setColorMode } = useTheme()
  return (
    <div>
      <span data-testid="color-mode">{colorMode}</span>
      <span data-testid="resolved-mode">{resolvedColorMode}</span>
      <button onClick={() => setColorMode('dark')}>Set Dark</button>
      <button onClick={() => setColorMode('light')}>Set Light</button>
    </div>
  )
}

describe('ThemeProvider', () => {
  it('provides theme context to children', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('color-mode')).toHaveTextContent('system')
  })

  it('accepts defaultColorMode', () => {
    render(
      <ThemeProvider defaultColorMode="dark">
        <ThemeConsumer />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('color-mode')).toHaveTextContent('dark')
    expect(screen.getByTestId('resolved-mode')).toHaveTextContent('dark')
  })

  it('allows changing color mode', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider defaultColorMode="light">
        <ThemeConsumer />
      </ThemeProvider>,
    )

    expect(screen.getByTestId('resolved-mode')).toHaveTextContent('light')

    await user.click(screen.getByText('Set Dark'))
    expect(screen.getByTestId('color-mode')).toHaveTextContent('dark')
    expect(screen.getByTestId('resolved-mode')).toHaveTextContent('dark')
  })

  it('sets data-theme attribute on html', () => {
    render(
      <ThemeProvider defaultColorMode="dark">
        <ThemeConsumer />
      </ThemeProvider>,
    )
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('sets CSS variables on root', () => {
    render(
      <ThemeProvider defaultColorMode="light">
        <ThemeConsumer />
      </ThemeProvider>,
    )
    expect(document.documentElement.style.getPropertyValue('--ui-color-primary')).toBe('#2563eb')
  })
})

describe('useTheme', () => {
  it('throws when used outside ThemeProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<ThemeConsumer />)).toThrow(
      'useTheme must be used within a ThemeProvider',
    )
    spy.mockRestore()
  })
})
