import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Stack } from '../Stack.tsx'

describe('Stack', () => {
  it('renders children', () => {
    render(
      <Stack>
        <div>Child 1</div>
        <div>Child 2</div>
      </Stack>,
    )
    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
  })

  it('applies direction class', () => {
    const { container } = render(
      <Stack direction="horizontal">
        <div>Item</div>
      </Stack>,
    )
    expect(container.firstChild).toHaveClass('horizontal')
  })

  it('defaults to vertical direction', () => {
    const { container } = render(
      <Stack>
        <div>Item</div>
      </Stack>,
    )
    expect(container.firstChild).toHaveClass('vertical')
  })

  it('applies spacing class', () => {
    const { container } = render(
      <Stack spacing={8}>
        <div>Item</div>
      </Stack>,
    )
    expect(container.firstChild).toHaveClass('spacing8')
  })

  it('applies align class', () => {
    const { container } = render(
      <Stack align="center">
        <div>Item</div>
      </Stack>,
    )
    expect(container.firstChild).toHaveClass('alignCenter')
  })

  it('applies justify class', () => {
    const { container } = render(
      <Stack justify="between">
        <div>Item</div>
      </Stack>,
    )
    expect(container.firstChild).toHaveClass('justifyBetween')
  })

  it('applies wrap class', () => {
    const { container } = render(
      <Stack wrap>
        <div>Item</div>
      </Stack>,
    )
    expect(container.firstChild).toHaveClass('wrap')
  })

  it('renders as a custom element', () => {
    render(
      <Stack as="section" data-testid="stack">
        <div>Item</div>
      </Stack>,
    )
    expect(screen.getByTestId('stack').tagName).toBe('SECTION')
  })

  it('supports custom className', () => {
    const { container } = render(
      <Stack className="custom-stack">
        <div>Item</div>
      </Stack>,
    )
    expect(container.firstChild).toHaveClass('custom-stack')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(
      <Stack ref={ref}>
        <div>Item</div>
      </Stack>,
    )
    expect(ref).toHaveBeenCalled()
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement)
  })

  it('has correct displayName', () => {
    expect(Stack.displayName).toBe('Stack')
  })
})
